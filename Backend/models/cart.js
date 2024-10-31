import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Link the cart to a user
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      imageUrl: String,
    }
  ],
}, { timestamps: true });

const Cart = mongoose.model('Cart', cartSchema); 
export default Cart;
