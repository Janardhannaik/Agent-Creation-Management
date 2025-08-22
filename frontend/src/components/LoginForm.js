// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { token, role } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      if (role === "admin") navigate("/dashboard");
      else navigate("/agent-dashboard");
    } catch (error) {
      setErr(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-blue-200">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
            ☁
          </div>
          <h1 className="ml-3 text-lg font-semibold text-gray-800">
            MERN Stack
          </h1>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>

        {err && <div className="mb-4 text-sm text-red-600">{err}</div>}

        {/* Form */}
        <form onSubmit={submit} className="space-y-4">
          <div>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md transition"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-500 cursor-pointer hover:underline">
          Forgot password?
        </p>
      </div>
    </div>
  );
}
