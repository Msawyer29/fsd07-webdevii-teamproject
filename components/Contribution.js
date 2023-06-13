// components/Contribution.js
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

export default function Contribution({ projectId, contributorId }) {
  const [amount, setAmount] = useState(0);

  // initialize Stripe with your publishable key
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  const processPayment = async (event) => {
    event.preventDefault();

    const stripe = await stripePromise;
    
    // Create a new Checkout Session using the server-side endpoint you're going to create
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount, // Use a proper calculation for cents
        projectId: projectId,
        contributorId: contributorId
      }),
    });
    
    const session = await response.json();

    // Redirect user to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    
    if (result.error) {
      // If redirectToCheckout fails due to a browser or network error, display the localized error message to your customer
      alert(result.error.message);
    }
  }

  return (
    <form onSubmit={processPayment}>
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" required />
      <button type="submit">Contribute</button>
    </form>
  );
}
