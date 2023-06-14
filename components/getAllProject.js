"use client";
import React, { useEffect, useState } from "react";
import firebase_app from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  getDoc,
  query,
  limit,
  orderBy,
} from "firebase/firestore";
import ProjectRow from "./projectRow";

function GetAllProject() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const colName = "projects";
  const db = getFirestore();
  const colRef = collection(db, colName);
  let projectArray = [];
  const userRef = collection(db, "users");
  const q = query(colRef, orderBy("startDate", "asc"), limit(3));
  //query

  //---------------------------------
  useEffect(() => {
    const projectssDetails = onSnapshot(q, (snapshot) => {
      //console.log(snapshot.docs);
      snapshot.docs.forEach((doc) => {
        //--get createName
        // let createrName = doc.data().createrId;
        // const q = query(userRef, where("uid", "==", createrName));
        // const userDetails = getDoc(q, snapshot);
        // console.log(userDetails);

        projectArray.push({ ...doc.data(), id: doc.id });
      });
      setProjects(projectArray);
      setLoading(false);
      console.log(projectArray);
      projectArray = []; //reset userArray
    });
  }, []);
  //console.log(users);
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
      {projects.map((p) => (
        <ProjectRow key={p.id} project={p} />
      ))}
    </div>
  );
}
export default GetAllProject;
