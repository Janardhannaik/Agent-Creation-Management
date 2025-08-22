//Agent Dashboard.js

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AgentDashboard() {
  const [tasks, setTasks] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get("/api/tasks/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("Failed to fetch tasks", err);
      }
    };
    load();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <header className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Agent Dashboard</h2>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium shadow-md transition"
        >
          Logout
        </button>
      </header>

      <p className="mb-4 text-gray-600">Your assigned tasks:</p>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-left">
              <th className="py-3 px-4 font-medium">First Name</th>
              <th className="py-3 px-4 font-medium">Phone</th>
              <th className="py-3 px-4 font-medium">Notes</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="3" className="py-4 px-4 text-center text-gray-500">
                  No tasks assigned
                </td>
              </tr>
            ) : (
              tasks.map((t) => (
                <tr
                  key={t._id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{t.firstName}</td>
                  <td className="py-3 px-4">{t.phone}</td>
                  <td className="py-3 px-4">{t.notes}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
