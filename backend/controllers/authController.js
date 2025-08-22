// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const Agent = require("../models/Agent");

// /**
//  * Register Admin (one-time). In production restrict this!
//  */
// const registerUser = async (req, res) => {
//   try {
//     const { name = "Admin", email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password required" });

//     const exists = await User.findOne({ email });
//     if (exists)
//       return res.status(400).json({ message: "Admin already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);
//     const user = await User.create({ name, email, password: hash });

//     res
//       .status(201)
//       .json({
//         message: "Admin created",
//         user: { id: user._id, email: user.email },
//       });
//   } catch (err) {
//     console.error("registerUser err", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /**
//  * Login - check both Admins and Agents
//  */
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "Email and password required" });

//     // Try Admin
//     let admin = await User.findOne({ email });
//     if (admin) {
//       const ok = await bcrypt.compare(password, admin.password);
//       if (!ok) return res.status(400).json({ message: "Invalid credentials" });
//       const token = jwt.sign(
//         { id: admin._id, role: "admin" },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
//       );
//       return res.json({
//         token,
//         role: "admin",
//         user: { id: admin._id, email: admin.email, name: admin.name },
//       });
//     }

//     // Try Agent
//     let agent = await Agent.findOne({ email });
//     if (agent) {
//       const ok = await bcrypt.compare(password, agent.password);
//       if (!ok) return res.status(400).json({ message: "Invalid credentials" });
//       const token = jwt.sign(
//         { id: agent._id, role: "agent" },
//         process.env.JWT_SECRET,
//         { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
//       );
//       return res.json({
//         token,
//         role: "agent",
//         agent: {
//           id: agent._id,
//           email: agent.email,
//           name: agent.name,
//           mobile: agent.mobile,
//         },
//       });
//     }

//     return res.status(400).json({ message: "Invalid credentials" });
//   } catch (err) {
//     console.error("loginUser err", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// module.exports = { registerUser, loginUser };

// Import required packages and models
const bcrypt = require("bcryptjs"); // For password hashing
const jwt = require("jsonwebtoken"); // For creating JWT tokens
const User = require("../models/User"); // Admin User model
const Agent = require("../models/Agent"); // Agent model

/**
 * ==============================
 * Register Admin (one-time setup)
 * ==============================
 * This function allows creating an admin user.
 * ⚠️ NOTE: In production, restrict this route to prevent multiple admin registrations.
 */
const registerUser = async (req, res) => {
  try {
    // Extract values from request body with default name = "Admin"
    const { name = "Admin", email, password } = req.body;

    // Basic validation: email and password required
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // Check if admin already exists in DB
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create a new admin user
    const user = await User.create({ name, email, password: hash });

    // Send success response
    res.status(201).json({
      message: "Admin created",
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    // Handle server error
    console.error("registerUser err", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * ==============================
 * Login (for both Admin & Agent)
 * ==============================
 * This function handles login for admins and agents.
 * - First tries to authenticate as Admin.
 * - If not found, tries as Agent.
 * - On success, returns JWT token with role (admin/agent).
 */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation: email and password required
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    /**
     * ---- Try logging in as Admin ----
     */
    let admin = await User.findOne({ email });
    if (admin) {
      // Compare entered password with hashed password
      const ok = await bcrypt.compare(password, admin.password);
      if (!ok) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token for Admin
      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" } // Default: 1 day
      );

      // Return response with token and admin details
      return res.json({
        token,
        role: "admin",
        user: { id: admin._id, email: admin.email, name: admin.name },
      });
    }

    /**
     * ---- Try logging in as Agent ----
     */
    let agent = await Agent.findOne({ email });
    if (agent) {
      // Compare entered password with hashed password
      const ok = await bcrypt.compare(password, agent.password);
      if (!ok) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token for Agent
      const token = jwt.sign(
        { id: agent._id, role: "agent" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
      );

      // Return response with token and agent details
      return res.json({
        token,
        role: "agent",
        agent: {
          id: agent._id,
          email: agent.email,
          name: agent.name,
          mobile: agent.mobile,
        },
      });
    }

    // If neither Admin nor Agent found → invalid credentials
    return res.status(400).json({ message: "Invalid credentials" });
  } catch (err) {
    // Handle server error
    console.error("loginUser err", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Export the functions so they can be used in routes
module.exports = { registerUser, loginUser };
