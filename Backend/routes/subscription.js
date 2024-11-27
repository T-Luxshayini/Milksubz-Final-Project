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


//old

// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();
// const bodyParser = require("body-parser");
// const { MongoClient, ServerApiVersion } = require("mongodb");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const uri = process.env.MONGODB_URI;
// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// // Connect to the MongoDB client
// client.connect();

// const router = express.Router();
// router.use(cors());
// router.use(bodyParser.raw({ type: "application/json" }));

// // Route to create Stripe session for subscription
// router.post("/create-stripe-session-subscription", async (req, res) => {
//   const { userEmail, userId } = req.body;
//   console.log("Received email:", userEmail);
//   console.log("Received userId:", userId);
//   let customer;

//   // Check for an existing customer by email
//   const existingCustomers = await stripe.customers.list({
//     email: userEmail,
//     limit: 1,
//   });

//   if (existingCustomers.data.length > 0) {
//     // Customer exists
//     customer = existingCustomers.data[0];

//     // Check if the customer already has an active subscription
//     // const subscriptions = await stripe.subscriptions.list({
//     //   customer: customer.id,
//     //   status: "active",
//     //   limit: 1,
//     // });

//     // if (subscriptions.data.length > 0) {
//     //   // Redirect to billing portal to manage existing subscription
//     //   const stripeSession = await stripe.billingPortal.sessions.create({
//     //     customer: customer.id,
//     //     return_url: "http://localhost:3000/",
//     //   });
//     //   return res.status(409).json({ redirectUrl: stripeSession.url });
//     // }
//   } else {
//     // No customer found, create a new one
//     customer = await stripe.customers.create({
//       email: userEmail,
//       metadata: {
//         userId: userId,
//       },
//     });
//   }

//   // Create the Stripe checkout session with the customer ID
//   const session = await stripe.checkout.sessions.create({
//     success_url: "http://localhost:3000/products",
//     cancel_url: "http://localhost:3000/cancel",
//     payment_method_types: ["card"],
//     mode: "subscription",
//     billing_address_collection: "auto",
//     line_items: [
//       {
//         price_data: {
//           currency: "lkr",
//           product_data: {
//             name: "Milk Subscription",
//             description: "Monthly Milk Plan",
//           },
//           unit_amount: 600000, // Set to 6000 LKR for the monthly plan
//           recurring: {
//             interval: "month",
//           },
//         },
//         quantity: 1,
//       },
//     ],
//     metadata: {
//       userId: userId,
//     },
//     customer: customer.id,
//   });

//   res.json({ id: session.id });
// });
// // Route to fetch subscription details from Stripe
// router.get("/admin/stripe-subscriptions", async (req, res) => {
//   try {
//     // Retrieve all subscriptions from Stripe
//     const subscriptions = await stripe.subscriptions.list({
//       limit: 100, // Adjust the limit as needed to fetch more subscriptions
//     });

//     // Map through subscriptions to extract the necessary details
//     const subscriptionDetails = subscriptions.data.map((sub) => ({
//       id: sub.id,
//       customerId: sub.customer,
//       status: sub.status,
//       currentPeriodEnd: new Date(sub.current_period_end * 1000).toLocaleDateString(),
//       items: sub.items.data.map((item) => ({
//         product: item.price.product,
//         amount: item.price.unit_amount / 100, // Convert from cents to the main currency unit
//         currency: item.price.currency,
//         interval: item.price.recurring.interval,
//       })),
//     }));

//     // Send the subscription details to the client
//     res.json(subscriptionDetails);
//   } catch (error) {
//     console.error("Error fetching Stripe subscriptions:", error);
//     res.status(500).json({ message: "Error fetching subscription details from Stripe" });
//   }
// });
// // Assuming you're using Express
// router.put('/api/subscriptions/disable/:subscriptionId', async (req, res) => {
//   const { subscriptionId } = req.params;
  
//   try {
//     // Find the subscription in your database or Stripe
//     const subscription = await Subscription.findById(subscriptionId);
//     if (!subscription) {
//       return res.status(404).send({ message: 'Subscription not found' });
//     }

//     // Update subscription status to disabled
//     subscription.status = 'disabled';
//     await subscription.save();

//     // Optionally, update subscription status on Stripe (if needed)
//     // await stripe.subscriptions.update(subscription.stripeSubscriptionId, { status: 'canceled' });

