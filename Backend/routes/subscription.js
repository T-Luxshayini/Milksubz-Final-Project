// routes/subscriptions.js
const express = require('express');
const Subscription = require('../models/Subscription');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

// Create a subscription
router.post('/', auth, async (req, res) => {
  try {
    const subscription = new Subscription({
      ...req.body,
      user: req.user.userId,
    });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user's subscriptions
router.get('/my', auth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find({ user: req.user.userId }).populate('product');
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a subscription
router.patch('/:id', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      req.body,
      { new: true }
    );
    if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
    res.json(subscription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Cancel a subscription
router.delete('/:id', auth, async (req, res) => {
  try {
    const subscription = await Subscription.findOneAndUpdate(
      { _id: req.params.id, user: req.user.userId },
      { status: 'cancelled', endDate: new Date() },
      { new: true }
    );
    if (!subscription) return res.status(404).json({ error: 'Subscription not found' });
    res.json({ message: 'Subscription cancelled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin routes
router.get('/all', auth, adminAuth, async (req, res) => {
  try {
    const subscriptions = await Subscription.find().populate('user product');
    res.json(subscriptions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;