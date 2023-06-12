"use client";
import React, { useState, useRef } from "react";

const Successful = () => {
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
        <div className="col-md-3">
          <img
            src="/assets/images/together.jpg"
            className="img-fluid"
            alt="..."
          />
          <div className="eggBG dGreen p-2 m-0"><strong>Project Title &#8594;</strong></div>
        </div>
        <div className="col-md-3">
          <img
            src="/assets/images/together.jpg"
            className="img-fluid"
            alt="..."
          />
          <div className="eggBG dGreen p-2 m-0"><strong>Project Title &#8594;</strong></div>
        </div>
        <div className="col-md-3">
          <img
            src="/assets/images/together.jpg"
            className="img-fluid"
            alt="..."
          />
          <div className="eggBG dGreen p-2 m-0"><strong>Project Title &#8594;</strong></div> 
        </div>
      </div>
    </div>
  );
};

export default Successful;
