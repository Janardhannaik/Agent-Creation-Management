// const bcrypt = require("bcryptjs");
// const Agent = require("../models/Agent");
// const Task = require("../models/Task");

// /**
//  * Create Agent (admin only)
//  */
// const createAgent = async (req, res) => {
//   try {
//     const { name, email, mobile, password } = req.body;
//     if (!name || !email || !mobile || !password)
//       return res.status(400).json({ message: "All fields are required" });

//     const exists = await Agent.findOne({ email });
//     if (exists)
//       return res
//         .status(400)
//         .json({ message: "Agent with this email already exists" });

//     const salt = await bcrypt.genSalt(10);
//     const hash = await bcrypt.hash(password, salt);

//     const agent = await Agent.create({ name, email, mobile, password: hash });
//     res
//       .status(201)
//       .json({
//         message: "Agent created",
//         agent: {
//           id: agent._id,
//           name: agent.name,
//           email: agent.email,
//           mobile: agent.mobile,
//         },
//       });
//   } catch (err) {
//     console.error("createAgent err", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// const getAgents = async (req, res) => {
//   try {
//     const agents = await Agent.find()
//       .select("-password")
//       .sort({ createdAt: 1 });
//     res.json({ agents });
//   } catch (err) {
//     console.error("getAgents err", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// const getAgentTasks = async (req, res) => {
//   try {
//     const agentId = req.params.id || req.params.agentId;
//     if (!agentId) return res.status(400).json({ message: "Agent id required" });
//     const tasks = await Task.find({ agent: agentId })
//       .select("-__v")
//       .sort({ createdAt: -1 });
//     res.json({ tasks });
//   } catch (err) {
//     console.error("getAgentTasks err", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// module.exports = { createAgent, getAgents, getAgentTasks };

const bcrypt = require("bcryptjs");
const Agent = require("../models/Agent");
const Task = require("../models/Task");

/**
 * Create a new agent (Admin only)
 * - Validates input fields
 * - Checks if email already exists
 * - Hashes password before saving
 * - Returns created agent (without password)
 */
const createAgent = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    // Validate required fields
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if an agent already exists with the same email
    const exists = await Agent.findOne({ email });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Agent with this email already exists" });
    }

    // Generate salt and hash the password for security
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create new agent record in the database
    const agent = await Agent.create({
      name,
      email,
      mobile,
      password: hash,
    });

    // Respond with created agent (excluding password)
    res.status(201).json({
      message: "Agent created",
      agent: {
        id: agent._id,
        name: agent.name,
        email: agent.email,
        mobile: agent.mobile,
      },
    });
  } catch (err) {
    console.error("createAgent err:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Get all agents (Admin only)
 * - Excludes password field
 * - Returns agents sorted by creation date (ascending)
 */
const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find()
      .select("-password") // Exclude password field from response
      .sort({ createdAt: 1 }); // Sort agents by oldest first

    res.json({ agents });
  } catch (err) {
    console.error("getAgents err:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * Get tasks assigned to a specific agent
 * - Agent ID is taken from route params (:id or :agentId)
 * - Returns tasks sorted by newest first
 */
const getAgentTasks = async (req, res) => {
  try {
    const agentId = req.params.id || req.params.agentId;

    // Validate agent ID
    if (!agentId) {
      return res.status(400).json({ message: "Agent id required" });
    }

    // Find tasks assigned to the agent
    const tasks = await Task.find({ agent: agentId })
      .select("-__v") // Exclude __v field (mongoose version key)
      .sort({ createdAt: -1 }); // Sort tasks by newest first

    res.json({ tasks });
  } catch (err) {
    console.error("getAgentTasks err:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Export functions for use in routes
module.exports = { createAgent, getAgents, getAgentTasks };
