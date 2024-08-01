const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token is provided
  if (token == null) {
    return res.status(401).json({ message: "Token not provided" });
  }

  // Verify token
  jwt.verify(token, "bookstore123", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token expired or invalid, please sign in again" });
    }

    // Attach user to request object
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
