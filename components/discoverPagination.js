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

function DiscoverPagination() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstProjIndex, setFirstProjIndex] = useState(0);
  const db = getFirestore(firebase_app);

  // let usersArray = [];
  let projectsArray = [];
  //---------------------------------
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("startDate", "desc"));
    const projectssDetails = onSnapshot(q, (projSnaps) => {
      projSnaps.docs.forEach((pSnap) => {
        projectsArray.push({
          ...pSnap.data(),
          id: pSnap.id,
        });
      });
      setProjects(projectsArray);
      //console.log(projectsArray);
      setLoading(false);
      projectsArray = []; //reset projectsArray
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
  let lastProjectIndex = firstProjIndex + 4;
  const projectToDisplay = projects.slice(firstProjIndex, lastProjectIndex); //need to pass this data
  const leftArrowClick = () => {
    if (firstProjIndex > 0) {
      setFirstProjIndex(firstProjIndex - 1);
      console.log(firstProjIndex);
    }
  };

  const rightArrowClick = () => {
    if (firstProjIndex < projects.length - 3) {
      setFirstProjIndex(firstProjIndex + 1);
      console.log(firstProjIndex);
    }
  };

  return (
    <div className="">
      <hr className="green" />
      <h1 className="egg text-upercase text-center">Discover & Share</h1>
      <hr className="green" />
      <div className="row d-flex my-4 py-5">
        {projectToDisplay.map((p) => (
          <div key={p.id} className="col-md-3">
            <div className="card">
              <img src={p.image} className="img-fluid card-img-top" alt="..." />
              <div className="d-flex justify-content-center">
                <div className="card-body">
                  <h5 className="card-title titleLimit">{p.title}</h5>
                  <p className="card-text shortDescription ">{p.description}</p>
                  <h6 className="mt-2">
                    <a className="dGreen " href={"/single-project/" + p.id}>
                      read more &#8594;
                    </a>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="d-flex justify-content-between pagBtnDiv">
          <div>
            <button
              className={firstProjIndex == 0 ? "hideMe" : ""}
              onClick={leftArrowClick}
            >
              <h1>&larr;</h1>
            </button>
          </div>
          <div>
            <button
              className={firstProjIndex + 4 > projects.length ? "hideMe" : ""}
              onClick={rightArrowClick}
            >
              <h1>&rarr;</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiscoverPagination;