//     res.send({ message: 'Subscription disabled successfully' });
//   } catch (error) {
//     console.error('Error disabling subscription:', error);
//     res.status(500).send({ message: 'Error disabling subscription' });
//   }
// });


// // Webhook for Stripe events
// router.post("/webhook", async (req, res) => {
//   const db = client.db("subDB");
//   const subscriptions = db.collection("subscriptions");

//   const payload = req.body;
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
//   } catch (err) {
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   if (event.type === "invoice.payment_succeeded") {
//     const invoice = event.data.object;

//     // Retrieve subscription and customer details on successful payment
//     const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
//     const customer = await stripe.customers.retrieve(invoice.customer);

//     if (invoice.billing_reason === "subscription_create") {
//       // Initial payment - store subscription details in the database
//       const subscriptionDocument = {
//         userId: customer.metadata.userId,
//         subId: invoice.subscription,
//         endDate: subscription.current_period_end * 1000,
//       };

//       const result = await subscriptions.insertOne(subscriptionDocument);
//       console.log(`New subscription added with _id: ${result.insertedId}`);
//     } else if (
//       invoice.billing_reason === "subscription_cycle" ||
//       invoice.billing_reason === "subscription_update"
//     ) {
//       // Recurring subscription payments - update the database with new end date
//       const filter = { userId: customer.metadata.userId };
//       const updateDoc = {
//         $set: {
//           endDate: subscription.current_period_end * 1000,
//         },
//       };

//       const result = await subscriptions.updateOne(filter, updateDoc);
//       console.log(result.matchedCount > 0 ? "Subscription end date updated." : "No document matched for update.");
//     }
//   }

//   // Handling subscription cancellations or updates
//   if (event.type === "customer.subscription.updated") {
//     const subscription = event.data.object;
//     if (subscription.cancel_at_period_end) {
//       console.log(`Subscription ${subscription.id} set to cancel at period end.`);
//       // Update database status here if needed
//     } else {
//       console.log(`Subscription ${subscription.id} was renewed.`);
//     }
//   }

//   res.status(200).end();
// });

// // Close MongoDB connection on app termination
// process.on("SIGINT", () => {
//   client.close().then(() => {
//     console.log("MongoDB disconnected on app termination");
//     process.exit(0);
//   });
// });

// module.exports = router;



//new
// const express = require('express');
// const Stripe = require('stripe');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// // Load environment variables from a .env file
// require('dotenv').config();

// const router = express.Router(); // Initialize the router
// // Initialize Stripe with Secret Key
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// const app = express();

// // Middleware
// app.use(cors()); // Allow Cross-Origin Resource Sharing
// app.use(bodyParser.json()); // Parse incoming JSON requests

// // Route: Health Check
// app.get('/', (req, res) => {
//   res.send('Stripe backend is running');
// });

// // Route: Create Subscription
// app.post('/create-subscription', async (req, res) => {
//   const { token, email, subscriptionPlan } = req.body;

//   try {
//     // Create a customer
//     const customer = await stripe.customers.create({
//       email: email,
//       source: token.id,
//     });

//     // Create a subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [{ plan: subscriptionPlan }],
//     });

//     res.status(200).send(subscription);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// // Close MongoDB connection on app termination
// process.on("SIGINT", () => {
//   client.close().then(() => {
//     console.log("MongoDB disconnected on app termination");
//     process.exit(0);
//   });
// });



// module.exports = router;


// const express = require('express');
// const Stripe = require('stripe');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { MongoClient } = require('mongodb');
// require('dotenv').config(); // Load environment variables

// const router = express.Router();
// const app = express(); // Main app instance

// // Middleware
// app.use(cors()); // Allow cross-origin requests
// app.use(bodyParser.json()); // Parse incoming JSON requests

// // Initialize Stripe with your Secret Key
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // MongoDB connection
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function connectToDatabase() {
//   if (!client.isConnected()) {
//     await client.connect();
//   }
//   return client.db('Cluster0'); // Replace with your actual database name
// }

// // Function to calculate the total price dynamically
// const calculateTotalPrice = (formData) => {
//   const prices = { '1 week': 1400, '1 month': 5000, '3 months': 14000, '6 months': 26000, '1 year': 50000 };
//   const milkPricePerLiter = 200; // Cost per liter
//   const totalLiters = formData.selectedDates.length * formData.quantity;
//   return prices[formData.subscriptionPlan] + totalLiters * milkPricePerLiter;
// };

// // Route: Health Check
// router.get('/', (req, res) => {
//   res.send('Stripe backend is running');
// });

// // Route: Create Subscription
// router.post('/create-subscription', async (req, res) => {
//   const {
//     token, email, subscriptionPlan, deliveryDays, deliveryTime, address, phone, quantity, selectedDates,
//   } = req.body;

//   try {
//     // Calculate the total price dynamically
//     const formData = { subscriptionPlan, quantity, selectedDates };
//     const totalPrice = calculateTotalPrice(formData);
//     const amountInCents = totalPrice * 100; // Convert to cents

//     // Create a customer
//     const customer = await stripe.customers.create({
//       email: email,
//       source: token.id, // Card token from the frontend
//     });

//     // Create a subscription
//     const subscription = await stripe.subscriptions.create({
//       customer: customer.id,
//       items: [
//         {
//           price_data: {
//             currency: 'lkr', // Update to your local currency
//             product: 'prod_RHC5zz9WHmoAc6', // Replace with your Product ID in Stripe
//             unit_amount: amountInCents,
//             recurring: { interval: 'month' }, // Change based on your interval
//           },
//         },
//       ],
//       metadata: {
//         deliveryDays,
//         deliveryTime,
//         address,
//         phone,
//         quantity,
//       },
//     });

//     // Save subscription details to MongoDB
//     const db = await connectToDatabase();
//     const subscriptionsCollection = db.collection('subscriptions');
//     await subscriptionsCollection.insertOne({
//       customerId: customer.id,
//       email,
//       subscriptionId: subscription.id,
//       subscriptionPlan,
//       totalAmount: totalPrice,
//       deliveryDays,
//       deliveryTime,
//       address,
//       phone,
//       quantity,
//       createdAt: new Date(),
//     });

//     res.status(200).json({ subscription });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: error.message });
//   }
// });

// // Close MongoDB connection on app termination
// process.on('SIGINT', () => {
//   client.close().then(() => {
//     console.log('MongoDB disconnected on app termination');
//     process.exit(0);
//   });
// });

// // Export the router for use in the main app
// module.exports = router;



const express = require('express');
const Stripe = require('stripe');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config(); // Load environment variables

const router = express.Router();
const app = express(); // Main app instance

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON requests

// Initialize Stripe with your Secret Key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// MongoDB connection
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

let database; // Global variable to store the database connection

async function connectToDatabase() {
  if (!database) {
    try {
      // Connect to the MongoDB client if not already connected
      await client.connect();
      database = client.db('test'); // Replace with your actual database name
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw error; // Throw error if connection fails
    }
  }
  return database;
}

// Function to calculate the total price dynamically
const calculateTotalPrice = (formData) => {
  const prices = { '1 week': 1400, '1 month': 5000, '3 months': 14000, '6 months': 26000, '1 year': 50000 };
  const milkPricePerLiter = 200; // Cost per liter
  const totalLiters = formData.selectedDates.length * formData.quantity;
  return prices[formData.subscriptionPlan] + totalLiters * milkPricePerLiter;
};

// Route: Health Check
router.get('/', (req, res) => {
  res.send('Stripe backend is running');
});
// Route: Get All Subscriptions for Admin
router.get('/admin/stripe-subscriptions', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const subscriptionsCollection = db.collection('subscriptions');
    const subscriptions = await subscriptionsCollection.find().toArray();

    // Map and format data for the frontend
    const formattedSubscriptions = subscriptions.map((subscription) => ({
      id: subscription.subscriptionId || subscription._id, // Unique identifier for DataGrid
      _id: subscription._id, // MongoDB Object ID
      customerId: subscription.customerId,
      email: subscription.email,
      subscriptionId: subscription.subscriptionId,
      subscriptionPlan: subscription.subscriptionPlan,
      totalAmount: subscription.totalAmount,
      deliveryDays: subscription.deliveryDays,
      deliveryTime: subscription.deliveryTime,
      address: subscription.address,
      phone: subscription.phone,
      quantity: subscription.quantity,
      createdAt: subscription.createdAt, // Original creation timestamp
      status: subscription.status || 'active', // Default to 'active' if not present
      currentPeriodEnd: subscription.currentPeriodEnd || 'N/A', // Add actual field if available
      items: [
        {
          product: subscription.subscriptionPlan,
          amount: subscription.totalAmount,
          currency: 'LKR', // Default to your currency
          interval: 'month', // Replace with actual interval
        },
      ],
    }));

    res.status(200).json(formattedSubscriptions);
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route: Create Subscription
router.post('/create-subscription', async (req, res) => {
  const {
    token, email, subscriptionPlan, deliveryDays, deliveryTime, address, phone, quantity, selectedDates,
  } = req.body;

  try {
    // Calculate the total price dynamically
    const formData = { subscriptionPlan, quantity, selectedDates };
    const totalPrice = calculateTotalPrice(formData);
    const amountInCents = totalPrice * 100; // Convert to cents

    // Create a customer
    const customer = await stripe.customers.create({
      email: email,
      source: token.id, // Card token from the frontend
    });

    // Create a subscription
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price_data: {
            currency: 'lkr', // Update to your local currency
            product: 'prod_RHC5zz9WHmoAc6', // Replace with your Product ID in Stripe
            unit_amount: amountInCents,
            recurring: { interval: 'month' }, // Change based on your interval
          },
        },
      ],
      metadata: {
        deliveryDays,
        deliveryTime,
        address,
        phone,
        quantity,
      },
    });

    // Save subscription details to MongoDB
    const db = await connectToDatabase();
    const subscriptionsCollection = db.collection('subscriptions');
    await subscriptionsCollection.insertOne({
      customerId: customer.id,
      email,
      subscriptionId: subscription.id,
      subscriptionPlan,
      totalAmount: totalPrice,
      deliveryDays,
      deliveryTime,
      address,
      phone,
      quantity,
      createdAt: new Date(),
    });

    res.status(200).json({ subscription });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: error.message });
  }
});
// Route: Cancel Subscription
router.post('/cancel-subscription', async (req, res) => {
  const { subscriptionId } = req.body;

  try {
    // Cancel the subscription via Stripe
    const canceledSubscription = await stripe.subscriptions.del(subscriptionId);

    // Update the subscription status in MongoDB
    const db = await connectToDatabase();
    const subscriptionsCollection = db.collection('subscriptions');
    const result = await subscriptionsCollection.updateOne(
      { subscriptionId },
      { $set: { status: 'canceled', canceledAt: new Date() } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.status(200).json({ success: true, canceledSubscription });
  } catch (error) {
    console.error('Error canceling subscription:', error);
    res.status(500).json({ error: error.message });
  }
});
// Route: Update Subscription
router.post('/update-subscription', async (req, res) => {
  const { subscriptionId, subscriptionPlan, deliveryDays, deliveryTime, quantity, selectedDates } = req.body;

  try {
    // Recalculate the total price
    const formData = { subscriptionPlan, quantity, selectedDates };
    const totalPrice = calculateTotalPrice(formData);
    const amountInCents = totalPrice * 100; // Convert to cents

    // Update the subscription in Stripe
    const updatedSubscription = await stripe.subscriptions.update(subscriptionId, {
      items: [
        {
          price_data: {
            currency: 'lkr',
            product: 'prod_RHC5zz9WHmoAc6', // Replace with the correct product ID
            unit_amount: amountInCents,
            recurring: { interval: 'month' },
          },
        },
      ],
      metadata: {
        deliveryDays,
        deliveryTime,
        quantity,
      },
    });

    // Update subscription details in MongoDB
    const db = await connectToDatabase();
    const subscriptionsCollection = db.collection('subscriptions');
    const result = await subscriptionsCollection.updateOne(
      { subscriptionId },
      {
        $set: {
          subscriptionPlan,
          totalAmount: totalPrice,
          deliveryDays,
          deliveryTime,
          quantity,
          updatedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    res.status(200).json({ success: true, updatedSubscription });
  } catch (error) {
    console.error('Error updating subscription:', error);
    res.status(500).json({ error: error.message });
  }
});

// Close MongoDB connection on app termination
process.on('SIGINT', async () => {
  try {
    await client.close();
    console.log('MongoDB disconnected on app termination');
    process.exit(0);
  } catch (error) {
    console.error('Error closing MongoDB connection:', error);
    process.exit(1);
  }
});

// Export the router for use in the main app
module.exports = router;
