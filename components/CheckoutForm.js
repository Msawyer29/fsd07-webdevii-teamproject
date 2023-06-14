import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setProcessing(true); // disables the pay button after submission
    
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }), // Amount is in cents
    });

    const clientSecret = await response.text();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "John Smith",
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment processed successfully!");
      }
    }
  };
  

  return (
    <div id="form">
    <form onSubmit={handleSubmit}>
      
      <CardElement />
      <button className="btn btn-primary mt-3 " type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
    </div>
  );
};

export default CheckoutForm;