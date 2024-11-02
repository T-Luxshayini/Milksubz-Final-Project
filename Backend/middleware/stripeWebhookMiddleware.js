const Stripe = require('stripe');
const express = require('express');
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Middleware to verify and handle Stripe webhook events
const stripeWebhookMiddleware = express.raw({ type: 'application/json' }, (req, res, next) => {
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    req.stripeEvent = event; // Attach event to request for route handling
    next();
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
});

module.exports = { stripeWebhookMiddleware };
