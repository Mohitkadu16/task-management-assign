# Task Management App - Interview Preparation Guide

Since you mentioned you are new to **MongoDB, Express.js, and REST APIs**, I have prepared this guide to help you explain your project confidently to the interviewer! 

## 1. What is a REST API?
A **REST API** (Representational State Transfer Application Programming Interface) is essentially a messenger that takes requests from your Frontend (React), tells the Backend (Express) what to do, and then returns the response back to the Frontend.

In your project, the REST API handles **CRUD** operations:
* **C**reate: `POST /api/tasks` (Creates a new task)
* **R**ead: `GET /api/tasks` (Fetches all tasks, handles sorting/filtering)
* **U**pdate: `PUT /api/tasks/:id` (Updates an existing task)
* **D**elete: `DELETE /api/tasks/:id` (Deletes a task)

*If the interviewer asks:* "How does your frontend talk to the database?"
*You answer:* "My React frontend uses Axios to make HTTP requests to my REST API endpoints. The Express backend receives these requests and uses Mongoose to talk to the MongoDB database."

---

## 2. Express.js (The Backend Framework)
**Express.js** is a fast, unopinionated web framework for Node.js. It makes building APIs very easy.

**Key Components in your project:**
* **`server.js`**: This is the entry point of your backend. It sets up the server, connects to the database, and registers your API routes.
* **Middleware**: Functions that run *before* the request hits your route. 
  * `app.use(cors())`: Allows your React frontend (running on a different port) to securely communicate with the backend.
  * `app.use(express.json())`: Automatically converts incoming request data into a usable JavaScript object (`req.body`).
* **Routes (`routes/tasks.js`)**: These files define what happens when a specific URL is hit (e.g., fetching tasks from the database).

---

## 3. MongoDB & Mongoose (The Database)
**MongoDB** is a NoSQL database that stores data in flexible, JSON-like documents. 
**Mongoose** is a library that sits on top of MongoDB and makes it easier to work with by allowing us to define **Schemas**.

**Key Components in your project:**
* **`models/Task.js`**: This defines the exact structure of a Task. It enforces rules (e.g., `title` is required, `status` must be 'pending', 'in-progress', or 'completed').
* **Mongoose Methods**:
  * `Task.find()`: Fetches all tasks.
  * `new Task(req.body).save()`: Saves a new task.
  * `Task.findByIdAndUpdate()`: Updates a task.

*If the interviewer asks:* "Why did you use MongoDB?"
*You answer:* "MongoDB's document-based structure pairs perfectly with JavaScript and React. The JSON objects returned by the API map directly to the state in my React frontend without needing complex transformations."

---

## 4. The Frontend (React & Tailwind)
* **React**: We used functional components and Hooks (`useState`, `useEffect`) to manage the state of the tasks.
* **Tailwind CSS**: We used Tailwind v4 to create a modern, responsive UI using "Glassmorphism" (translucent, blurred backgrounds that look premium).

### 💡 Interview Tip:
If the interviewer asks about the challenges you faced, you can mention:
> *"One challenge was configuring MongoDB Atlas Network Access. I had to ensure my local IP address was whitelisted so that the Express backend could successfully establish a connection and write data without timing out."* 
(This sounds very professional and shows you understand cloud database security!)
