const express = require("express");
const User = require("../Models/User");
const Book = require("../Models/Book");
const Order = require("../Models/Order");
const { authenticateToken } = require("./userAuth");

const orderRouter = express.Router(); // Renamed for consistency

// Place order
orderRouter.post("/placeOrder", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            // Create and save new order
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDB = await newOrder.save();

            // Update user's cart and remove ordered items from cart
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDB._id },
                $pull: { cart: orderData._id }
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Order placed successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get orders for a particular user
orderRouter.get("/getOrder", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });

        const ordersData = userData.orders.reverse();
        return res.status(200).json({
            status: "success",
            data: ordersData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all orders for admin
orderRouter.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({ path: "book" })
            .populate({ path: "user" })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            status: "success",
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update order status (admin)
orderRouter.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        await Order.findByIdAndUpdate(id, { status });

        return res.status(200).json({
            status: "success",
            message: "Status updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = orderRouter;
