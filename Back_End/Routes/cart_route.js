const express = require("express");
const User = require("../Models/User");
const { authenticateToken } = require("./userAuth");

const cartRouter = express.Router();

// Add a book to the cart
cartRouter.put("/add-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const userId = req.user.id; // Use authenticated user ID from middleware

        // Find the user and check if the book is already in the cart
        const userData = await User.findById(userId);
        const bookInCart = userData.cart.includes(bookid);
        if (bookInCart) {
            return res.status(200).json({
                success: true,
                message: "Book is already in cart"
            });
        }

        // Add the book to the cart
        await User.findByIdAndUpdate(userId, { $push: { cart: bookid } });
        return res.status(200).json({
            success: true,
            message: "Book added to cart"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Remove a book from the cart
cartRouter.put("/remove-book/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const userId = req.user.id; // Use authenticated user ID from middleware

        // Remove the book from the cart
        await User.findByIdAndUpdate(userId, { $pull: { cart: bookid } });
        return res.status(200).json({
            success: true,
            message: "Book removed from cart"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get the cart for a particular user
cartRouter.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Use authenticated user ID from middleware

        // Retrieve user data and populate cart with book details
        const userData = await User.findById(userId).populate("cart");
        const cart = userData.cart.reverse(); // Optional: reverse to show the most recent items first

        return res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = cartRouter;
