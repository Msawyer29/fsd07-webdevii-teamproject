// app/success/page.js
import { useEffect, useState } from 'react';
import Layout from '../layout';
import { loadStripe } from '@stripe/stripe-js';

export default function Success() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Get Stripe.js instance
    const fetchSession = async () => {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

      // The URL contains the Checkout Session ID as a query parameter when redirected from the Checkout page app/contribution/page.js
      const urlParams = new URLSearchParams(window.location.search);
      const sessionId = urlParams.get('session_id');

      if (sessionId) {
        const response = await fetch(`/api/contribution/retrieve-checkout-session?sessionId=${sessionId}`);
        const session = await response.json();

        setSession(session);
      }
    };

    fetchSession();
  }, []);

  return (
    <Layout>
      <h1>Thank you for your contribution!</h1>
      {session ? (
        <>
          <p>Your transaction was successful. We appreciate your support.</p>
          <p>Your contribution: ${session.amount_total / 100}</p> {/*Note that amount_total is given in cents, divide by 100 to get the amount in dollars. */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </Layout>
  );
}