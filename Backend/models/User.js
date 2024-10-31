// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


// const cartItemSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   quantity: { type: Number, default: 1 },
//   imageUrl: String,
//   description: String
// });

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true }, 
  lastName: { type: String, required: true }, 
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  // cart: [cartItemSchema]
  // isActive: { type: Boolean, default: true }, // Active by default
  // createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model('User', userSchema);

export default User;

