"use client"
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "@components/CheckoutForm";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51MsdkuKcBJEP5unczDs6Q8CfWFl7rGELmQBhDbj9PzXAHfwLcF1xXkYs1FwzNdEhA1xsS59QqIbWzvXBZS7TZPC700sreRX3uA");

const StripeModal = () => {
  return (
    <div
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
                <p className="dGreen px-3 mt-3">Thank you for your generous donation towards our art project. Your support not only empowers independent artists but also helps bring our creative vision to life.</p>
                <div className="modal-body px-5">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                </div>
              </div>
            </div>
          </div>
  )
}

export default StripeModal