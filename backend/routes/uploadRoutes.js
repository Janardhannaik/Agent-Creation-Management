// backend/routes/uploadRoutes.js
const express = require("express");
const multer = require("multer");
const { uploadAndDistribute } = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post(
  "/",
  protect,
  adminOnly,
  upload.single("file"),
  uploadAndDistribute
);

module.exports = router;
