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

function GetAllProject() {
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
    // <div>
    //   {projects.map((p) => (
    //     <ProjectRow key={p.id} project={p} />
    //   ))}
    // </div>
    <div
      id="carouselExampleIndicators"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div class="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner">
        {/* <div className="carousel-item active">
          {projects.map((p) => (
            <img src={p.image} className="d-block w-100" alt="project-image" />
            // <ProjectRow key={p.id} project={p} />
          ))}
        </div> */}

        {projects.map((p) => (
          <div className="carousel-item active">
            <div className="d-flex">
              <img
                src={p.image}
                className="d-block w-100"
                alt="project-image"
              />
              <div>project desc</div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
export default GetAllProject;

// //--- carosel - Not successful -map function attaching image just under one another or overlapping
{
  /* <div
id="carouselExampleIndicators"
className="carousel slide"
data-bs-ride="carousel"
>
<div class="carousel-indicators">
  <button
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide-to="0"
    className="active"
    aria-current="true"
    aria-label="Slide 1"
  ></button>
  <button
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide-to="1"
    aria-label="Slide 2"
  ></button>
  <button
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide-to="2"
    aria-label="Slide 3"
  ></button>
</div>
<div className="carousel-inner">
  <div className="carousel-item active">
    {projects.map((p) => (
      <img src={p.image} className="d-block w-100" alt="project-image" />
      // <ProjectRow key={p.id} project={p} />
    ))}
  </div>
</div>
<button
  className="carousel-control-prev"
  type="button"
  data-bs-target="#carouselExampleIndicators"
  data-bs-slide="prev"
>
  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Previous</span>
</button>
<button
  className="carousel-control-next"
  type="button"
  data-bs-target="#carouselExampleIndicators"
  data-bs-slide="next"
>
  <span className="carousel-control-next-icon" aria-hidden="true"></span>
  <span className="visually-hidden">Next</span>
</button>
</div> */
}
// //---
