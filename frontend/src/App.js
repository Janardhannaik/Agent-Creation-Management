// src/App.js
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./pages/Dashboard";
import AgentDashboard from "./pages/AgentDashboard";

function PrivateRoute({ children, roleRequired }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (!token) return <Navigate to="/login" replace />;
  if (roleRequired && role !== roleRequired)
    return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute roleRequired="admin">
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/agent-dashboard"
        element={
          <PrivateRoute roleRequired="agent">
            <AgentDashboard />
          </PrivateRoute>
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
