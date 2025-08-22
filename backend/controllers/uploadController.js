// backend/controllers/uploadController.js
const parseFileBuffer = require("../utils/fileParser");
const Agent = require("../models/Agent");
const Task = require("../models/Task");

/**
 * Upload and distribute file fairly among agents
 */
const uploadAndDistribute = async (req, res) => {
  try {
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const originalname = req.file.originalname || "uploaded_file";
    const rows = await parseFileBuffer(req.file.buffer, originalname);

    if (!rows || rows.length === 0) {
      return res.status(400).json({ message: "No valid rows found in file" });
    }

    // get up to 5 agents
    const agents = await Agent.find().sort({ createdAt: 1 }).limit(5);
    if (!agents || agents.length === 0) {
      return res
        .status(400)
        .json({ message: "No agents found. Create agents first." });
    }

    const nAgents = agents.length;
    const total = rows.length;
    const base = Math.floor(total / nAgents);
    const remainder = total % nAgents;

    const distribution = [];
    let index = 0;

    for (let i = 0; i < nAgents; i++) {
      // give each agent base rows
      let count = base;

      // distribute remainder across first few agents
      if (i < remainder) {
        count += 1;
      }

      const agentRows = rows.slice(index, index + count);
      index += count;
      distribution.push({ agent: agents[i], rows: agentRows });
    }

    // Create Task documents
    const docs = [];
    for (const group of distribution) {
      for (const r of group.rows) {
        docs.push({
          agent: group.agent._id,
          firstName: r.firstName || "",
          phone: r.phone || "",
          notes: r.notes || "",
          uploadedBy: req.admin ? req.admin._id : null,
          fileName: originalname,
        });
      }
    }

    if (docs.length > 0) {
      await Task.insertMany(docs);
    }

    const summary = distribution.map((d) => ({
      agentId: d.agent._id,
      agentName: d.agent.name,
      assigned: d.rows.length,
    }));

    return res.json({
      message: "File uploaded & distributed successfully",
      total,
      summary,
    });
  } catch (err) {
    console.error("uploadAndDistribute err", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { uploadAndDistribute };
