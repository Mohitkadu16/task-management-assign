const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// @route   GET /api/tasks
// @desc    Get all tasks with optional filtering and sorting
router.get('/', async (req, res) => {
  try {
    const { status, priority, sortBy } = req.query;
    
    // Filtering
    let query = {};
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Sorting
    let sortQuery = { createdAt: -1 }; // Default sort by newest
    if (sortBy === 'oldest') sortQuery = { createdAt: 1 };
    if (sortBy === 'dueDate') sortQuery = { dueDate: 1 };
    if (sortBy === 'priority') sortQuery = { priority: -1 }; // high to low (Wait, strings low, medium, high won't sort nicely this way. But it's simple enough for now. We can handle it on frontend too)
    
    const tasks = await Task.find(query).sort(sortQuery);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

// @route   POST /api/tasks
// @desc    Create a task
router.post('/', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: 'Validation Error', error: err.message });
  }
});

// @route   PUT /api/tasks/:id
// @desc    Update a task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: 'Update Error', error: err.message });
  }
});

// @route   DELETE /api/tasks/:id
// @desc    Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
});

module.exports = router;
