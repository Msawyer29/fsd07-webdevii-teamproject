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

// define the functional component DiscoverPagination
function DiscoverPagination() {
  // initialize state variables for storing the projects, the loading state and the index of the first project to display
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [firstProjIndex, setFirstProjIndex] = useState(0);

  // get the firestore database instance from the firebase app
  const db = getFirestore(firebase_app);

  let projectsArray = [];
  // inside the useEffect hook, an observer is attached to the 'projects' collection in firestore
  useEffect(() => {
    const q = query(collection(db, "projects"), orderBy("startDate", "desc"));
    const projectssDetails = onSnapshot(q, (projSnaps) => {
      // the forEach loop iterates through the snapshot of the data returned by the observer
      projSnaps.docs.forEach((pSnap) => {
        // push the project data into the projectsArray
        projectsArray.push({
          ...pSnap.data(),
          id: pSnap.id,
        });
      });
      // update the state variables with the new data
      setProjects(projectsArray);
      setLoading(false);

      // reset the projectsArray for the next potential render
      projectsArray = []; //reset projectsArray
    });
  }, []);

  // while the data is still loading, display a loading spinner
  if (loading) {
    return (
      <div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // calculate the last project index to display and slice the projects array accordingly
  let lastProjectIndex = firstProjIndex + 4;
  const projectToDisplay = projects.slice(firstProjIndex, lastProjectIndex); //need to pass this data
  const leftArrowClick = () => {
    if (firstProjIndex > 0) {
      setFirstProjIndex(firstProjIndex - 1);
      console.log(firstProjIndex);
    }
  };

  // define the click handlers for the pagination buttons
  const rightArrowClick = () => {
    if (firstProjIndex < projects.length - 3) {
      setFirstProjIndex(firstProjIndex + 1);
      console.log(firstProjIndex);
    }
  };

  // return the JSX for rendering the component
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
