"use client";
import React, { useEffect, useState } from "react";
import firebase_app from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import UserRow from "./userRow";

function GetAllUser() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionName = "users";
  const db = getFirestore();
  const colRef = collection(db, collectionName);
  let userArray = [];
  //---------------------------------
  useEffect(() => {
    const usersDetails = onSnapshot(colRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        userArray.push({ ...doc.data(), id: doc.id });
      });

      // snapshot.docs.forEach((doc) => {
      //   userArray.push({ ...doc.data(), id: doc.id });
      // });
      setUsers(userArray);
      setLoading(false);
      console.log(userArray);
      userArray = []; //reset userArray
    });
  }, []);
  //console.log(users);
  if (loading) {
    return (
      <div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div>
      {users.map((user) => (
        <UserRow key={user.id} user={user} />
      ))}
    </div>
  );
}
export default GetAllUser;
