// // app/contribution/page.js
// import Contribution from '@components/Contribution';

// export default function ContributePage() {
//     // For testing purposes I hardcoded projectId and contributorId
//     const projectId = '1';
//     const contributorId = '1';

//     return (
//       <div>
//         <h1>Contribute to the project</h1>
//         <Contribution projectId={projectId} contributorId={contributorId} />
//       </div>
//     );
//   }
"use client"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@components/CheckoutForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51MsdkuKcBJEP5unczDs6Q8CfWFl7rGELmQBhDbj9PzXAHfwLcF1xXkYs1FwzNdEhA1xsS59QqIbWzvXBZS7TZPC700sreRX3uA");
export default function App() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
