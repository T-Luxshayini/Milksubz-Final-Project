// routes/cart.js
import express from 'express';
import Cart from '../models/cart.js';

const router = express.Router();


// POST /api/cart/save to save cart data
router.post('/save', async (req, res) => {
    console.log('Save route hit');
    const { cart, userId } = req.body; // Destructure userId from request body

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    if (!cart || cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    try {
        // Save cart data with userId
        const newCart = new Cart({ userId, items: cart });
        await newCart.save();

        res.status(200).json({ message: 'Cart saved successfully' });
    } catch (error) {
        console.error('Error saving cart:', error);
        res.status(500).json({ error: 'Error saving cart' });
    }
});

export default router;
