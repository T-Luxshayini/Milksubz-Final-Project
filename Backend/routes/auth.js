// const express = require('express');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const User = require('../models/User');

// const router = express.Router();

// ... (previous code remains the same)
// routes/auth.js
import express from 'express'; // Use ES module import
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js'; // Ensure to add .js extension

const router = express.Router();

router.post('/register', async (req, res) => {
  console.log(req.body);
  try {
    const { firstName, lastName, username, email, password, role } = req.body;
    const user = new User({ firstName, lastName, username, email, password, role });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router; // This remains the same

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ error: 'Invalid credentials' });
//     }
//     // Create a JWT token
//     const token = jwt.sign(
//       { userId: user._id, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );
//     // Send the token to the client
//     res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

// module.exports = router;