// backend/routes/taskRoutes.js
const express = require("express");
const {
  getAllTasks,
  getTasksByAgent,
  getMyTasks,
} = require("../controllers/taskController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", protect, adminOnly, getAllTasks);
router.get("/agent/:agentId", protect, adminOnly, getTasksByAgent);
router.get("/my", protect, getMyTasks);

module.exports = router;
