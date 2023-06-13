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
import AddTiers from "./addTiers";

const AddProject = () => {
  const [values, setValues] = useState({
    title: "",
    category: "",
    description: "",
    goal: "",
    status: "",
    startDate: "",
    endDate: "",
    createrId: "",
    startDate: "",
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //---------------------------------
  const colName = "projects";
  const db = getFirestore();
  const colRef = collection(db, colName);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const projectData = Object.fromEntries(data.entries());
    console.log(projectData);
    //TODO Validation
    addDoc(colRef, projectData).then(() => {
      //console.log("form need to refresh now");
      //TODO ResetForm
      setValues({
        title: "",
        category: "",
        description: "",
        goal: "",
        status: "",
        startDate: "",
        endDate: "",
        createrId: "",
        startDate: "",
      });
    });
  };
  //---------------------------------
  return (
    <div className="container">
      <h2>Create Project</h2>
      <form className="col-6" onSubmit={handleSubmit}>
        <div className="d-flex">
          <label className="form-label col-4">Project Title</label>
          <input
            type="text"
            className="form-control mb-3 col-8"
            name="title"
            placeholder="Project Title"
            defaultValue={values.title}
            onChange={onChange}
            // value={values.role}
            // onChange={(e) => setValues({ ...values, role: e.target.value })}
          />
        </div>
        <div className="d-flex">
          <label className="form-label col-4">Category</label>
          <input
            type="text"
            className="form-control mb-3 col-8"
            name="category"
            // ref={firstNameRef}
            placeholder="Category"
            value={values.category}
            onChange={onChange}
            //onChange={(e) => setValues({ ...values, firstName: e.target.value })}
          />
        </div>
        <div className="d-flex">
          <label className="form-label col-4">Project Description</label>
          <textarea
            type="text"
            className="form-control mb-3 col-8"
            rows="6"
            name="description"
            placeholder="Project description here .... "
            value={values.description}
            onChange={onChange}
            //onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          ></textarea>
        </div>
        <div className="d-flex">
          <label className="form-label col-4">Goal Amount</label>
          <input
            type="text"
            className="form-control mb-3 col-8"
            name="goal"
            placeholder="Goal Amount"
            value={values.goal}
            onChange={onChange}
          />
        </div>
        <div className="d-flex">
          <label className="form-label col-4">Start Date</label>
          <input
            type="date"
            className="form-control mb-3 col-8"
            name="startDate"
            placeholder="Start Date"
            value={values.startDate}
            onChange={onChange}
          />
        </div>
        <div className="d-flex">
          <label className="form-label col-4">End Date</label>
          <input
            type="date"
            className="form-control mb-3 col-8"
            name="endDate"
            placeholder="End Date"
            value={values.endDate}
            onChange={onChange}
          />
        </div>
        <div className="d-flex">
          <label className="form-label col-4">Image</label>
          <input
            type="file"
            className="form-control mb-3 col-8"
            name="file"
            placeholder="Choose image ..."
            // defaultValue={values.image}
            // onChange={onChange}
          />
        </div>

        <div className="d-flex">
          <label className="form-label col-4">Tiers</label>
          <AddTiers />
        </div>

        <button className="btn btn-primary my-2">Create Project</button>
      </form>
    </div>
  );
};

export default AddProject;
// export { DeleteUser };
