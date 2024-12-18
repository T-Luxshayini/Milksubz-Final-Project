const express = require('express');
const User = require('../models/User.js');
const Product = require('../models/Product.js');
const Subscription = require('../models/Subscription.js');
const { auth, adminAuth } = require('../middleware/auth.js');

const router = express.Router();

// Get all users
router.get('/users', auth, adminAuth, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user by ID (admin only)
router.delete('/users/:id', auth, adminAuth, async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user' });
  }
});

// Update user role by ID
router.put('/users/:id/role', auth, adminAuth, async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;
  try {
    // Update the user's role in the database
    const user = await User.findByIdAndUpdate(userId, { role }, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating role' });
  }
});

// Get dashboard statistics
router.get('/dashboard', auth, adminAuth, async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const productCount = await Product.countDocuments();
    const subscriptionCount = await Subscription.countDocuments();
    const activeSubscriptions = await Subscription.countDocuments({ status: 'active' });
    res.json({
      userCount,
      productCount,
      subscriptionCount,
      activeSubscriptions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
