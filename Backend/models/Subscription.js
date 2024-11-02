const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
  quantity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  status: { type: String, enum: ['active', 'paused', 'cancelled'], default: 'active' },
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
