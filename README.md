# 🧑‍💼 Connect Sphere – Social Community Platform

A minimalist LinkedIn-style web app for user registration, posting content, and viewing user profiles. Built with the MERN stack.

---

## 🛠️ Stack Used

### Frontend

- ⚛️ React.js (Vite)
- 💨 Tailwind CSS
- 📡 Axios for API communication

### Backend

- 🟢 Node.js + Express
- 🗃️ MongoDB + Mongoose
- 🔐 JWT for authentication
- 🖼️ Multer for image uploads

---

## 🚀 Live URLs

> Replace with your actual deployed URLs

- **Frontend (Vercel):** : ( https://connect-sphere-delta.vercel.app/)
- **Backend (Render):** : ( https://connect-sphere-x8so.onrender.com ) 
  -note : if you don't see any posts the render hosted backend might've gone to sleep so just click the backend click for 1-2mins to wake it up.

---

## 🧪 Demo Credentials

| Role             | Email            | Password |
| ---------------- | ---------------- | -------- |
| Demo User        | `demo@email.com` | `123456` |
| Admin (optional) | _N/A_            | _N/A_    |

---

## 🧰 Setup Instructions

### 📁 1. Clone the Repository

git clone https://github.com/yourusername/linkedin-lite.git
cd linkedin-lite

### 🔧 2. Backend Setup

cd server
npm install

.env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key

node server.js

### 🖥️ 3. Frontend Setup

cd ../client
npm install

.env
VITE_API_BASE_URL=https://your-backend.onrender.com/api

npm run dev

### 📦 Folder Structure

connect-sphere/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── api/
│ │ ├── assets/
│ │ ├── context/
│ │ └── ...
│ └── .env
├── server/ # Node backend
│ ├── config/
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── uploads/
│ └── .env

### ✨ Features

🔐 JWT-based secure login/register

👤 Profile page with user info and posts

📝 Create posts with optional image upload

🧾 Public post feed

❌ Delete your own posts

