// app/cancelled/page.js
import Layout from '../layout';

export default function Cancelled() {
  return (
    <Layout>
      <h1>Transaction cancelled</h1>
      <p>Your transaction was cancelled. Please consult your credit card provider for further details.</p>
      <p>You were not charged for your contribution.</p>
    </Layout>
  );
}
