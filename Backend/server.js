// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');


// const authRoutes = require('./routes/auth');
// const productRoutes = require('./routes/products');
// const subscriptionRoutes = require('./routes/subscription');
// const adminRoutes = require('./routes/admin');
// const orderRoutes = require('./routes/order'); 

// // Load environment variables
// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Connected to MongoDB'))
// .catch((err) => console.error('Error connecting to MongoDB:', err));

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/products', productRoutes);
// app.use('/api/subscriptions', subscriptionRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api/orders', orderRoutes); // Add the order routes

// const PORT = process.env.PORT || 5005;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // Export the app for testing purposes
// module.exports = app;


import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import subscriptionRoutes from './routes/subscription.js';
import adminRoutes from './routes/admin.js';
import orderRoutes from './routes/order.js'; 
import stripeRoutes from './routes/paymentStripe.js'; // Import the new payment routes
import cartRoutes from './routes/cart.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stripe', stripeRoutes);
app.use('/api/cart', (req, res, next) => {
  console.log('Cart route hit');
  next();
}, cartRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Export the app for testing purposes
export default app; // Use export default for ES module
