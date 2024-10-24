const express = require('express');
const axios = require('axios');
const md5 = require('crypto-js/md5');
const router = express.Router();
const dotenv = require('dotenv');
// Payment creation route
router.post('/create-payment', async (req, res) => {
    dotenv.config();
    const merchantSecret = process.env.PAYHERE_SECRET_KEY;
    const merchantId = process.env.PAYHERE_MERCHANT_ID;
    const orderId = Date.now();
    const amount = req.body.amount;

    // Generate hash
    const hashedSecret = md5(merchantSecret).toString().toUpperCase();
    const amountFormatted = parseFloat(amount).toLocaleString('en-us', { minimumFractionDigits: 2 }).replaceAll(',', '');
    const currency = 'Rs';
    const hash = md5(merchantId + orderId + amountFormatted + currency + hashedSecret).toString().toUpperCase();
    
    const paymentData = {
        merchant_id: merchantId,
        return_url: 'http://localhost:3000/cart',
        cancel_url: 'http://localhost:3000/cancel',
        notify_url: 'http://localhost:3000/notify',
        order_id: orderId,
        items: req.body.items,
        amount: amountFormatted,
        currency: currency,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        city: req.body.city,
        hash: hash,
    };

    console.log("Payment Data:", JSON.stringify(paymentData, null, 2));

    try {
        const response = await axios.post('https://sandbox.payhere.lk/pay/checkout', paymentData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Instead of redirecting, send the payment URL back to the client
        res.json({ payment_url: response.data });
    } catch (error) {
        console.error('Error creating payment:', error.response ? error.response.data : error.message);
        res.status(500).send('Payment creation failed');
    }
});


router.post('/notify', (req, res) => {
    // Log the notification data
    console.log('Payment Notification Received:', req.body);

    // You might want to verify the notification here (check signatures, etc.)
    
    // Based on the notification type, update your database or perform actions accordingly
    const paymentStatus = req.body.status; // This will depend on what the payment gateway sends
    const orderId = req.body.order_id; // The order ID for the transaction

    // Example: Update order status in your database
    if (paymentStatus === 'success') {
        // Update your order as paid
        console.log(`Order ${orderId} has been paid successfully.`);
    } else {
        // Handle other statuses
        console.log(`Order ${orderId} payment failed or was canceled.`);
    }

    // Respond back to the payment gateway with a success acknowledgment
    res.status(200).send('Notification received');
});


module.exports = router;



// const express = require('express');
// const router = express.Router();
// const stripe = require('stripe')('sk_test_51QCqZPFDU5aLIEJOe8i1Jj2S5zEDIMVMqk9zXySN2Auih4SsE2N87Kq1v5FTwMXFEsufxB06ZQj4TaEMn6J5lJzS000AxbMGbL'); // Use your Stripe Secret Key here

// router.post('/create-payment-intent', async (req, res) => {
//   const { amount } = req.body; // Total amount from frontend

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount * 100, // Amount in cents
//       currency: 'usd', // US Dollars
//     });

//     res.send({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// module.exports = router;
