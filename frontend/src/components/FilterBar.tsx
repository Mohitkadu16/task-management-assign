import React from 'react';
import { FiFilter, FiList } from 'react-icons/fi';

interface FilterBarProps {
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  priorityFilter: string;
  setPriorityFilter: (v: string) => void;
  sortBy: string;
  setSortBy: (v: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ 
  statusFilter, setStatusFilter, 
  priorityFilter, setPriorityFilter, 
  sortBy, setSortBy 
}) => {
  return (
    <div className="glass-card p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2 text-textMuted">
          <FiFilter />
          <span className="text-sm font-medium hidden sm:inline">Filter</span>
        </div>
        
        <select 
          value={statusFilter} 
          onChange={(e) => setStatusFilter(e.target.value)}
          className="glass-input text-sm p-2 bg-transparent"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select 
          value={priorityFilter} 
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="glass-input text-sm p-2 bg-transparent"
        >
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-textMuted">
          <FiList />
          <span className="text-sm font-medium hidden sm:inline">Sort</span>
        </div>
        <select 
          value={sortBy} 
          onChange={(e) => setSortBy(e.target.value)}
          className="glass-input text-sm p-2 bg-transparent"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
