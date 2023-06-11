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
    <nav className="container-fluid navBar d-flex align-items-center justify-content-between">
      <div>
        <img src="/assets/icons/logo.png" alt="logo" className="logo" />
        <h2 className="m-auto">The Hive</h2>
      </div>
      <div className="d-flex align-items-center">
        <button className="btn btn-danger mx-2" onClick={handleLogout}>
          LogOut
        </button>
        {/* ------------------------- */}
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Login
        </button>

        {/* Model */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
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
        <h5 className="mx-2">Menu goes here</h5>
      </div>
    </nav>
  );
};

export default Navbar;
