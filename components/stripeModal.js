"use client";
import React, { useState, useEffect, useRef } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@components/CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid recreating the `Stripe` object on every render
const stripePromise = loadStripe(
  "pk_test_51MsdkuKcBJEP5unczDs6Q8CfWFl7rGELmQBhDbj9PzXAHfwLcF1xXkYs1FwzNdEhA1xsS59QqIbWzvXBZS7TZPC700sreRX3uA"
);

const StripeModal = () => {
  const [modalKey, setModalKey] = useState(0); // initialize modalKey as 0
  const [paymentSuccess, setPaymentSuccess] = useState(false); // new state for payment success
  const [paymentError, setPaymentError] = useState(null); // new state for payment error
  const modalRef = useRef(); // ref (modalRef) is created and attached to the modal's root div, see line 36

  useEffect(() => {
    const modalElement = modalRef.current;

    if (!modalElement) {
      return;
    }

    const handleHidden = () => {
      setModalKey(modalKey + 1); // increase modalKey by 1, this refreshes ChekoutForm by creating a new instance of it when modal is closed/hidden
      setPaymentSuccess(false); // reset paymentSuccess when the modal is closed
    };
    // event listener for the "hidden.bs.modal" event is attached to the modal element
    // this ensures that the handleHidden function (which increments modalKey) is called every time the modal is closed
    modalElement.addEventListener('hidden.bs.modal', handleHidden);

    // Cleanup function to remove event listener
    return () => {
      modalElement.removeEventListener('hidden.bs.modal', handleHidden);
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
              Dear [Donor's Name],
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
          {paymentSuccess && <div className="alert alert-success mt-3">Thank you! Your payment was completed successfully.</div>} {/* display success alert when paymentSuccess is true */}
          {paymentError && <div className="alert alert-danger mt-3">{paymentError}</div>} {/* display error alert when paymentError is set */}
          <div className="modal-body px-5">
            <Elements stripe={stripePromise} key={modalKey}> {/* use modalKey as key prop, this forces React to create a new instance of the CheckoutForm component each time the key changes*/}
            <CheckoutForm 
              onPaymentSuccess={() => setPaymentSuccess(true)}
              onPaymentError={(error) => setPaymentError(error)} // pass functions, set setPaymentSuccess to true & to set paymentError
            /> 
            </Elements>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StripeModal;