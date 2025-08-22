# 📌 MERN Stack – Agent Management & File Distribution System

A full-stack **MERN** project with **Admin & Agent dashboards** for managing agents, uploading CSV/XLS files, distributing data automatically among agents, and viewing assigned tasks.

---

## 🎯 Goals

* Provide a **secure login system** for Admins and Agents.
* Allow Admin to **create/manage agents**.
* Support **CSV/XLS file upload** and **automatic row distribution**.
* Store distributed data in MongoDB.
* Show **agent-wise task distribution**.
* Provide **separate dashboards** for Admin & Agents.
* Enable logout and secure session handling.

---

## 🛠️ Tech Stack

### Frontend:

* ⚛️ React.js (CRA)
* 🎨 Tailwind CSS (for styling)
* 🔄 Axios (API requests)
* ⚡ React Router DOM

### Backend:

* 🟢 Node.js + Express.js
* 🍃 MongoDB + Mongoose
* 🔑 JWT Authentication
* 📂 Multer (for file upload)
* 📊 csv-parser / xlsx (file reading)

---

## 🚀 Features

✅ **Authentication System** – JWT based login for Admin & Agents.

✅ **Admin Dashboard** – Add agents, upload files, view distributed lists.

✅ **Agent Dashboard** – View only personal assigned tasks.

✅ **File Upload & Distribution** – Rows distributed equally across agents.

✅ **Task Management** – Stored in DB with agent references.

✅ **Logout** – Session/token cleared and redirected to login.

---

## 📂 Project Structure

```
/backend
  ├── config/
  ├── controllers/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── server.js
/frontend
  ├── public/
  ├── src/
  ├── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Janardhannaik/Agent-Creation-Management.git
cd Agent-Creation-Management
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

#### Required Packages

```bash
npm install express mongoose dotenv bcryptjs jsonwebtoken cors multer csv-parser xlsx
npm install --save-dev nodemon
```

#### Add Scripts in `backend/package.json`

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

#### Create `.env` in backend

```env
MONGO_URI=mongodb://127.0.0.1:27017/agentdb
JWT_SECRET=your_jwt_secret
PORT=5000
```

👉 Start backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```

#### Required Packages

```bash
npm install axios react-router-dom
npm install tailwindcss postcss autoprefixer
```

#### Configure Proxy in `frontend/package.json`

```json
"proxy": "http://localhost:5000",
```

#### Create `.env` in frontend

```env
DANGEROUSLY_DISABLE_HOST_CHECK=true
```

👉 Start frontend:

```bash
npm start
```

---

## 🧪 First Admin Setup

Since no admin exists by default, create one manually:

```bash
curl -X POST http://localhost:5000/api/auth/register \
-H "Content-Type: application/json" \
-d '{"name":"Admin","email":"admin@example.com","password":"123456"}'
```

Now you can log in with:

* **Email:** `admin@example.com`
* **Password:** `123456`

---

## 🔄 User Workflow

![Workflow Diagram](https://github.com/user-attachments/assets/600bc44d-ba8d-49bf-a3e8-707e468b3adc)



Link:- https://app.eraser.io/workspace/V0XGiQSpqtGxOOfaFUHC?origin=share


**Steps:**

1. User opens app → lands on Login Page.
2. Login with **Admin** or **Agent** credentials.
3. **Admin** → can Add Agents, Upload Files, View Distributed Lists.
4. **Agent** → sees only their own tasks.
5. Logout → session cleared.

---

## 📸 Sample UI Screens

### 🔐 Login Page

![Login Page](https://github.com/user-attachments/assets/1c954f43-0904-44e6-ae08-308faa2f8eb4)


### 🛠️ Admin Dashboard

![Dashboard page](https://github.com/user-attachments/assets/1a77656b-c8a9-434a-bca7-685c62db8908)


### 👤 Agent Dashboard

![Agent Login](https://github.com/user-attachments/assets/de9f28d4-0ce4-4f40-8ce5-a66ab41ca404)





### 📋 Task List

![Dashboard2 page](https://github.com/user-attachments/assets/fbcae9ea-7f4f-4880-9037-cf9adca3abed)


---

## 📌 API Endpoints

### Auth

* `POST /api/auth/register` → Register new user (Admin/Agent).
* `POST /api/auth/login` → Login user.

### Agents (Admin only)

* `POST /api/agents` → Add Agent.
* `GET /api/agents` → Get all agents.

### Upload

* `POST /api/upload` → Upload CSV/XLS file and distribute tasks.

### Tasks

* `GET /api/tasks` → Get all tasks (Admin only).
* `GET /api/tasks/agent/:id` → Get tasks for one agent (Admin only).
* `GET /api/tasks/my` → Get tasks for logged-in agent.

---

## ✅ Future Enhancements

* 📊 Analytics Dashboard (Task completion tracking).
* 📱 Mobile App (React Native).
* 📧 Email Notifications for new task assignment.
* 📈 Advanced file parsing (Google Sheets integration).

---

## 🏁 Conclusion

This project provides a **real-world MERN stack application** with **secure authentication, file distribution, and task assignment features**. It can be extended into a **CRM system, sales lead manager, or call center tool**.

---

📌 **Author:** Your Name
📧 Email: [naikjanardhan568@gmail.com](naikjanardhan568@gmail.com)




