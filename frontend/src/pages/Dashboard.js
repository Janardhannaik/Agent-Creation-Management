// src/pages/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "../components/UploadForm";
import AgentForm from "../components/AgentForm";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [agents, setAgents] = useState([]);
  const [tasksForAgent, setTasksForAgent] = useState([]);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const token = localStorage.getItem("token");

  const fetchAgents = async () => {
    try {
      const res = await axios.get("/api/agents", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAgents(res.data.agents || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const viewAgentTasks = async (agentId) => {
    try {
      setSelectedAgent(agentId);
      const res = await axios.get(`/api/tasks/agent/${agentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasksForAgent(res.data.tasks || []);
    } catch (err) {
      console.error(err);
      setTasksForAgent([]);
    }
  };

  const viewAllTasks = async () => {
    try {
      const res = await axios.get("/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasksForAgent(res.data.tasks || []);
      setSelectedAgent("ALL");
    } catch (err) {
      console.error(err);
      setTasksForAgent([]);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        <div className="flex items-center gap-3">
          <Link
            to="/agents"
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow-sm font-medium transition"
          >
            Agents
          </Link>
          <button
            onClick={logout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-6">
        {/* Main Content */}
        <div>
          {/* Upload Section */}
          <UploadForm onDone={fetchAgents} />

          {/* Agents List */}
          <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Agents & Distribution Summary
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="py-3 px-4 font-medium">Name</th>
                    <th className="py-3 px-4 font-medium">Email</th>
                    <th className="py-3 px-4 font-medium">Mobile</th>
                    <th className="py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {agents.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-4 px-4 text-center text-gray-500"
                      >
                        No agents yet
                      </td>
                    </tr>
                  ) : (
                    agents.map((a) => (
                      <tr
                        key={a._id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <button
                            onClick={() => viewAgentTasks(a._id)}
                            className="text-blue-600 hover:underline"
                          >
                            {a.name}
                          </button>
                        </td>
                        <td className="py-3 px-4">{a.email}</td>
                        <td className="py-3 px-4">{a.mobile}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => viewAgentTasks(a._id)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm transition"
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="mt-4">
              <button
                onClick={viewAllTasks}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-sm font-medium transition"
              >
                View Full Distribution (All Tasks)
              </button>
            </div>
          </div>

          {/* Tasks List */}
          <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {selectedAgent === "ALL"
                ? "All Tasks"
                : selectedAgent
                ? "Tasks for Selected Agent"
                : "Tasks"}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-700 text-left">
                    <th className="py-3 px-4 font-medium">First Name</th>
                    <th className="py-3 px-4 font-medium">Phone</th>
                    <th className="py-3 px-4 font-medium">Notes</th>
                    <th className="py-3 px-4 font-medium">Agent</th>
                  </tr>
                </thead>
                <tbody>
                  {tasksForAgent.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="py-4 px-4 text-center text-gray-500"
                      >
                        No tasks to show
                      </td>
                    </tr>
                  ) : (
                    tasksForAgent.map((t) => (
                      <tr
                        key={t._id || `${t.agent}-${t.firstName}`}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{t.firstName}</td>
                        <td className="py-3 px-4">{t.phone}</td>
                        <td className="py-3 px-4">{t.notes}</td>
                        <td className="py-3 px-4">
                          {t.agent?.name || t.agentName || ""}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <AgentForm onCreated={fetchAgents} />

          <div className="bg-white rounded-2xl shadow-md p-4">
            <h4 className="font-semibold text-gray-800 mb-2">Quick Tips</h4>
            <ul className="list-disc pl-5 text-gray-600 text-sm space-y-1">
              <li>
                Create at least 1 agent (server uses up to first 5 agents for
                distribution).
              </li>
              <li>Upload files with headings: FirstName, Phone, Notes.</li>
              <li>
                After upload, tasks are saved and can be viewed per agent.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
