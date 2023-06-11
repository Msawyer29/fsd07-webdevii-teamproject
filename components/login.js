"use client";
import React, { useState, useRef } from "react";
import firebase_app from "../firebase/config";
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
  signInWithEmailAndPassword,
} from "firebase/auth";

const auth = getAuth();

const Login = () => {
  const loginForm = useRef(null);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //---------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = loginForm.current.email.value;
    const password = loginForm.current.password.value;
    //TODO Validation
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("Login successful :", cred.user);
        //TODO ResetForm
        setValues({
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  //---------------------------------
  return (
    <div className="container">
      <form className="col-12" onSubmit={handleSubmit} ref={loginForm}>
        <input
          type="email"
          className="form-control mb-3"
          id="email"
          name="email"
          placeholder="Email"
          aria-describedby="emailHelp"
          value={values.email}
          onChange={onChange}
        />
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={onChange}
        />
        <button className="btn btn-primary my-2">Login</button>
      </form>
    </div>
  );
};
export default Login;
