"use client";
import React, { useState, useRef } from "react";
import firebase_app from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { firebaseStorage } from "../firebase/config";

import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const AddProject = () => {
  // const addProjectForm = useRef(null);
  const [values, setValues] = useState({
    title: "",
    category: "",
    description: "",
    goal: "",
    status: "",
    startDate: "",
    endDate: "",
    createrId: "",
    image: "",
    startDate: "",
    tiers: [{ minContribution: "", reward: "" }],
  });
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onImageSelect = (e) => {
    setValues({ ...values, [e.target.name]: e.target.files[0] });
  };

  //---------------------------------
  const colName = "projects";
  const db = getFirestore();
  const colRef = collection(db, colName);

  //---------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();
    values.tiers = tiers;
    let userUID = getAuth().currentUser.uid;

    console.log(userUID);

    //first upload image then submit data

    //const imagesListRef = ref(firebaseStorage, "images/");

    if (imageUpload == null) return;
    const imageRef = ref(firebaseStorage, `images/${imageUpload.name + v4()}`);
    values.createrId = userUID;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      // getDownloadURL(snapshot.ref).then((url) => {
      //   setImageUrls((prev) => [...prev, url]);
      // });

      //------------------ submit data now
      values.image = `images/${imageUpload.name + v4()}`;
      addDoc(colRef, values).then(() => {
        console.log("form need to refresh now");
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
          image: "",
          tiers: [{ minContribution: "", reward: "" }],
        });
      });
    });

    // //TODO Validation
  };

  console.log(values);

  const [tiers, setTiers] = useState(values.tiers);

  const addRowTable = (e) => {
    e.preventDefault();
    //console.log(user.uid);

    const newTier = {
      minContribution: "",
      reward: "",
    };
    setTiers([...tiers, newTier]);
  };
  //console.log(tiers);
  //---------------------------------------
  const tableRowRemove = (index, e) => {
    e.preventDefault();
    const dataRow = [...tiers];
    dataRow.splice(index, 1);
    setTiers(dataRow);
  };
  //--------------------------------------
  const onValUpdate = (index, e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const data = [...tiers];
    data[index][name] = value;
    setTiers(data);
  };
  //---------------------------------

  //---------------------------------
  return (
    <div className="container">
      <h2>Create Project</h2>
      <form className="col-8" encType="multipart/form-data">
        <div className="d-flex">
          <label className="form-label col-4">Project Title</label>
          <input
            type="text"
            className="form-control mb-3 col-8"
            name="title"
            placeholder="Project Title"
            defaultValue={values.title}
            onChange={onChange}
          />
        </div>
        <div className="d-flex">
          <label className="form-label col-4">Category</label>
          <input
            type="text"
            className="form-control mb-3 col-8"
            name="category"
            placeholder="Category"
            value={values.category}
            onChange={onChange}
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
            //value={values.image}
            //onChange={onChange}
            //onChange={onImageSelect}
            onChange={(event) => {
              setImageUpload(event.target.files[0]);
            }}
          />
        </div>

        <div className="d-flex">
          <label className="form-label col-4">Tiers</label>
          <div className="col-12">
            <table className="table">
              <thead>
                <tr>
                  <th className="col-3">Minimum Contribution</th>
                  <th className="col-7">Reward</th>
                  <th className="col-2">
                    <button
                      className="btn btn-outline-primary btnTiers"
                      onClick={addRowTable}
                    >
                      Add
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={tier.minContribution}
                        onChange={(e) => onValUpdate(index, e)}
                        name="minContribution"
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={tier.reward}
                        onChange={(e) => onValUpdate(index, e)}
                        name="reward"
                        className="form-control"
                      />
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger btnTiers"
                        onClick={(e) => tableRowRemove(index, e)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <button
          className="btn btn-primary my-2"
          onClick={(e) => handleSubmit(e)}
        >
          Create Project
        </button>
      </form>
    </div>
  );
};
export default AddProject;
