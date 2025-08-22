// backend/models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
    firstName: { type: String, required: true },
    phone: { type: String, required: true },
    notes: { type: String },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // admin who uploaded
    fileName: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
