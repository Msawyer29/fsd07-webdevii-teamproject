import firebase_app from "./config";
import { getFirestore, collection, doc, getDocs } from "firebase/firestore";

const db = getFirestore(firebase_app);

export default async function GetAllData(collection) {
  let docRef = doc(db, collection);

  let result = null;
  let error = null;

  try {
    result = await getDocs(docRef);
  } catch (e) {
    error = e;
  }

  return { result, error };
}

//Not used till now
