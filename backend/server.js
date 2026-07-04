require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const tasksRouter = require('./routes/tasks');

const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests from frontend
app.use(express.json()); // Parse incoming JSON payloads

// Database Connection
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/task-tracker';
console.log('Connecting to MONGO_URI:', MONGO_URI);

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected successfully');
    
    // Start server only after DB connects
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
}
startServer();

// Routes
app.use('/api/tasks', tasksRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Task Tracker API is running!');
});


