"use client";
import React, { useEffect, useState } from "react";
import firebase_app from "../firebase/config";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
  limit,
  orderBy,
} from "firebase/firestore";
import UserRow from "./userRow";

function GetUserByEmail() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionName = "users";
  const db = getFirestore();
  const colRef = collection(db, collectionName);
  //query
  const pq = query(colRef, where("email", "==", "arjun.nbsm@yahoo.com"));

  let userArray = [];

  //---------------------------------
  useEffect(() => {
    const usersDetails = onSnapshot(pq, (snapshot) => {
      console.log(snapshot.docs);
      snapshot.docs.forEach((doc) => {
        userArray.push({ ...doc.data(), id: doc.id });
      });
      setUsers(userArray);
      setLoading(false);
      // console.log(userArray);
      // console.log(userArray["qNvKewgiffu7GmKtDq3R"]);
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
export default GetUserByEmail;
