import firebase_app from "./config";
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";

const db = getFirestore(firebase_app);
export default async function addData(colllection, id, data) {
  let result = null;
  let error = null;

  try {
    result = await setDoc(doc(db, colllection, id), data, {
      merge: true,
    });
  } catch (e) {
    error = e;
  }

  return { result, error };
}

// Contribution via Stripe API payment
export async function addContribution(contribution) {
  try {
    const docRef = await addDoc(collection(db, 'contributions'), contribution);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}