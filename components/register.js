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

const Register = () => {
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //---------------------------------
  const collectionName = "users";
  const db = getFirestore();
  const colRef = collection(db, collectionName);
  const defaultRole = "regular";

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const userData = Object.fromEntries(data.entries());
    console.log(userData);
    //TODO Validation
    addDoc(colRef, userData).then(() => {
      console.log("form need to refresh now");
      //TODO ResetForm
      setValues({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "",
      });
    });
  };
  //---------------------------------
  return (
    <div className="container">
      <h2>Register Form</h2>
      <form className="col-6" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control mb-3"
          name="role"
          defaultValue={defaultRole}
          hidden
          // value={values.role}
          // onChange={(e) => setValues({ ...values, role: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-3"
          name="firstName"
          // ref={firstNameRef}
          placeholder="First Name"
          value={values.firstName}
          onChange={onChange}
          //onChange={(e) => setValues({ ...values, firstName: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-3"
          name="lastName"
          placeholder="Last Name"
          value={values.lastName}
          onChange={onChange}
          //onChange={(e) => setValues({ ...values, lastName: e.target.value })}
        />
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

export default Register;
// export { DeleteUser };
