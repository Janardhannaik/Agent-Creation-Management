// // backend/controllers/taskController.js
// const Task = require("../models/Task");

// // Admin: get all tasks
// const getAllTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find()
//       .populate("agent", "name email mobile")
//       .sort({ createdAt: -1 });
//     res.json({ tasks });
//   } catch (err) {
//     console.error("getAllTasks err", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Admin: get tasks by agent id
// const getTasksByAgent = async (req, res) => {
//   try {
//     const agentId = req.params.agentId || req.params.id;
//     const tasks = await Task.find({ agent: agentId })
//       .populate("agent", "name email mobile")
//       .sort({ createdAt: -1 });
//     res.json({ tasks });
//   } catch (err) {
//     console.error("getTasksByAgent err", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// // Agent: get own tasks
// const getMyTasks = async (req, res) => {
//   try {
//     if (req.role !== "agent" || !req.agent)
//       return res.status(403).json({ message: "Not authorized" });
//     const tasks = await Task.find({ agent: req.agent._id }).sort({
//       createdAt: -1,
//     });
//     res.json({ tasks });
//   } catch (err) {
//     console.error("getMyTasks err", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// module.exports = { getAllTasks, getTasksByAgent, getMyTasks };

// backend/controllers/taskController.js

// Import Task model
const Task = require("../models/Task");

/**
 * @desc    Admin: Get all tasks (with agent details populated)
 * @route   GET /api/tasks
 * @access  Admin
 */
const getAllTasks = async (req, res) => {
  try {
    // Fetch all tasks, populate agent details, sort by latest created
    const tasks = await Task.find()
      .populate("agent", "name email mobile") // Populate only selected fields
      .sort({ createdAt: -1 }); // Sort by most recent first

    // Send tasks in response
    res.json({ tasks });
  } catch (err) {
    console.error("getAllTasks err", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * @desc    Admin: Get tasks by agent ID
 * @route   GET /api/tasks/agent/:agentId
 * @access  Admin
 */
const getTasksByAgent = async (req, res) => {
  try {
    // Extract agentId from request params (supporting both agentId and id keys)
    const agentId = req.params.agentId || req.params.id;

    // Fetch tasks assigned to this agent, with agent details populated
    const tasks = await Task.find({ agent: agentId })
      .populate("agent", "name email mobile")
      .sort({ createdAt: -1 });

    // Send tasks in response
    res.json({ tasks });
  } catch (err) {
    console.error("getTasksByAgent err", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/**
 * @desc    Agent: Get own tasks (only if logged in as agent)
 * @route   GET /api/tasks/my
 * @access  Agent
 */
const getMyTasks = async (req, res) => {
  try {
    // Check if user is an agent and has agent info available
    if (req.role !== "agent" || !req.agent) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Fetch tasks assigned to the logged-in agent
    const tasks = await Task.find({ agent: req.agent._id }).sort({
      createdAt: -1,
    });

    // Send tasks in response
    res.json({ tasks });
  } catch (err) {
    console.error("getMyTasks err", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Export all controllers
module.exports = { getAllTasks, getTasksByAgent, getMyTasks };
