import React from 'react';

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-3 text-sm font-medium transition-all duration-200 rounded-lg
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' 
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
        }
      `}
    >
      {icon}
      {label}
    </button>
  );
};