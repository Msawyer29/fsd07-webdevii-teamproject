"use client"
// import the necessary modules and components
import React, { useEffect, useState } from "react";
import firebase_app from "../firebase/config";
import {
  getFirestore,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";

// functional component called KeyWordSearch, which receives a 'keyWord' prop, this prop is passed from the parent ocmponent navbar.js
function KeyWordSearch({ keyWord }) {
  // Initialize state variables for storing the fetched projects and the loading state.
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // get the firestore database instance from the firebase app.
  const db = getFirestore(firebase_app);

  let projectsArray = [];

  // the if statement checks if the keyWord prop is not undefined
  if (keyWord != undefined) {
    // Convert the keyword to uppercase.
    let kWord = keyWord.keyword.toUpperCase();

    // inside the useEffect hook, an observer is attached to the 'projects' collection in firestore
    // the observer executes whenever the data in the collection changes
    useEffect(() => {
      const q = query(collection(db, "projects"));

      // the onSnapshot function is an event listener that listens for data changes in real-time
      const projectssDetails = onSnapshot(q, (projSnaps) => {
        // the forEach loop iterates through the snapshot of the data returned by the observer
        projSnaps.docs.forEach((pSnap) => {
          // convert the project title to uppercase and check if it contains the keyword
          let ucaseTitle = pSnap.data().title.toUpperCase();
          if (ucaseTitle.indexOf(kWord) > -1) {
            // if it does contain the keyword, the project data is pushed into the projectsArray
            projectsArray.push({
              ...pSnap.data(),
              id: pSnap.id,
            });
          }
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

    // if no projects were found matching the search keyword, display a message saying no results were found
    if (projects.length === 0) {
      return (
        <div className="">
          <hr className="green" />
          <h1 className="egg text-upercase text-center">Search Result(s)</h1>
          <hr className="green" />
          <p className="text-center">No results found for '{keyWord.keyword}'</p>
        </div>
      );
    }

    // Otherwise, display the search results
    return (
      <div className="">
        <hr className="green" />
        <h1 className="egg text-upercase text-center">Search Result(s)</h1>
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

// KeyWordSearch component is exported for use in other files
export default KeyWordSearch;