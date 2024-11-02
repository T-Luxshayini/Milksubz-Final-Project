const express = require('express');
const { stripeWebhookMiddleware } = require('../middleware/stripeWebhookMiddleware');
const router = express.Router();

router.post('/webhook', stripeWebhookMiddleware, (req, res) => {
  const event = req.stripeEvent;
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log(`PaymentIntent for ${paymentIntent.amount} was successful!`);
      // Handle successful payment here (e.g., update order status)
      break;
    case 'payment_intent.payment_failed':
      console.log('Payment failed.');
      // Handle failed payment here
      break;
    // Add more event types as needed
    default:
      console.warn(`Unhandled event type ${event.type}`);
  }
  res.json({ received: true });
});

module.exports = router;
