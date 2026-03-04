import React from 'react';

const FormulaBlock = ({ data, onChange }) => {
  return (
    <div className="p-8 flex flex-col md:flex-row gap-8 bg-[#eecd2b]/5 rounded-b-xl">
      <div className="flex-1 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#eecd2b]">Grammar Pattern</label>
        <div className="bg-white dark:bg-[#2d2916] rounded-lg p-2 border border-[#eecd2b]/20 shadow-inner">
          <input 
            className="w-full bg-transparent border-none focus:ring-0 text-2xl font-bold text-[#eecd2b] outline-none px-2" 
            type="text" 
            placeholder="e.g. Noun + 은/는"
            value={data.pattern}
            onChange={(e) => onChange('pattern', e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#eecd2b]">Meaning</label>
        <div className="bg-white dark:bg-[#2d2916] rounded-lg p-2 border border-[#eecd2b]/20 shadow-inner">
          <input 
            className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium text-[#1b190d] dark:text-white outline-none px-2" 
            type="text" 
            placeholder="English meaning"
            value={data.meaning}
            onChange={(e) => onChange('meaning', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormulaBlock;