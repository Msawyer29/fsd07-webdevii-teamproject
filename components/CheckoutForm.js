import React, { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ onPaymentSuccess, onPaymentError }) => {  // Destructure onPaymentSuccess & onPaymentError from props (passed as a prop form stripeModal component)
  // useStripe and useElements are hooks provided by Stripe to access the stripe object and card element respectively
  const stripe = useStripe();
  const elements = useElements();

  // processing state is used to control the disabling of the "Pay" button. If set to true, the button will be disabled.
  const [processing, setProcessing] = useState(false);

  // paymentCompleted state variable for payment completion, after successful payment the Pay button is disabled
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If stripe or elements haven't loaded yet, stop the execution of the handleSubmit function
    if (!stripe || !elements || paymentCompleted) {
      return;
    }
    
    // Once the form is submitted, we set processing to true to disable the button while the payment is processed
    setProcessing(true);
    
    // Fetch the client secret from our backend to use in the payment process
    const response = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 1000 }), // Amount is in cents when using Stripe API
    });

    const clientSecret = await response.text();

    // Confirm the card payment using stripe's confirmCardPayment method
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "John Smith",
        },
      },
    });

    // Check if payment succeeded or failed.
    if (result.error) {
      console.log(result.error.message);
      onPaymentError("Payment declined. Please consult your credit card provider for more details."); // call the passed in function from stripeModal when payment fails
      setProcessing(false); // enables the pay button again if there was an error
    } else {
      if (result.paymentIntent.status === "succeeded") {
        console.log("Payment processed successfully");
        setPaymentCompleted(true); // setting the paymentCompleted to true disables the Pay button after successful payment
        onPaymentSuccess(); // call the passed in function from stripeModal when payment is successful
      }
      setProcessing(false); // enables the pay button again after successful processing
    }
  };

  // Render the form and disable the Pay button if either stripe has not loaded yet or we are in the middle of processing a payment and when payment is successful
  return (
    <div id="form">
    <form onSubmit={handleSubmit}>
      
      <CardElement />
      <button className="btn btn-primary mt-3 " type="submit" disabled={!stripe || processing || paymentCompleted}>
        Pay
      </button>
    </form>
    </div>
  );
};

export default CheckoutForm;