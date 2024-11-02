const mongoose = require('mongoose');

// Define the Order Schema
const OrderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    required: false,
    ref: 'User', // Assuming you have a User model
  },
  name: {
    type: String,
    required: true, // Make name a required field
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
    required: true, // Add payment ID and make it required
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'], // Possible values for payment status
    default: 'pending', // Default status is 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Order model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
