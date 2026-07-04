# Task Management Application

A full-stack Task Management application built with the **MERN** stack (MongoDB, Express, React, Node.js) and styled with modern **Tailwind CSS v4** (Glassmorphism design).

## ✨ Features
- **Create, Read, Update, Delete (CRUD):** Full task lifecycle management.
- **Filtering & Sorting:** Filter tasks by Status or Priority, and sort them by Date or Priority.
- **Modern UI/UX:** Responsive, dark-themed, glassmorphic UI that feels premium and sleek.
- **Real-time Form Validation:** Helps prevent user errors when creating tasks.
- **RESTful API Backend:** Secure and robust backend built with Express.js and Mongoose.

## 🛠️ Tech Stack
**Frontend:**
- React 18 (Vite)
- TypeScript
- Tailwind CSS v4
- Axios (for API requests)
- React Icons & React Toastify

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose 8
- CORS & Dotenv

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or a local MongoDB instance).

### 1. Clone the repository
*(If applicable, add your git clone command here)*

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your MongoDB URI:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_atlas_connection_string
   ```
   *(Note: Ensure your current IP address is whitelisted in your MongoDB Atlas Network Access settings!)*
4. Start the backend server:
   ```bash
   node server.js
   ```
   *(The server will run on `http://localhost:5000`)*

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.

---

## 🔗 API Endpoints

| Method | Endpoint             | Description                |
|--------|----------------------|----------------------------|
| GET    | `/api/tasks`         | Fetch all tasks            |
| POST   | `/api/tasks`         | Create a new task          |
| PUT    | `/api/tasks/:id`     | Update an existing task    |
| DELETE | `/api/tasks/:id`     | Delete a task              |

---

## 🤝 Troubleshooting
- **Database Connection Issues (Timeout):** If the backend connects to MongoDB successfully but times out when saving a task, ensure your current IP address is active in your **MongoDB Atlas Network Access** list. If you recently added it, restart your backend terminal process.
- **Tailwind Styles Missing:** This project uses Tailwind CSS v4 which uses `@import "tailwindcss";` inside `index.css`. Ensure you are running the Vite server to compile it.
