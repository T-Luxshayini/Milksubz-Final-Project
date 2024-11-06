// // routes/subscription.js
// const express = require("express");
// const mongoose = require("mongoose");
// const Stripe = require("stripe");
// const { auth } = require('../middleware/auth'); // Ensure this middleware is correctly defined
// const Subscription = require("../models/Subscription");

// // Create a router instance
// const router = express.Router();

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // Stripe price IDs for weekly and monthly milk subscriptions
// const priceIds = {
//   "price_weekly": "price_1QHI7PFDU5aLIEJOqhgcevUf", // Replace with your actual Stripe weekly price ID
//   "price_monthly": "price_1QGj8PFDU5aLIEJObC5Grm70" // Replace with your actual Stripe monthly price ID
// };

// // Create a subscription
// router.post('/create-subscription', auth,async (req, res) => {
//   try {
//     const { frequency, quantity } = req.body;
//     const user = req.user.userId;

//     const customer = await stripe.customers.create({
//       metadata: { userId: user },
//     });

//     const priceId = priceIds[frequency];

//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ price: priceId, quantity }],
//       payment_behavior: "default_incomplete",
//       expand: ["latest_invoice.payment_intent"],
//     });

//     const newSubscription = new Subscription({
//       user,
//       product: "Milk", // Use a product ID or description
//       stripeSubscriptionId: subscription.id,
//       frequency,
//       quantity,
//       startDate: new Date(),
//       status: "active",
//     });
//     await newSubscription.save();

//     res.status(201).json({
//       subscriptionId: subscription.id,
//       clientSecret: subscription.latest_invoice.payment_intent.client_secret,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ error: error.message });
//   }
// });

// // Webhook for Stripe events
// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//   const sig = req.headers['stripe-signature'];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);

//     if (event.type === 'invoice.payment_succeeded') {
//       const subscriptionId = event.data.object.subscription;
//       await Subscription.findOneAndUpdate(
//         { stripeSubscriptionId: subscriptionId },
//         { status: 'active' }
//       );
//     } else if (event.type === 'invoice.payment_failed') {
//       const subscriptionId = event.data.object.subscription;
//       await Subscription.findOneAndUpdate(
//         { stripeSubscriptionId: subscriptionId },
//         { status: 'cancelled', endDate: new Date() }
//       );
//     }

//     res.json({ received: true });
//   } catch (err) {
//     console.error('Webhook error:', err.message);
//     res.status(400).send(`Webhook Error: ${err.message}`);
//   }
// });

// // Checkout session for subscription
// router.post('/create-checkout-session', async (req, res) => { 
//   try {
//     const { frequency } = req.body;
//     const priceId = priceIds[frequency];

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "subscription",
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error('Error creating checkout session:', error);
//     res.status(500).json({ error: error.message });
//   }
// });


// // Export the router
// module.exports = router;


// const express = require('express'); 
// const stripePackage = require('stripe');
//  const Subscription = require('../models/Subscription');

// const router = express.Router();
// const stripe = stripePackage(process.env.STRIPE_SECRET_KEY); // Use your Stripe Secret Key

// // Route to create a checkout session
// router.post('/create-checkout-session', async (req, res) => {
//   const { priceId, customerId ,customerEmail} = req.body;

//   if (!priceId) {
//     return res.status(400).json({ error: 'Price ID is required' });
//   }

//   try {
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: [{
//         price: priceId, // Plan ID for Stripe
//         quantity: 1,
//       }],
//       mode: 'subscription',
//       customer_email: customerId, // Optionally link a user email
//       success_url: "http://localhost:3000/success",
//       cancel_url: "http://localhost:3000/cancel",
//       metadata: {
//         customerId: customerId,
//         customerEmail
//       },
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: 'Failed to create checkout session' });
//   }
// });

// // Webhook to update subscription status
// router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
//   const signature = req.headers['stripe-signature'];
 

//   let event;
//   try {
//     const event = stripe.webhooks.constructEvent(
//       req.body,
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );


//   if (event.type === 'checkout.session.completed') {
//     const session = event.data.object;

