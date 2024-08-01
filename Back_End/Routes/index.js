const express = require("express");

// Import route handlers
const userRouter = require("./user_routes");
const bookRouter = require("./book_routes");
const favRouter = require("./favourites");
const cartRouter = require("./cart_route");
const orderRouter = require("./order_routes");

// Create an Express router instance
const router = express.Router(); // Use express.Router() for creating a router

// Define route prefixes
router.use("/user", userRouter); // Prefix for user-related routes
router.use("/book", bookRouter); // Prefix for book-related routes
router.use("/fav", favRouter);   // Prefix for favorites-related routes
router.use("/cart", cartRouter); // Prefix for cart-related routes
router.use("/order", orderRouter); // Prefix for order-related routes

// Export the router
module.exports = router;
