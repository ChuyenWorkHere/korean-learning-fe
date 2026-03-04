import React from 'react';
import { ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

const BlockControls = ({ index, totalBlocks, onMoveUp, onMoveDown, onDelete }) => {
  return (
    <div className="flex items-center gap-1">
      <button 
        onClick={onMoveUp}
        disabled={index === 0}
        className="p-1 hover:bg-[#eecd2b]/20 rounded text-[#1b190d]/70 dark:text-[#f0ede4]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <button 
        onClick={onMoveDown}
        disabled={index === totalBlocks - 1}
        className="p-1 hover:bg-[#eecd2b]/20 rounded text-[#1b190d]/70 dark:text-[#f0ede4]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      <button 
        onClick={onDelete}
        className="p-1 hover:bg-red-500/20 text-red-500 rounded transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BlockControls;