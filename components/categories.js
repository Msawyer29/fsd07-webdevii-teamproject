"use client";
import React, { useState, useRef, useEffect } from "react";
import firebase_app from "../firebase/config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  limit,
  orderBy,
  getDoc,
  getDocsFromServer,
  doc,
} from "firebase/firestore";

const Categories = ({ pId }) => {
  const [project, setProject] = useState([]);
  //const [loading, setLoading] = useState(true);
  const collectionName = "projects";
  const db = getFirestore();
  const colRef = collection(db, collectionName);

  if (pId != undefined) {
    const projId = pId.projectId;
    //console.log(projId);
    const projRef = doc(db, "projects", projId);
    //const q = query(colRef);
    //const [docs, loading, error] = useCollectionData(projRef);
    //console.log(docs);

    //query
    //const q = query(colRef);
    //const q = query(colRef, where("id", "==", projId));
    const q = query(colRef, where("id", "==", "VHnRNxsVmoxDJpu3YpEd"));

    // const q = query(colRef, where("startDate", "==", "2023-06-12"));
    let projectArray = [];
    //---------------------------------
    useEffect(() => {
      const projectDetails = onSnapshot(projRef, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          projectArray.push({ ...doc.data(), id: doc.id });
        });

        setProject(projectArray[projId]);

        //setLoading(false);
        console.log(projectArray);
        console.log(projectArray.find({ id: projId }));
        projectArray = []; //reset userArray
      });
    }, []);

    // if (loading) {
    //   return (
    //     <div>
    //       <div className="spinner-border text-primary" role="status">
    //         <span className="visually-hidden">Loading...</span>
    //       </div>
    //     </div>
    //   );
    // }
    //-----------------------------------------
  }
  return (
    <div className="mt-5">
      {/* <h1 className="text-center green">
      Explore Categories
      </h1> */}
      <hr className="green" />

      <ul id="categories" className="nav justify-content-center">
        <li className="nav-item">
          <a className="nav-link green" href="#">
            documentary
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            literature
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            photography
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            music
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link green" href="#">
            lorem ipsum
          </a>
        </li>
      </ul>
      <hr className="green" />
    </div>
  );
};

export default Categories;
