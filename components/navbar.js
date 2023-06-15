"use client";
import React, { useState, useEffect } from 'react';
import Login from "./login";
import {
  getAuth,
  signOut,
} from "firebase/auth";

const auth = getAuth();

const Navbar = () => {
  // onAuthStateChanged gets triggered every time there is a change in the authentication state
  // when a user logs in, it returns a User object, when a user logs out, it returns null - used to conditionally render our navbar links

  // a new state variable currentUser is added to keep track of the current logged-in user
  const [currentUser, setCurrentUser] = useState(null); // to store current logged in user, default set to "null"

  useEffect(() => { // using useEffect to attach the observer on component mount and remove it on component unmount
    // attach the listener when the component is mounted
    // calling auth.onAuthStateChanged which takes a callback function that gets called whenever the authentication state changes
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);  // this will be null when logged out, and contain user object when logged in
    });

    // this function also returns a cleanup function, which we're storing in unsubscribe to remove the observer on component unmount
    // cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []); // empty dependency array means this effect runs once on mount and cleanup on unmount

  const handleLogout = (e) => {
    signOut(auth)
      .then(() => {
        console.log("Logout successfull");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className="container navBar egg dGreenBG d-flex align-items-center justify-content-between py-2">
      <div>
        <img src="/assets/icons/logo.svg" alt="logo" id="logo" />
      </div>

      <div className="d-flex align-items-center me-3">
        <div className="w-50">
          <a className="nav-link" href="#">
            start a project
          </a>
        </div>
        <div className="input-group me-3">
          <input
            type="text"
            className="form-control"
            placeholder="search"
            aria-label="search"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            find
          </button>
        </div>

        {/* In the JSX we are conditionally rendering nav links based on currentUser state */}
        {currentUser ? (
          <a href="#" className="nav-link me-3" onClick={handleLogout}>
            Logout
          </a>
        ) : (
          <>
            <a
              href="#"
              className="nav-link me-3"
              data-bs-toggle="modal"
              data-bs-target="#signUp"
            >
              Register
            </a>
            <a
              href="#"
              className="nav-link"
              data-bs-toggle="modal"
              data-bs-target="#login"
            >
              Login
            </a>
          </>
        )}

        {/* ------------------------- */}
        {/* <!-- Button trigger modal --> */}

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
            </div>
          </div>
        </div>
        {/* ------------------------- */}

      </div>
    </nav>
  );
};

export default Navbar;
