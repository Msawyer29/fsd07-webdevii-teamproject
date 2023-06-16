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

// functional component called CategorySearch, which receives a 'category' prop, this prop is passed from the parent component navbar.js
function CategorySearch({ category }) {
  // Initialize state variables for storing the fetched projects and the loading state.
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // get the firestore database instance from the firebase app
  const db = getFirestore(firebase_app);

  let projectsArray = [];

  // the if statement checks if the category prop is not undefined
  if (category != undefined) {
    // store the category
    let catg = category.category;
    
    // inside the useEffect hook, a query is made to the 'projects' collection in firestore to fetch projects with the given category
    useEffect(() => {
      const q = query(
        collection(db, "projects"),
        where("category", "==", catg)
      );
      
      // the onSnapshot function is an event listener that listens for data changes in real-time
      const projectssDetails = onSnapshot(q, (projSnaps) => {
        // the forEach loop iterates through the snapshot of the data returned by the observer
        projSnaps.docs.forEach((pSnap) => {
          // the project data is pushed into the projectsArray
          projectsArray.push({
            ...pSnap.data(),
            id: pSnap.id,
          });
        });
        
        // the state variables are then updated with the new data
        setProjects(projectsArray);
        setLoading(false);
        
        // the projectsArray is reset for the next potential render.
        projectsArray = [];
      });
    }, []); // the empty dependency array ensures this useEffect runs only once when the component is first rendered

    // if the data is still loading, display a loading spinner
    if (loading) {
      return (
        <div>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      );
    }

    // if the loading is complete, display the projects fetched from the database
    return (
      <div className="">
        <hr className="green" />
        <h1 className="egg text-upercase text-center">{catg}</h1>
        <hr className="green" />
        <div className="row d-flex my-4 py-5">
          {projects.map((p) => (
            <div key={p.id} className="col-md-3">
              <div className="card">
                <img
                  src={p.image}
                  className="img-fluid card-img-top"
                  alt="..."
                />
                <div className="d-flex justify-content-center">
                  <div className="card-body">
                    <h5 className="card-title titleLimit">{p.title}</h5>
                    <p className="card-text shortDescription ">
                      {p.description}
                    </p>
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
        </div>
      </div>
    );
  }
}

export default CategorySearch;
