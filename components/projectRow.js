"use client";
//import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { firebaseStorage } from "../firebase/config";
//import React, { useState, useRef } from "react";
//import { getStorage, ref } from "firebase/storage";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ProjectRow = ({ project }) => {
  let createrID = project.createrId;
  let createrName = project.creater;
  let projectID = project.id;
  let imageUrl = project.image;
  let projectDesc = project.description.substring(0, 240) + " .....";
  return (
    <div className="mb-5">
      <h6 className="egg text-uppercase mt-5 mb-3">featured projects</h6>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex">
              <div className="col-md-8 px-3">
                <img src={imageUrl} className="img-fluid" alt="..." />
              </div>
              <div className="col-md-4 px-3">
                <h2 className="egg projectTitle text-capitalize">
                  {project.title}
                </h2>

                <p className="green projectDescription">{projectDesc}</p>
                <a
                  href="#"
                  className="green"
                  // className="egg fst-italic projectAuthor"
                  onClick={(e) => getCreaterProfile({ createrID }, e)}
                >
                  {createrName} &#8594;
                </a>
                <h4>
                  <a
                    className="green"
                    href="#"
                    onClick={(e) => getCreaterProfile({ projectID }, e)}
                  >
                    read more &#8594;
                  </a>
                </h4>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ProjectRow;
