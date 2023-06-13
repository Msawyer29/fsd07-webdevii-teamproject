// app/contribution/page.js
import { stripe } from '../../firebase/config';
import { addContribution } from '../../firebase/addData';

export default async function handler(req, res) {
  // Check the HTTP method of the request
  switch (req.method) {
    case 'POST': {
      // If it's a POST request, we process the payment
      const { amount, projectId, contributorId } = req.body;

      try {
        // Create a new checkout session
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Project Contribution',
                },
                unit_amount: amount * 100, // convert to cents, Stripe API payments are stored in db as cents
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${req.headers.origin}/cancelled`,
        });

        // Save contribution in Firebase
        await addContribution({
          id: session.id,
          amount,
          date: new Date().toISOString(),
          projectId,
          contributorId,
          paymentDetail: {
            stripeTransactionId: session.payment_intent,
            status: 'PENDING',
          },
        });

        // Send the ID of the checkout session in the response
        res.status(200).json({ id: session.id });
      } catch (err) {
        // If there's an error, respond with a 500 status code and an error message
        res.status(500).json({ error: 'An error occurred, unable to process payment.' });
      }
      break;
    }

    case 'GET': {
      // If it's a GET request, we retrieve the session information
      const { sessionId } = req.query;

      try {
        // Retrieve the session
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Send the session data in the response
        res.status(200).json(session);
      } catch (err) {
        // If there's an error, respond with a 500 status code and an error message
        res.status(500).json({ error: 'An error occurred, unable to retrieve session.' });
      }
      break;
    }

    default:
      // If the HTTP method isn't supported, respond with a 405 status code
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}