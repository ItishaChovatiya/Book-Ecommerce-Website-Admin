const express = require("express");
const User = require("../Models/User");
const { authenticateToken } = require("./userAuth");

const favRouter = express.Router();

// Add a book to favorites
favRouter.put("/add-fav", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const userId = req.user.id; // Use authenticated user ID from middleware

        // Check if the book is already in the favorites list
        const userData = await User.findById(userId);
        const isBookFavorite = userData.favorites.includes(bookid);
        if (isBookFavorite) {
            return res.status(200).json({ message: "Book is already in favorites" });
        }

        // Add the book to the favorites list
        await User.findByIdAndUpdate(userId, { $push: { favorites: bookid } });
        return res.status(200).json({ message: "Book added to favorites" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Remove a book from favorites
favRouter.put("/remove-fav", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const userId = req.user.id; // Use authenticated user ID from middleware

        // Check if the book is in the favorites list and remove it
        const userData = await User.findById(userId);
        const isBookFavorite = userData.favorites.includes(bookid);
        if (isBookFavorite) {
            await User.findByIdAndUpdate(userId, { $pull: { favorites: bookid } });
        }

        return res.status(200).json({ message: "Book removed from favorites" });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get favorite books for a particular user
favRouter.get("/get-fav-books", authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Use authenticated user ID from middleware

        // Retrieve user data and populate the favorites field
        const userData = await User.findById(userId).populate("favorites");
        const favorites = userData.favorites;

        return res.status(200).json({
            success: true,
            data: favorites
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = favRouter;
