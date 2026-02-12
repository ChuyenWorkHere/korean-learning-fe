// src/components/deck-builder/CardRow.jsx
import React from 'react';
import { Trash2 } from 'lucide-react';

const CardRow = ({ index, card, onChange, onRemove }) => {
  return (
    <div className="flex items-start gap-4 bg-white dark:bg-[#27251c] p-5 rounded-xl border border-[#e7e3cf] dark:border-[#393628] group transition-all hover:border-primary/50">
      {/* Numbering */}
      <div className="text-[#9a8d4c] dark:text-[#544f3b] font-bold text-lg pt-3 w-8">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Inputs Grid */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
        <label>
          <p className="text-xs font-semibold text-[#9a8d4c] dark:text-[#b9b49d] uppercase tracking-wider mb-1">Front (Korean)</p>
          <input 
            type="text"
            value={card.front}
            onChange={(e) => onChange(card.id, 'front', e.target.value)}
            className="w-full rounded-lg border border-[#e7e3cf] dark:border-[#544f3b] bg-[#f8f8f6] dark:bg-[#181711] text-[#1b190d] dark:text-white focus:border-primary focus:ring-0 h-11 px-3 text-base font-medium" 
            placeholder="e.g. 먹다"
          />
        </label>
        
        <label>
          <p className="text-xs font-semibold text-[#9a8d4c] dark:text-[#b9b49d] uppercase tracking-wider mb-1">Back (Meaning)</p>
          <input 
            type="text"
            value={card.back}
            onChange={(e) => onChange(card.id, 'back', e.target.value)}
            className="w-full rounded-lg border border-[#e7e3cf] dark:border-[#544f3b] bg-[#f8f8f6] dark:bg-[#181711] text-[#1b190d] dark:text-white focus:border-primary focus:ring-0 h-11 px-3 text-base" 
            placeholder="e.g. To eat"
          />
        </label>
        
        <label>
          <p className="text-xs font-semibold text-[#9a8d4c] dark:text-[#b9b49d] uppercase tracking-wider mb-1">Example sentence</p>
          <input 
            type="text"
            value={card.example}
            onChange={(e) => onChange(card.id, 'example', e.target.value)}
            className="w-full rounded-lg border border-[#e7e3cf] dark:border-[#544f3b] bg-[#f8f8f6] dark:bg-[#181711] text-[#1b190d] dark:text-white focus:border-primary focus:ring-0 h-11 px-3 text-base" 
            placeholder="Optional"
          />
        </label>
      </div>

      {/* Delete Button */}
      <button 
        onClick={() => onRemove(card.id)}
        className="p-2 mt-6 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-lg transition-colors"
        title="Remove card"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CardRow;