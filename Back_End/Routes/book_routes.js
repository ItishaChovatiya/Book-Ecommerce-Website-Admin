const express = require("express");
const bookRouter = express.Router();
const jwt = require("jsonwebtoken");
const Book = require("../Models/Book");
const User = require("../Models/User");
const { authenticateToken } = require("./userAuth");

// Add a new book (Admin only)
bookRouter.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;

        // Ensure the user is an admin
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(403).json({ message: "Access denied. Admins only." });
        }

        // Create and save the new book
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        });
        await book.save();
        res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update a book
bookRouter.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        // Update the book details
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            description: req.body.description,
            language: req.body.language
        });
        res.status(200).json({ message: "Book updated successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Delete a book
bookRouter.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;

        // Delete the book
        await Book.findByIdAndDelete(bookid);
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get all books
bookRouter.get("/get-all-books", async (req, res) => {
    try {
        // Retrieve and sort books by creation date
        const books = await Book.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get recently added books (limit 4)
bookRouter.get("/get-recent-books", async (req, res) => {
    try {
        // Retrieve the most recent 4 books
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);
        res.status(200).json({ success: true, data: books });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get a book by its ID
bookRouter.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve the book by ID
        const book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" });
        }
        res.status(200).json({ success: true, data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = bookRouter;
