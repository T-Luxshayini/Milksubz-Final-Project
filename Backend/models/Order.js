// models/Order.js
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
  // items: [
  //   {
  //     productId: {
  //       type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
  //       required: true,
  //       ref: 'Product' // Assuming you have a Product model
  //     },
  //     quantity: {
  //       type: Number,
  //       required: true,
  //     },
  //   }
  // ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Order model
const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
