// backend/routes/agentRoutes.js
const express = require("express");
const {
  createAgent,
  getAgents,
  getAgentTasks,
} = require("../controllers/agentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, adminOnly, createAgent);
router.get("/", protect, adminOnly, getAgents);
router.get("/:id/tasks", protect, adminOnly, getAgentTasks);

module.exports = router;
