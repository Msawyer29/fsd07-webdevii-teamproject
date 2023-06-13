"use client";
import React, { useState, useRef } from "react";
import firebase_app from "../firebase/config";
import Login from "./login";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const auth = getAuth();

const Navbar = () => {
  const handleLogout = (e) => {
    signOut(auth)
      .then(() => {
        console.log("Logout successfull");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleLogin = (e) => {
    console.log("I am here");
    return <Login />;
  };

  return (
    <nav className="container navBar egg dGreenBG d-flex align-items-center justify-content-between">
      <div>
        <img src="/assets/icons/logo.png" alt="logo" className="logo" />
        <h2 className="m-auto">The Hive</h2>
      </div>

      <div className="d-flex align-items-center me-3">
        <div className="w-50">
          <a className="nav-link" href="#">
            start a project
          </a>
        </div>
        <div class="input-group me-3">
          <input
            type="text"
            class="form-control"
            placeholder="search"
            aria-label="search"
            aria-describedby="button-addon2"
          />
          <button
            class="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            find
          </button>
        </div>
        <a
          href="#"
          className="nav-link me-3"
          data-bs-toggle="modal"
          data-bs-target="#register"
        >
          Register
        </a>
        <a href="#" className="nav-link me-3" onClick={handleLogout}>
          Logout
        </a>
        {/* ------------------------- */}
        {/* <!-- Button trigger modal --> */}
        <a
          href="#"
          className="nav-link"
          data-bs-toggle="modal"
          data-bs-target="#login"
        >
          Login
        </a>

        {/* Modal */}
        <div
          className="modal fade"
          id="login"
          tabIndex="-1"
          aria-labelledby="loginLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title dGreen" id="loginLabel">
                  Login Form
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <Login />
              </div>
              {/* <div class="modal-footer">
                <button type="button" class="btn btn-primary">
                  Login
                </button>
              </div> */}
            </div>
          </div>
        </div>
        {/* ------------------------- */}

        {/* <button className="btn btn-success mx-2" onClick={handleLogin}>
          Login
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