//    // Create subscription record
//    await Subscription.create({
//     userId: session.metadata.customerId,
//     customerEmail: session.metadata.customerEmail,
//     stripeSubscriptionId: session.subscription,
//     status: 'active',
//     priceId: session.metadata.priceId,
//     createdAt: new Date()
//   });
// }
//   res.json({ received: true });
// } catch (error) {
//   console.error('Webhook error:', error);
//   res.status(400).send(`Webhook Error: ${error.message}`);
// }
  
// });

// module.exports = router;




const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uri = process.env.MONGODB_URI;
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the MongoDB client
client.connect();

const router = express.Router();
router.use(cors());
router.use(bodyParser.raw({ type: "application/json" }));

// Route to create Stripe session for subscription
router.post("/create-stripe-session-subscription", async (req, res) => {
  const { userEmail, userId } = req.body;
  let customer;

  // Check for an existing customer by email
  const existingCustomers = await stripe.customers.list({
    email: userEmail,
    limit: 1,
  });

  if (existingCustomers.data.length > 0) {
    // Customer exists
    customer = existingCustomers.data[0];

    // Check if the customer already has an active subscription
    // const subscriptions = await stripe.subscriptions.list({
    //   customer: customer.id,
    //   status: "active",
    //   limit: 1,
    // });

    // if (subscriptions.data.length > 0) {
    //   // Redirect to billing portal to manage existing subscription
    //   const stripeSession = await stripe.billingPortal.sessions.create({
    //     customer: customer.id,
    //     return_url: "http://localhost:3000/",
    //   });
    //   return res.status(409).json({ redirectUrl: stripeSession.url });
    // }
  } else {
    // No customer found, create a new one
    customer = await stripe.customers.create({
      email: userEmail,
      metadata: {
        userId: userId,
      },
    });
  }

  // Create the Stripe checkout session with the customer ID
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [
      {
        price_data: {
          currency: "lkr",
          product_data: {
            name: "Milk Subscription",
            description: "Weekly or Monthly Milk Plan",
          },
          unit_amount: 600000, // Set to 6000 LKR for the monthly plan
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: userId,
    },
    customer: customer.id,
  });

  res.json({ id: session.id });
});

// Webhook for Stripe events
router.post("/webhook", async (req, res) => {
  const db = client.db("subDB");
  const subscriptions = db.collection("subscriptions");

  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "invoice.payment_succeeded") {
    const invoice = event.data.object;

    // Retrieve subscription and customer details on successful payment
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    const customer = await stripe.customers.retrieve(invoice.customer);

    if (invoice.billing_reason === "subscription_create") {
      // Initial payment - store subscription details in the database
      const subscriptionDocument = {
        userId: customer.metadata.userId,
        subId: invoice.subscription,
        endDate: subscription.current_period_end * 1000,
      };

      const result = await subscriptions.insertOne(subscriptionDocument);
      console.log(`New subscription added with _id: ${result.insertedId}`);
    } else if (
      invoice.billing_reason === "subscription_cycle" ||
      invoice.billing_reason === "subscription_update"
    ) {
      // Recurring subscription payments - update the database with new end date
      const filter = { userId: customer.metadata.userId };
      const updateDoc = {
        $set: {
          endDate: subscription.current_period_end * 1000,
        },
      };

      const result = await subscriptions.updateOne(filter, updateDoc);
      console.log(result.matchedCount > 0 ? "Subscription end date updated." : "No document matched for update.");
    }
  }

  // Handling subscription cancellations or updates
  if (event.type === "customer.subscription.updated") {
    const subscription = event.data.object;
    if (subscription.cancel_at_period_end) {
      console.log(`Subscription ${subscription.id} set to cancel at period end.`);
      // Update database status here if needed
    } else {
      console.log(`Subscription ${subscription.id} was renewed.`);
    }
  }

  res.status(200).end();
});

// Close MongoDB connection on app termination
process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("MongoDB disconnected on app termination");
    process.exit(0);
  });
});

module.exports = router;
