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

const DeleteUser = () => {
  const deleteForm = useRef(null);
  const [userId, setUserId] = useState("");
  const collectionName = "users";
  const db = getFirestore();
  const colRef = collection(db, collectionName);

  const handleDelete = (e) => {
    e.preventDefault();
    var userId = deleteForm.current.userId.value;
    const docRef = doc(db, collectionName, userId);
    deleteDoc(docRef).then(() => {
      setUserId("");
    });
  };

  return (
    <div className="container">
      <h2>Delete User for testing only</h2>
      <form className="col-6" onSubmit={handleDelete} ref={deleteForm}>
        <input
          type="text"
          className="form-control mb-3"
          id="userId"
          placeholder="User Id"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button className="btn btn-danger my-2">Delete User</button>
      </form>
    </div>
  );
};
export { DeleteUser };
