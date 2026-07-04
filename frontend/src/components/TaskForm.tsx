import React, { useState, useEffect } from 'react';
import type { Task } from '../types';
import { FiX } from 'react-icons/fi';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: Partial<Task>) => void;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Task['priority']>('medium');
  const [status, setStatus] = useState<Task['status']>('pending');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setStatus(task.status);
      if (task.dueDate) {
        setDueDate(task.dueDate.split('T')[0]); // Format for input type="date"
      }
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    setError('');
    onSubmit({
      title,
      description,
      priority,
      status,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-fade-in">
      <div className="glass-card w-full max-w-md p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-textMuted hover:text-white transition-colors p-1"
        >
          <FiX size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-6 text-white">
          {task ? 'Edit Task' : 'Create New Task'}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-danger/20 border border-danger/30 text-danger text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Title *</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="glass-input w-full p-2.5"
              placeholder="What needs to be done?"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="glass-input w-full p-2.5 h-24 resize-none"
              placeholder="Add some details..."
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Priority</label>
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                className="glass-input w-full p-2.5"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-textMuted mb-1">Status</label>
              <select 
                value={status}
                onChange={(e) => setStatus(e.target.value as Task['status'])}
                className="glass-input w-full p-2.5"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-textMuted mb-1">Due Date</label>
            <input 
              type="date" 
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="glass-input w-full p-2.5 text-white [color-scheme:dark]"
            />
          </div>

          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="btn-outline flex-1">
              Cancel
            </button>
            <button type="submit" className="btn-primary flex-1">
              {task ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
