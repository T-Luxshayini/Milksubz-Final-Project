const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');  // Assuming you move your Cart model to a models folder

// Get cart for a user
router.get('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.json(cart || { userId: req.params.userId, items: [] });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add item to cart
router.post('/:userId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.params.userId });
        
        if (!cart) {
            cart = new Cart({
                userId: req.params.userId,
                items: [req.body]
            });
        } else {
            cart.items.push(req.body);
        }
        
        await cart.save();
        res.status(201).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update cart item
router.put('/:userId/item/:itemId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(item => item._id.toString() === req.params.itemId);
        if (itemIndex > -1) {
            cart.items[itemIndex] = { ...cart.items[itemIndex], ...req.body };
            await cart.save();
            res.json(cart);
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete item from cart
router.delete('/:userId/item/:itemId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(item => item._id.toString() !== req.params.itemId);
        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Clear cart
router.delete('/:userId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        if (cart) {
            cart.items = [];
            await cart.save();
        }
        res.json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;