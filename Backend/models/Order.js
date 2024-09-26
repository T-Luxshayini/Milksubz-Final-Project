// models/Order.js
const mongoose = require('mongoose');

// Define the Order Schema
const OrderSchema = new mongoose.Schema({
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Ensure you have a Product model defined and it's correctly referenced
        required: true,
      },
      name: {
        type: String,
        required: true, // Consider making this required if it's always needed
      },
      quantity: {
        type: Number,
        required: true, // Consider making this required for data integrity
      },
      price: {
        type: Number,
        required: true, // Consider making this required as well
      },
    },
  ],
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
