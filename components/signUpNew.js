"use client";
import React, { useState, useRef, useEffect } from "react";
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
  const colName = "users";
  const db = getFirestore();
  const colRef = collection(db, colName);
  const defaultRole = "regular";
  const signUpForm = useRef(null);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    uid: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //---------------------------------
  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = [];
    //validation
    if (values.firstName == "") {
      errors.push("First Name is required");
    }
    if (values.lastName == "") {
      errors.push("Last Name is required");
    }

    if (values.email == "") {
      errors.push("Email is required");
    }
    var emailFormat =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (values.email.match(emailFormat) == null) {
      errors.push("Invalid email address");
    }

    if (values.password == "") {
      errors.push("Password is required");
    }

    console.log(errors);
    // for (var i = 0; i < users.length; i++) {
    //   if (users[i].email == email) {
    //     errors.push("Email your provided is already registered");
    //   }
    // }
    // const email = signUpForm.current.email.value;
    // const password = signUpForm.current.password.value;
    //TODO Validation
    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then((cred) => {
        console.log(cred.user.uid);
        values.uid = cred.user.uid;
        values.role = "regular";
        addDoc(colRef, values).then(() => {
          console.log(values);

          //TODO ResetForm
          setValues({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "",
            uid: "",
          });
        });

        console.log("user created :", cred.user.uid);
        //TODO ResetForm
        setValues({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
        });
      })
      .catch((error) => {
        errors.push(error.message);
        //signUpForm.current.successMsgRegister.value = "Error occurred";
      });
  };
  useEffect(() => {});

  //---------------------------------
  return (
    <div className="container">
      <h2>SignUp Form</h2>
      <form className="col-6" onSubmit={handleSubmit} ref={signUpForm}>
        <input
          type="text"
          className="form-control mb-3"
          name="role"
          defaultValue={defaultRole}
          hidden
        />
        <input
          type="text"
          className="form-control mb-3"
          name="firstName"
          placeholder="First Name"
          value={values.firstName}
          onChange={onChange}
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
        <div className="text-center">
          <span name="errorMsgRegister" className="errorMsg"></span>
          <span name="successMsgRegister" className="successMsg"></span>
          <br />
          <button className="btn btn-primary my-2">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default SignUp;

// function clearMsgRegister() {
//   registerErrorMsg.innerHTML = "";
//   registerSuccessMsg.innerHTML = "";
//   registerEmail.value = "";
//   registerPassword.value = "";
// }
