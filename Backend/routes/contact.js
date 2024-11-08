// routes/contact.js
const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const router = express.Router();
const emailjs = require('@emailjs/nodejs');
// emailjs.init('YOUR_USER_ID');
// emailjs.init(process.env.EMAILJS_PUBLIC_KEY);
// Route to submit a new contact message
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message saved successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save message.' });
  }
});

// Route to get all contact messages (admin only)
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages.' });
  }
});

router.post('/reply', async (req, res) => {
  const { email, message } = req.body;

  const templateParams = {
    from_email: 'luxshayini1203@gmail.com',
    to_email: email,
    reply_message: message
  };

  try {
    await emailjs.send('service_p9sy49m', 'template_8set0kq', templateParams,'IVJKCR1xxKLEeg7m5');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending email' });
  }
});

module.exports = router;


