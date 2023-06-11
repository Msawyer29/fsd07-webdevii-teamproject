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
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const SignUp = () => {
  const signUpForm = useRef(null);
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
    const email = signUpForm.current.email.value;
    const password = signUpForm.current.password.value;
    //TODO Validation
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        console.log("user created :", cred.user);
        console.log("form need to refresh now");
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
      <h2>SignUp Form</h2>
      <form className="col-6" onSubmit={handleSubmit} ref={signUpForm}>
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
        <button className="btn btn-primary my-2">Submit</button>
      </form>
    </div>
  );
};
export default SignUp;
