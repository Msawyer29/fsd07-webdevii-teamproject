"use client";
import React, { useState, useRef } from "react";

const Featured = () => {
  return (
    <div className="mb-5">
      <h6 className="egg text-uppercase mt-5 mb-3">featured projects</h6>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="row d-flex">
              <div className="col-md-8 px-3">
                <img
                  src="/assets/images/together.jpg"
                  className="img-fluid"
                  alt="..."
                />
              </div>
              <div className="col-md-4 px-3">
                <h2 className="egg projectTitle text-capitalize">
                  together alone documentary film
                </h2>

                <p className="green projectDescription">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <p className="egg fst-italic projectAuthor">by Mark Boone</p>
                <h4>
                  <a className="green" href="#">
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

export default Featured;
