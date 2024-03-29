"use client";
import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  getDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import StripeModalButton from "./stripeModalButton";
import StripeModal from "./stripeModal";
import ProjectDescription from "./projectDescription";
import Comments from "./comments";


const ProjectDetails = ({ pId }) => {
  // console.log(pId.projectId);
  const [project, setProject] = useState([]);
  const [tiers, setTiers] = useState([]);
  //const [loading, setLoading] = useState(true);
  //let project = [];
  useEffect(() => {
    const collectionName = "projects";
    const db = getFirestore();
    const colRef = collection(db, collectionName);

    let daysLeft = 0;

    if (pId != undefined) {
      const projId = pId.projectId;
      const docRef = doc(db, "projects", projId);

      getDoc(docRef).then((doc) => {
        //calculate days remaining
        let today = new Date().toISOString().slice(0, 10);
        const endDate = doc.data().endDate;
        const diffInMs = new Date(endDate) - new Date(today);
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24) + 1; //plus 1 => considering endDate = today days,then  remaining = 1;
        //console.log(diffInDays < 0 ? 0 : diffInDays);
        daysLeft = diffInDays < 0 ? 0 : diffInDays;
        //-----------------------------------------------------
        //console.log(doc.data().tiers);
        setTiers(doc.data().tiers);

        //---------------------------------------------------- contibution evaluation
        let contributionSum = 0;
        let contributionCounter = 0;
        const colRef = collection(db, "projects", projId, "contributions");

        const getAllContributions = onSnapshot(colRef, (snapshot) => {
          snapshot.docs.forEach((cSnap) => {
            contributionSum += Number(cSnap.data().amount);
            contributionCounter++;
          });
          let contPercent = (contributionSum / doc.data().goal) * 100; //round to one decimal place
          // console.log(contPercent);
          // console.log(contributionSum);
          // console.log(contributionCounter);
          setProject({
            ...doc.data(),
            id: doc.id,
            daysLeft: daysLeft,
            contributionCounter: contributionCounter,
            contributionSum: contributionSum,
            contPercent: contPercent,
          });
        });
      });
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
            aria-valuenow="50"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className="progress-bar greenBG" style={{ width: project.contPercent + '%' }}></div>
          </div>
          <h1 className="egg slim mb-0">
            $<span id="funds">{project.contributionSum}</span>
          </h1>
          <p className="green mt-0">
            pledged of{" "}
            <strong>
              CA$ <span id="goal">{project.goal}</span>
            </strong>{" "}
            goal
          </p>
          <h1 className="egg slim mb-0" id="backers">
            {project.contributionCounter}
          </h1>
          <p className="green mt-0">backers</p>
          <h1 className="egg slim mb-0" id="deadline">
            {project.daysLeft}
          </h1>
          <p className="green mt-0 mb-5">days left</p>

          
          {/* Now we are checking if project.id exists before rendering StripeModal. This change ensures that the project's ID is correctly 
          stored in the project state object and that StripeModal receives the project's ID as a prop. The reason we need to make sure project.id 
          exists before rendering StripeModal is that React will initially render the component before the useEffect fetches the project data, causing 
          the prop to be undefined. This condition will ensure that StripeModal is only rendered once the project data is fetched and project.id is defined. */}
          {project.id && <StripeModal pId={project.id} />}
          <hr className="green mt-5" />
          <h3>Tiers and rewards</h3>
          <hr className="green" />
          {tiers.map((t, index) => (
            <div key={index} className="mt-2">
              <p className="m-0 text-uppercase green">contribution</p>
              <h1>${t.minContribution}</h1>
              <p className="m-0 text-uppercase green">reward</p>
              <h6>{t.reward}</h6>
              <hr className="green" />
            </div>
          ))}
          <StripeModalButton />
        </div>
      </div>
      {project.id && <Comments projectId={project.id} />} {/* check in place so the Comments component will only be rendered when project.id has a valid value */}
    </div>
  );
};

export default ProjectDetails;
