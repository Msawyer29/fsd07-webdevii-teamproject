"use client";
import React, { useState, useEffect, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@components/CheckoutForm";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render
const stripePromise = loadStripe(
  "pk_test_51MsdkuKcBJEP5unczDs6Q8CfWFl7rGELmQBhDbj9PzXAHfwLcF1xXkYs1FwzNdEhA1xsS59QqIbWzvXBZS7TZPC700sreRX3uA"
);

const StripeModal = ({ pId }) => {
  const [modalKey, setModalKey] = useState(0); // initialize modalKey as 0
  const [paymentSuccess, setPaymentSuccess] = useState(false); // new state for payment success
  const [paymentError, setPaymentError] = useState(null); // new state for payment error
  const [donorName, setDonorName] = useState(""); // new state for the donor name
  const modalRef = useRef(); // ref (modalRef) is created and attached to the modal's root div, see line 42
  // console.log(pId);
  // console.log(pId.projectID);

  useEffect(() => {
    // Get the current user
    const auth = getAuth();
    const user = auth.currentUser;

    // Get Firestore instance
    const db = getFirestore();

    // If a user is logged in, fetch user data from Firestore
    if (user) {
      const q = query(collection(db, "users"), where("uid", "==", user.uid)); // Create a query against the collection.

      getDocs(q)
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const userData = doc.data(); // Get user data
            setDonorName(userData.firstName + " " + userData.lastName); // Set donor name
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
    // console.log(donorName);

    const modalElement = modalRef.current;

    if (!modalElement) {
      return;
    }

    const handleHidden = () => {
      setModalKey(modalKey + 1); // increase modalKey by 1, this refreshes ChekoutForm by creating a new instance of it when modal is closed/hidden
      setPaymentSuccess(false); // reset paymentSuccess when the modal is closed
      setPaymentError(null); // reset paymentError when the modal is closed
    };
    // event listener for the "hidden.bs.modal" event is attached to the modal element
    // this ensures that the handleHidden function (which increments modalKey) is called every time the modal is closed
    modalElement.addEventListener("hidden.bs.modal", handleHidden);

    // Cleanup function to remove event listener
    return () => {
      modalElement.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, [modalKey]);

  return (
    <div
      ref={modalRef}
      className="modal fade"
      id="stripePay"
      tabIndex="-1"
      aria-labelledby="stripePayLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5 dGreen" id="stripePayLabel">
              Dear {donorName}, {/* now using dynamic donor name here */}
            </h1>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <p className="dGreen px-3 mt-3">
            Thank you for your generous donation towards our project. Your
            support not only empowers independent artists but also helps bring
            our creative vision to life.
          </p>
          {paymentSuccess && (
            <div className="alert alert-success text-center mx-5 mt-3">
              Thank you! Your payment was completed successfully.
            </div>
          )}{" "}
          {/* display success alert when paymentSuccess is true */}
          {paymentError && (
            <div className="alert alert-danger text-center mx-5 mt-3">{paymentError}</div>
          )}{" "}
          {/* display error alert when paymentError is set */}
          <div className="modal-body px-5">
            <Elements stripe={stripePromise} key={modalKey}>
              {" "}
              {/* use modalKey as key prop, this forces React to create a new instance of the CheckoutForm component each time the key changes*/}
              <CheckoutForm
                onPaymentSuccess={() => {
                  setPaymentSuccess(true);
                  setPaymentError(null); // Clear the error state
                }}
                onPaymentError={(error) => setPaymentError(error)} // pass functions, set setPaymentSuccess to true & to set paymentError
                pId={pId}
              />
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeModal;
