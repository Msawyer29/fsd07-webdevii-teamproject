"use client";
import React, { useState, useRef } from "react";
import firebase_app from "../firebase/config";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const UpdateUser = () => {
  const updateForm = useRef(null);
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const collectionName = "users";
  const db = getFirestore();
  const colRef = collection(db, collectionName);

  const handleUpdate = (e) => {
    e.preventDefault();
    var userId = updateForm.current.userId.value;
    var newPassword = updateForm.current.password.value;
    const docRef = doc(db, collectionName, userId);
    updateDoc(docRef, {
      password: newPassword,
    }).then(() => {
      setUserId("");
      setPassword("");
    });
  };

  return (
    <div className="container">
      <h2>Update Password by User ID - for testing only</h2>
      <form className="col-6" onSubmit={handleUpdate} ref={updateForm}>
        <input
          type="text"
          className="form-control mb-3"
          id="userId"
          placeholder="User Id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="btn btn-danger my-2">Update User</button>
      </form>
    </div>
  );
};
export { UpdateUser };
