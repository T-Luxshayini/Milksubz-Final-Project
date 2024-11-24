const express = require('express');
const router = express.Router();
const Order = require('../models/Order.js'); // Assuming the Order model is in the models directory

// Create a new order
router.post('/', async (req, res) => { // Removed auth middleware
  try {
    const { name,lastname, totalAmount, telephone, address, paymentId, paymentStatus } = req.body; // Include paymentId and paymentStatus
    // Validate the incoming data
    if (!name ||!lastname|| !totalAmount || !telephone || !address || !paymentId) {
      return res.status(400).json({ message: 'Name, total amount, telephone, address, and payment ID are required.' });
    }
    const order = new Order({
      name, // Set name in order
      lastname,
      totalAmount,
      telephone,
      address,
      paymentId, // Include payment ID
      paymentStatus // Include payment status (defaults to 'pending')
    });
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.error('Order creation failed:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// Get all orders
router.get('/', async (req, res) => { // Removed adminAuth middleware
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).send(orders); // Respond with the list of orders
  } catch (error) {
    console.error('Error fetching orders:', error); // Log the error
    res.status(500).send('Server Error'); // Send a generic error response
  }
});

// Get order details by ID
router.get('/:id', async (req, res) => { // Removed adminAuth middleware
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Failed to fetch order:', error);
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

module.exports = router;
