// models/Order.js
const mongoose = require('mongoose');

// Define the Order Schema
const OrderSchema = new mongoose.Schema({
  
    
      name: {
        type: String,
        required: true, // Ensure this field is required
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
      createdAt: {
        type: Date,
        default: Date.now,
      },
    });

// Create the Order model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
