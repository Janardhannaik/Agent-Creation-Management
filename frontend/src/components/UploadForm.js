// src/components/UploadCSV.js

import React, { useState } from "react";
import axios from "axios";

export default function UploadForm({ onDone }) {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    if (!file) return setMsg("Please choose a file");
    const fd = new FormData();
    fd.append("file", file);

    setLoading(true);
    try {
      const res = await axios.post("/api/upload", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setMsg(res.data.message || "Uploaded");
      if (onDone) onDone();
    } catch (err) {
      setMsg(err?.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500 text-white font-bold">
          ☁
        </div>
        <h1 className="ml-3 text-lg font-semibold text-gray-800">MERN Stack</h1>
      </div>

      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Upload CSV / XLS / XLSX
      </h3>

      <form onSubmit={submit} className="space-y-4">
        {/* File Input */}
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition">
          <div className="flex flex-col items-center justify-center pt-4 pb-4 text-gray-500">
            <svg
              className="w-8 h-8 mb-2 text-blue-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6h.1a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
            <p className="text-sm">
              Drag & drop a file{" "}
              <span className="font-medium">or click to upload</span>
            </p>
          </div>
          <input
            type="file"
            accept=".csv,.xls,.xlsx"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </label>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Uploading..." : "Upload & Distribute"}
        </button>
      </form>

      {/* Messages */}
      {msg && (
        <div
          className={`mt-4 text-sm ${
            msg.toLowerCase().includes("fail")
              ? "text-red-600"
              : "text-green-600"
          }`}
        >
          {msg}
        </div>
      )}

      <div className="mt-3 text-sm text-gray-500">
        File must contain columns:{" "}
        <span className="font-medium">FirstName, Phone, Notes</span>.
      </div>
    </div>
  );
}
