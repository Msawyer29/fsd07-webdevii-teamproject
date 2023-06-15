"use client";
import React, { useState, useRef } from "react";
import firebase_app from "../firebase/config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import { firebaseStorage } from "../firebase/config";
import Footer from "./footer";

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
  const [tiers, setTiers] = useState(values.tiers);
  const [imageUpload, setImageUpload] = useState(null);
  //const [imageUrls, setImageUrls] = useState([]);

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

    //console.log(userUID);

    //first upload image then submit data

    //const imagesListRef = ref(firebaseStorage, "images/");

    if (imageUpload == null) return;
    const imageRef = ref(firebaseStorage, `images/${v4() + imageUpload.name}`);
    values.createrId = userUID;
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref)
        .then((url) => {
          values.image = url;
        })
        .then(() => {
          //------------------ submit data now
          // values.image = `images/${imageUpload.name + v4()}`;
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
            setTiers(values.tiers);
            setImageUpload(null);
          });
        });
    });

    // //TODO Validation
  };

  //console.log(values);

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
    <div className="container my-5">
         <hr className="green" />
      <h1 className="egg text-upercase text-center">Create a New Project</h1>
      <hr className="green" />
      <div className="spacer"></div>
      <div className="col-md-8 mx-auto mb-5">
      <form className="" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label h4">Project Title</label>
          <input
            type="text"
            className="form-control mb-3 "
            name="title"
            placeholder="Project Title"
            defaultValue={values.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label h4">Category</label>
          <input
            type="text"
            className="form-control mb-3 "
            name="category"
            placeholder="Category"
            value={values.category}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label h4">Project Description</label>
          <textarea
            type="text"
            className="form-control mb-3 "
            rows="6"
            name="description"
            placeholder="Project description here .... "
            value={values.description}
            onChange={onChange}
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label h4">Goal Amount</label>
          <input
            type="text"
            className="form-control mb-3 "
            name="goal"
            placeholder="Goal Amount"
            value={values.goal}
            onChange={onChange}
          />
        </div>

        <div className="d-flex">
        <div className="mb-3 col-md-6 pe-2">
          <label className="form-label h4">Start Date</label>
          <input
            type="date"
            className="form-control mb-3 "
            name="startDate"
            placeholder="Start Date"
            value={values.startDate}
            onChange={onChange}
          />
        </div>
        <div className="mb-3 col-md-6 ps-2">
          <label className="form-label h4">End Date</label>
          <input
            type="date"
            className="form-control mb-3 "
            name="endDate"
            placeholder="End Date"
            value={values.endDate}
            onChange={onChange}
          />
        </div>
        </div>

        <div className="mb-3">
          <label className="form-label h4">Image</label>
          <input
            type="file"
            className="form-control mb-3 "
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
        <div className="mb-5">
        <div className="mb-3">
          <label className="form-label h4">Tiers</label>
          <div className="col-12">
            <table className="table rounded">
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
        </div>
        <a
          href="#"
          className="myBtnEgg"
          onClick={(e) => handleSubmit(e)}
        >
          Create Project
        </a>
      </form>
    </div>
    <Footer />
    </div>
  );
};
export default AddProject;
