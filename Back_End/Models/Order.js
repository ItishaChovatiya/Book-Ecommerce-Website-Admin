const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User", // Ensure this matches the name of the user model
            required: true, // Ensure user is provided
        },
        book: {
            type: mongoose.Types.ObjectId,
            ref: "Book", // Ensure this matches the name of the book model
            required: true, // Ensure book is provided
        },
        status: {
            type: String,
            default: "Order placed",
            enum: ["Order placed", "Out for delivery", "Delivered", "Canceled"], // Fix formatting
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Order", orderSchema); // Use singular "Order"
