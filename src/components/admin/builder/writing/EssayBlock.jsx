import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { aiService } from '../../../../services/aiService';

const EssayBlock = ({ data, onChange }) => {

  return (
    <div className="p-6 grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Topic Title</label>
        <input 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none" 
          placeholder="e.g., Environment Preservation and Economic Growth" 
          type="text"
          value={data.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
      </div>
      <div className="col-span-12">
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Instructions</label>
        <textarea 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none resize-y min-h-[80px]" 
          placeholder="Write an argumentative essay about..." 
          rows="3"
          value={data.instructions}
          onChange={(e) => onChange('instructions', e.target.value)}
        />
      </div>
      <div className="col-span-12 md:col-span-4">
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Word Count Range</label>
        <div className="flex items-center gap-2">
          <input 
            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-center" 
            type="number" 
            value={data.minWords}
            onChange={(e) => onChange('minWords', e.target.value)}
          />
          <span className="text-xs text-[#5e5836]">-</span>
          <input 
            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-center" 
            type="number" 
            value={data.maxWords}
            onChange={(e) => onChange('maxWords', e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-6 md:col-span-4">
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Time Limit (Min)</label>
        <input 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-center" 
          type="number" 
          value={data.timeLimit}
          onChange={(e) => onChange('timeLimit', e.target.value)}
        />
      </div>
      <div className="col-span-6 md:col-span-4">
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Difficulty</label>
        <select 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none cursor-pointer"
          value={data.difficulty}
          onChange={(e) => onChange('difficulty', e.target.value)}
        >
          <option>Advanced (Level 5-6)</option>
          <option>Intermediate (Level 3-4)</option>
          <option>Beginner (Level 1-2)</option>
        </select>
      </div>
    </div>
  );
};

export default EssayBlock;