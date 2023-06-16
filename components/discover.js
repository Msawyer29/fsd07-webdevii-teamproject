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
} from "firebase/firestore";

function Discover({ pagination }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(firebase_app);

  let projectsArray = [];
  //---------------------------------
  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      orderBy("startDate", "desc"),
      limit(4)
    );
    const projectssDetails = onSnapshot(q, (projSnaps) => {
      projSnaps.docs.forEach((pSnap) => {
        projectsArray.push({
          ...pSnap.data(),
          id: pSnap.id,
        });
      });
      setProjects(projectsArray);
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

  return (
    <div className="">
      <hr className="green" />
      <h1 className="egg text-upercase text-center">Discover & Share</h1>
      <hr className="green" />
      <div className="row d-flex my-4 py-5">
        {projects.map((p) => (
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
      </div>
    </div>
  );
}

export default Discover;
