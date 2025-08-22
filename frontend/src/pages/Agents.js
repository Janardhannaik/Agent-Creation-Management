// src/pages/Agents.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import AgentForm from "../components/AgentForm";
import { Link } from "react-router-dom";

export default function AgentsPage() {
  const [agents, setAgents] = useState([]);
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

  const viewTasks = async (id) => {
    try {
      const res = await axios.get(`/api/agents/${id}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const tasks = res.data.tasks || [];
      alert(`Agent has ${tasks.length} tasks. See console for details.`);
      console.table(tasks);
    } catch (err) {
      alert("Failed to fetch tasks");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Agents</h2>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg shadow-sm font-medium transition"
        >
          Back to Dashboard
        </Link>
      </header>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Side: Create Agent */}
        <div className="flex-1">
          <AgentForm onCreated={fetchAgents} />

          {/* Agents List */}
          <div className="mt-6 bg-white rounded-2xl shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              All Agents
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
                        No agents found
                      </td>
                    </tr>
                  ) : (
                    agents.map((a) => (
                      <tr
                        key={a._id}
                        className="border-t border-gray-200 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{a.name}</td>
                        <td className="py-3 px-4">{a.email}</td>
                        <td className="py-3 px-4">{a.mobile}</td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => viewTasks(a._id)}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium shadow-sm transition"
                          >
                            View tasks
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
