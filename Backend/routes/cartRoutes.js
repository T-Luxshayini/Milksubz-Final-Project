// routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User model
const { auth } = require('../middleware/auth'); // Import the auth middleware

// Fetch the user's cart
router.get('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // `req.user._id` is set by the auth middleware
    res.json(user.cart); // Return the user's cart
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart' });
  }
});

// Update the user's cart
router.post('/cart', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = req.body.cart; // Update the cart with the items
    await user.save();
    res.json({ message: 'Cart updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart' });
  }
});

// Clear the user's cart
router.post('/cart/clear', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.cart = []; // Clear the cart
    await user.save();
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: 'Error clearing cart' });
  }
});

module.exports = router;
