// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Agent = require("../models/Agent");

const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith("Bearer "))
      return res.status(401).json({ message: "Not authorized, no token" });
    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id)
      return res.status(401).json({ message: "Invalid token" });

    // set role and user/agent
    req.role = decoded.role;
    if (decoded.role === "admin") {
      const admin = await User.findById(decoded.id).select("-password");
      if (!admin) return res.status(401).json({ message: "Admin not found" });
      req.admin = admin;
    } else if (decoded.role === "agent") {
      const agent = await Agent.findById(decoded.id).select("-password");
      if (!agent) return res.status(401).json({ message: "Agent not found" });
      req.agent = agent;
    } else {
      return res.status(401).json({ message: "Invalid role" });
    }
    next();
  } catch (err) {
    console.error("protect error", err);
    return res.status(401).json({ message: "Not authorized" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.role === "admin" && req.admin) return next();
  return res.status(403).json({ message: "Access denied, admin only" });
};

module.exports = { protect, adminOnly };
