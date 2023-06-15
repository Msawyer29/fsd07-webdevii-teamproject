"use client";
import React, { useState, useEffect } from "react";
import { getFirestore, collection, getDoc, doc } from "firebase/firestore";
import StripeModalButton from "./stripeModalButton";
import StripeModal from "./stripeModal";
import ProjectDescription from "./projectDescription";
import Comments from "./comments";

const ProjectDetails = ({ pId }) => {
  console.log(pId.projectId);
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
        // Here is the change Mac made: I set project to be an object that contains all properties of doc.data() and added an additional property 'id'
        setProject({ ...doc.data(), id: doc.id });
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
          {/* Now we are checking if project.id exists before rendering StripeModal. This change ensures that the project's ID is correctly 
          stored in the project state object and that StripeModal receives the project's ID as a prop. The reason we need to make sure project.id 
          exists before rendering StripeModal is that React will initially render the component before the useEffect fetches the project data, causing 
          the prop to be undefined. This condition will ensure that StripeModal is only rendered once the project data is fetched and project.id is defined. */}
          {project.id && <StripeModal pId={project.id} />}
        </div>
      </div>
      <Comments />
    </div>
  );
};

export default ProjectDetails;
