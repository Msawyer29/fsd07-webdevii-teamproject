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
} from "firebase/firestore";
import UserRow from "./userRow";

function GetUserByEmail() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const collectionName = "users";
  const db = getFirestore();
  const colRef = collection(db, collectionName);
  //query
  const q = query(colRef, where("email", "==", "arjun.nbsm@yahoo.com"));
  //if we need order by: (first need to import 'orderBy') :-> this will may produce error if orderBy properties is not indexed, if error occur, click the link that bring to window to index ther properties, click OK to  Add index
  // const q2 = query(
  //   colRef,
  //   where("email", "==", "arjun.nbsm@yahoo.com"),
  //   orderBy("firstName", "desc")
  // );

  let userArray = [];
  //---------------------------------
  useEffect(() => {
    const usersDetails = onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        userArray.push({ ...doc.data(), id: doc.id });
      });
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
export default GetUserByEmail;
