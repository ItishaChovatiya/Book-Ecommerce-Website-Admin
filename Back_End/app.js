const express = require("express");
const connectDB = require("./Connection/Connection");
const cors = require("cors");
const userRoutes = require("./Routes/index");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/v1", userRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Connect to Database
connectDB();

// Start Server
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if PORT is not defined
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
