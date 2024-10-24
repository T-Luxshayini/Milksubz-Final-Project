// // backend/api/routes/payment.js
// const express = require('express');
// const Stripe = require('stripe');
// const router = express.Router();

// // Use your secret key from the Stripe Dashboard
// const stripe = Stripe('sk_test_51QCqZPFDU5aLIEJOe8i1Jj2S5zEDIMVMqk9zXySN2Auih4SsE2N87Kq1v5FTwMXFEsufxB06ZQj4TaEMn6J5lJzS000AxbMGbL');

// router.post('/create-payment-intent', async (req, res) => {
//   const { totalAmount } = req.body;  // get totalAmount from request body

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: Math.round(totalAmount * 100), // amount in cents
//       currency: 'usd',
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// module.exports = router;
