import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import FilterBar from './components/FilterBar';
import TaskCard from './components/TaskCard';
import TaskForm from './components/TaskForm';
import type { Task } from './types';
import api from './api';
import { FiPlus } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filtering and Sorting state
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Modal State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append('status', statusFilter);
      if (priorityFilter) params.append('priority', priorityFilter);
      if (sortBy) params.append('sortBy', sortBy);

      const response = await api.get(`/tasks?${params.toString()}`);
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [statusFilter, priorityFilter, sortBy]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleCreateOrUpdate = async (taskData: Partial<Task>) => {
    try {
      if (taskToEdit) {
        await api.put(`/tasks/${taskToEdit._id}`, taskData);
        toast.success("Task updated successfully!");
      } else {
        await api.post('/tasks', taskData);
        toast.success("Task created successfully!");
      }
      setIsFormOpen(false);
      setTaskToEdit(null);
      fetchTasks();
    } catch (error) {
      toast.error(taskToEdit ? "Failed to update task!" : "Failed to create task!");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${id}`);
        toast.success("Task deleted!");
        fetchTasks();
      } catch (error) {
        toast.error("Failed to delete task!");
        console.error(error);
      }
    }
  };

  const handleStatusChange = async (id: string, newStatus: Task['status']) => {
    try {
      // Optimistic update
      setTasks(tasks.map(t => t._id === id ? { ...t, status: newStatus } : t));
      await api.put(`/tasks/${id}`, { status: newStatus });
      toast.success("Status updated!");
    } catch (error) {
      toast.error("Failed to update status!");
      fetchTasks(); // Revert on failure
    }
  };

  const openEditModal = (task: Task) => {
    setTaskToEdit(task);
    setIsFormOpen(true);
  };

  const openCreateModal = () => {
    setTaskToEdit(null);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Tasks</h2>
          <button onClick={openCreateModal} className="btn-primary flex items-center gap-2">
            <FiPlus size={20} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>

        <FilterBar 
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}
          sortBy={sortBy} setSortBy={setSortBy}
        />

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : tasks.length === 0 ? (
          <div className="glass p-12 rounded-2xl text-center mt-10">
            <h3 className="text-xl font-medium text-textMain mb-2">No tasks found</h3>
            <p className="text-textMuted mb-6">You don't have any tasks matching the current filters.</p>
            <button onClick={openCreateModal} className="btn-primary">Create a Task</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map(task => (
              <TaskCard 
                key={task._id} 
                task={task} 
                onEdit={openEditModal}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </main>

      {isFormOpen && (
        <TaskForm 
          task={taskToEdit} 
          onSubmit={handleCreateOrUpdate} 
          onClose={() => setIsFormOpen(false)} 
        />
      )}

      <ToastContainer position="bottom-right" theme="dark" toastClassName="glass" />
    </div>
  );
}

export default App;
