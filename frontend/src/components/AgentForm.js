// src/components/AddAgent.js

import React, { useState } from "react";
import axios from "axios";

export default function AgentForm({ onCreated }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const token = localStorage.getItem("token");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await axios.post(
        "/api/agents",
        { name, email, mobile, password },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMsg("✅ Agent created successfully");
      setName("");
      setEmail("");
      setMobile("");
      setPassword("");
      if (onCreated) onCreated();
    } catch (err) {
      setMsg(err?.response?.data?.message || "❌ Error creating agent");
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

      <h3 className="text-xl font-bold text-gray-900 mb-4">Add Agent</h3>

      {msg && (
        <div
          className={`mb-4 text-sm ${
            msg.includes("successfully") ? "text-green-600" : "text-red-600"
          }`}
        >
          {msg}
        </div>
      )}

      {/* Form */}
      <form onSubmit={submit} className="space-y-4">
        <input
          name="name"
          placeholder="Agent Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="email"
          placeholder="Agent Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="mobile"
          placeholder="+91xxxxxxxxxx"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium shadow-md transition"
        >
          Create Agent
        </button>
      </form>
    </div>
  );
}

// import React, { useState } from "react";
// import axios from "axios";

// export default function AgentForm({ onCreated }) {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [mobile, setMobile] = useState("");
//   const [password, setPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const token = localStorage.getItem("token");

//   const submit = async (e) => {
//     e.preventDefault();
//     setMsg("");
//     try {
//       const res = await axios.post(
//         "/api/agents",
//         { name, email, mobile, password },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setMsg("Agent created successfully");
//       setName("");
//       setEmail("");
//       setMobile("");
//       setPassword("");
//       if (onCreated) onCreated();
//     } catch (err) {
//       setMsg(err?.response?.data?.message || "Error creating agent");
//     }
//   };

//   return (
//     <div
//       style={{
//         border: "1px solid #eee",
//         padding: 12,
//         borderRadius: 6,
//         marginBottom: 12,
//       }}
//     >
//       <h3>Create Agent</h3>
//       {msg && <div style={{ marginBottom: 8 }}>{msg}</div>}
//       <form onSubmit={submit}>
//         <input
//           name="name"
//           placeholder="Agent Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//           style={{ width: "100%", padding: 8, marginBottom: 8 }}
//         />
//         <input
//           name="email"
//           placeholder="Agent Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           type="email"
//           required
//           style={{ width: "100%", padding: 8, marginBottom: 8 }}
//         />
//         <input
//           name="mobile"
//           placeholder="+91xxxxxxxxxx"
//           value={mobile}
//           onChange={(e) => setMobile(e.target.value)}
//           required
//           style={{ width: "100%", padding: 8, marginBottom: 8 }}
//         />
//         <input
//           name="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           style={{ width: "100%", padding: 8, marginBottom: 8 }}
//         />
//         <button type="submit">Create Agent</button>
//       </form>
//     </div>
//   );
// }
