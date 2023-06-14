"use client";

// maybe delete down



import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51MsdkuKcBJEP5unczDs6Q8CfWFl7rGELmQBhDbj9PzXAHfwLcF1xXkYs1FwzNdEhA1xsS59QqIbWzvXBZS7TZPC700sreRX3uA");

// maybe delete up

import StripeModalButton from "./stripeModalButton";
import StripeModal from "./stripeModal";


import ProjectDescription from "./projectDescription";
import Comments from "./comments";
const ProjectDetails = () => {
  return (
    <div>
      <h1 className="egg">Project Title</h1>
      <div className="row d-flex">
        <div className="col-md-8 px-3">
          <img
            src="/assets/images/together.jpg"
            className="img-fluid"
            alt="..."
          />
          <ProjectDescription />
          <Comments />
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
              CA$ <span id="goal">15.000</span>
            </strong>{" "}
            goal
          </p>
          <h1 className="egg slim mb-0" id="backers">
            193
          </h1>
          <p className="green mt-0">backers</p>
          <h1 className="egg slim mb-0" id="deadline">
            21
          </h1>
          <p className="green mt-0 mb-5">days left</p>
         
         
        <StripeModalButton />
          <StripeModal />

         
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
