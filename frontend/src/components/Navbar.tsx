import React from 'react';
import { FiCheckSquare } from 'react-icons/fi';

const Navbar: React.FC = () => {
  return (
    <nav className="glass sticky top-0 z-50 py-4 px-6 mb-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-primary to-accent p-2 rounded-xl shadow-lg shadow-primary/20">
          <FiCheckSquare className="text-white text-2xl" />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
          TaskFlow
        </h1>
      </div>
      <div>
        <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-secondary to-primary p-[2px] shadow-lg">
          <div className="h-full w-full rounded-full bg-background flex items-center justify-center">
            <span className="text-sm font-semibold">ME</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
