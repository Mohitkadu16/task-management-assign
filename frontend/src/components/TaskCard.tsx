import React from 'react';
import type { Task } from '../types';
import { FiClock, FiEdit2, FiTrash2, FiAlertCircle } from 'react-icons/fi';
import { format } from 'date-fns';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statusColors = {
    'pending': 'bg-warning/20 text-warning border-warning/30',
    'in-progress': 'bg-secondary/20 text-secondary border-secondary/30',
    'completed': 'bg-success/20 text-success border-success/30'
  };

  const priorityIcons = {
    'low': <FiAlertCircle className="text-success" />,
    'medium': <FiAlertCircle className="text-warning" />,
    'high': <FiAlertCircle className="text-danger" />
  };

  return (
    <div className="glass-card p-5 group flex flex-col h-full animate-fade-in relative overflow-hidden">
      {/* Priority Indicator Strip */}
      <div className={clsx(
        "absolute top-0 left-0 w-1 h-full",
        task.priority === 'high' ? 'bg-danger' : 
        task.priority === 'medium' ? 'bg-warning' : 'bg-success'
      )} />

      <div className="flex justify-between items-start mb-3">
        <h3 className={clsx("text-lg font-semibold pr-4", task.status === 'completed' && "line-through text-textMuted")}>
          {task.title}
        </h3>
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onEdit(task)} className="p-1.5 rounded-md hover:bg-white/10 text-textMuted hover:text-white transition-colors">
            <FiEdit2 size={16} />
          </button>
          <button onClick={() => onDelete(task._id)} className="p-1.5 rounded-md hover:bg-danger/20 text-textMuted hover:text-danger transition-colors">
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="text-sm text-textMuted mb-4 line-clamp-3 flex-grow">
          {task.description}
        </p>
      )}

      <div className="mt-auto pt-4 border-t border-white/5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-textMuted">
            {priorityIcons[task.priority]}
            <span className="capitalize">{task.priority}</span>
          </div>
          {task.dueDate && (
            <div className="flex items-center gap-1 text-textMuted">
              <FiClock size={12} />
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <select 
            value={task.status}
            onChange={(e) => onStatusChange(task._id, e.target.value as Task['status'])}
            className={clsx(
              "text-xs font-medium py-1 px-2.5 rounded-full border outline-none appearance-none cursor-pointer transition-colors",
              statusColors[task.status]
            )}
          >
            <option value="pending" className="bg-background text-textMain">Pending</option>
            <option value="in-progress" className="bg-background text-textMain">In Progress</option>
            <option value="completed" className="bg-background text-textMain">Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
