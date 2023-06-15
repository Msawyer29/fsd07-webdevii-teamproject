"use client";
import React, { useState, useRef, useEffect } from "react";
import firebase_app from "../firebase/config";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";

// maybe delete down

import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51MsdkuKcBJEP5unczDs6Q8CfWFl7rGELmQBhDbj9PzXAHfwLcF1xXkYs1FwzNdEhA1xsS59QqIbWzvXBZS7TZPC700sreRX3uA"
);

// maybe delete up
import StripeModalButton from "./stripeModalButton";
import StripeModal from "./stripeModal";

import ProjectDescription from "./projectDescription";
import Comments from "./comments";
const ProjectDetails = ({ pId }) => {
  const [project, setProject] = useState([]);
  //const [loading, setLoading] = useState(true);
  //let project = [];
  useEffect(() => {
    const collectionName = "projects";
    const db = getFirestore();
    const colRef = collection(db, collectionName);

    let daysRemaining = 0;

    if (pId != undefined) {
      const projId = pId.projectId;
      const docRef = doc(db, "projects", projId);

      getDoc(docRef).then((doc) => {
        //project.push(doc.data(), doc.id);
        setProject(doc.data(), doc.id);
      });

      //calculate daysleft
      let today = new Date().toISOString().slice(0, 10);
      const endDate = project.endDate;
      const diffInMs = new Date(endDate) - new Date(today);
      const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1; //plus 1 => considering endDate = today days,then  remaining = 1;
      diffInDays < 0 ? (daysRemaining = 0) : (daysRemaining = diffInDays);
      console.log(diffInDays);
      console.log(project);
    }
  }, []);

  return (
    <div>
      <h1 className="egg">{project.title}</h1>
      <div className="row d-flex">
        <div className="col-md-8 px-3">
          <img src={project.image} className="img-fluid" alt="..." />
          <ProjectDescription projDesc={project.description} />
        </div>
        <div className="col-md-4 px-3">
          <p className="text-uppercase egg">stats</p>
          <div
            className="progress mb-3"
            role="progressbar"
            aria-label="5px high"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="progress-bar greenBG"></div>
          </div>
          <h1 className="egg slim mb-0">
            $<span id="funds">12.800</span>
          </h1>
          <p className="green mt-0">
            pledged of{" "}
            <strong>
              CA$ <span id="goal">{project.goal}</span>
            </strong>{" "}
            goal
          </p>
          <h1 className="egg slim mb-0" id="backers">
            193
          </h1>
          <p className="green mt-0">backers</p>
          <h1 className="egg slim mb-0" id="deadline">
            {/* {daysRemaining} */}
          </h1>
          <p className="green mt-0 mb-5">days left</p>

          <StripeModalButton />
          <StripeModal />
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default ProjectDetails;
