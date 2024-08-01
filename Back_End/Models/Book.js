const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
    {
        url: {
            type: String,
            trim: true,
            required: true, // Ensure URL is provided
        },
        title: {
            type: String,
            trim: true,
            required: true, // Ensure title is provided
        },
        author: {
            type: String,
            trim: true,
            required: true, // Ensure author is provided
        },
        price: {
            type: Number,
            required: true, // Ensure price is provided
            min: 0, // Price should be a positive number
        },
        description: {
            type: String,
            trim: true,
        },
        language: {
            type: String,
            trim: true,
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", bookSchema); // Use singular "Book"
