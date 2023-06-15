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

function Successful() {
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
    <div className="mb-5 mt-5">
      
      <div className="row d-flex align-items-center justify-content-between mt-5">
        <div className="col-md-3">
          <h1 className="egg">
            successfully
            <br />
            funded
            <br />
            projects
          </h1>
        </div>


        {projects.map((p) => (
        <div key={p.id} className="col-md-3 py-3">
          <img
            src={p.image}
            className="img-fluid"
            alt="..."
          />
          <div className="p-2 m-0 titleLink "><p className="shortTitle m-0"><a href="/single-project/[projectId]">{p.title}</a> </p><a className="dGreen" href='/single-project/[projectId]'>
                  read more &#8594;
                </a></div>
        </div>
        ))}

      </div>
    </div>
  );
};

export default Successful;
