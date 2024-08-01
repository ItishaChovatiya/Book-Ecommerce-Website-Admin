const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            trim: true,
            required: true, // Ensure username is provided
        },
        email: {
            type: String,
            trim: true,
            required: true, // Ensure email is provided
            unique: true, // Ensure email is unique
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Basic email validation
        },
        password: {
            type: String,
            trim: true,
            required: true, // Ensure password is provided
        },
        address: {
            type: String,
            trim: true,
        },
        userAvatar: {
            type: String,
            default: "https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        favorites: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Book", // Ensure this matches the book model name
            }
        ],
        cart: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Book", // Ensure this matches the book model name
            }
        ],
        orders: [
            {
                type: mongoose.Types.ObjectId,
                ref: "Order", // Ensure this matches the order model name
            }
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User", userSchema); // Use singular "User"
