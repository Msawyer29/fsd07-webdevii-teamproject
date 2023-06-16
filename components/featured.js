"use client";
import React, { useEffect, useState } from "react";
import firebase_app from "../firebase/config";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
  limit,
  orderBy,
  where,
} from "firebase/firestore";
import ProjectRow from "./projectRow";
import ProjectDetails from "./projectDetails";

function FeaturedProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(firebase_app);

  let usersArray = [];
  let projectsArray = [];
  //---------------------------------
  useEffect(() => {
    const usersDetails = onSnapshot(collection(db, "users"), (snapshot) => {
      snapshot.docs.forEach((uSnap) => {
        usersArray[uSnap.data().uid] =
          uSnap.data().firstName + " " + uSnap.data().lastName;
      });
    });
    const q = query(
      collection(db, "projects"),
      orderBy("startDate", "desc"),
      limit(3)
    );
    const projectssDetails = onSnapshot(q, (projSnaps) => {
      projSnaps.docs.forEach((pSnap) => {
        let createrName = usersArray[pSnap.data().createrId];
        projectsArray.push({
          ...pSnap.data(),
          id: pSnap.id,
          creater: createrName,
        });
      });
      setProjects(projectsArray);
      console.log(projectsArray);

      setLoading(false);
      projectsArray = []; //reset projectsArray
      usersArray = []; //reset userArray
    });
  }, []);

  if (loading) {
    return (
      <div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div
        id="featuredIndicators"
        className="carousel slide py-3"
        data-bs-ride="carousel"
      >
        <h6 className="egg text-uppercase m-0">featured projects</h6>
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#featuredIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#featuredIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#featuredIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner ">
          {projects.map((p) => (
            <div
              key={p.id}
              className={
                projects[0].id == p.id
                  ? "carousel-item active"
                  : "carousel-item"
              }
            >
              <div className="row d-flex">
                <div className="col-md-8 px-3">
                  <img src={p.image} className="img-fluid" alt="..." />
                </div>
                <div className="col-md-4 px-3">
                  <h2 className="egg projectTitle text-capitalize">
                    {p.title}
                  </h2>

                  <p className="green projectDescription">{p.description}</p>
                  <p className="green">[ ... ]</p>
                  <p className="egg fst-italic projectAuthor">by Mark Boone</p>
                  <h4>
                    <a className="green" href="/single-project/{p.id}">
                      read more &#8594;
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="spacer"></div>
      </div>
    </div>
  );
}
export default FeaturedProject;
