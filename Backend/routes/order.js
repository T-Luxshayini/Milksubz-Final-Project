// routes/orders.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order'); // Assuming the Order model is in the models directory
const { auth, adminAuth } = require('../middleware/auth'); // Middleware for authentication

// Create a new order
router.post('/', async (req, res) => {
    try {
      const { items, totalAmount, telephone, address } = req.body;
  
      // Validate the incoming data
      if (!items || items.length === 0) {
        return res.status(400).json({ message: 'Order items are required.' });
      }
      if (!telephone || !address) {
        return res.status(400).json({ message: 'Telephone number and address are required.' });
      }
  
      const order = new Order({
        items,
        totalAmount,
        telephone,
        address,
        paymentStatus: 'Completed',
      });
  
      await order.save();
      res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
      console.error('Order creation failed:', error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  });

// Get all orders (Admin route)
router.get('/', async (req, res) => {
    try {
      const orders = await Order.find(); // Fetch all orders from the database
      res.status(200).send(orders); // Respond with the list of orders
    } catch (error) {
      console.error('Error fetching orders:', error); // Log the error
      res.status(500).send('Server Error'); // Send a generic error response
    }
  });

// Get order details by ID
router.get('/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId');
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch order' });
  }
});

module.exports = router;
