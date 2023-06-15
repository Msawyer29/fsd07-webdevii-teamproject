"use client";
import React, { useState, useEffect } from "react";
import Login from "./login";
import { getAuth, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Modal from 'react-bootstrap/Modal';


const auth = getAuth();

const Navbar = () => {
  // onAuthStateChanged gets triggered every time there is a change in the authentication state
  // when a user logs in, it returns a User object, when a user logs out, it returns null - used to conditionally render our navbar links

  // a new state variable currentUser is added to keep track of the current logged-in user
  const [currentUser, setCurrentUser] = useState(null); // to store current logged in user, default set to "null"
  const [userName, setUserName] = useState(""); // create a new state variable userName

  // Add a new state to control the visibility of the Login modal.
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    // using useEffect to attach the observer on component mount and remove it on component unmount
    // attach the listener when the component is mounted
    // calling auth.onAuthStateChanged which takes a callback function that gets called whenever the authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user); // this will be null when logged out, and contain user object when logged in
    });

    // this function also returns a cleanup function, which we're storing in unsubscribe to remove the observer on component unmount
    // cleanup the listener when the component is unmounted
    return () => unsubscribe();
  }, []); // empty dependency array means this effect runs once on mount and cleanup on unmount

  // code to fetch logged in user's name
  useEffect(() => {
    const fetchUserName = async () => {
      if (currentUser) {
        const db = getFirestore();
        const q = query(
          collection(db, "users"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          setUserName(`${userData.firstName} ${userData.lastName}`);
        });
      } else {
        setUserName("");
      }
    };

    fetchUserName();
  }, [currentUser]);

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
        <a href="/">
          <img src="/assets/icons/logo.svg" alt="logo" id="logo" />
        </a>
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
      </div>
  
      {currentUser ? (
        <a
          href="#"
          className="nav-link me-3 d-flex"
          style={{ whiteSpace: "nowrap" }}
          onClick={handleLogout}
        >
          {userName}, Logout
        </a>
      ) : (
        <div className="d-flex justify-content-end">
          <a
            href="#"
            className="nav-link me-1"
            data-bs-toggle="modal"
            data-bs-target="#signUp"
          >
            Register
          </a>
          <a
            href="#"
            className="nav-link ms-1"
            onClick={(e) => {
              e.preventDefault();
              setShowLogin(true);
            }}
          >
            Login
          </a>
        </div>
      )}
      <Modal
        show={showLogin}
        onHide={() => setShowLogin(false)}
        aria-labelledby="loginLabel"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="loginLabel" style={{ color: "#000" }}>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Login closeModal={() => setShowLogin(false)} />
        </Modal.Body>
      </Modal>
    </nav>
  );
}

export default Navbar;
