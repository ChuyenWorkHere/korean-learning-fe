import React from 'react';

const AiGradingBlock = ({ data, onChange }) => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2 flex items-center gap-2">
          Evaluation Rubric <span className="text-[10px] font-normal normal-case opacity-60">(Prompt context for AI)</span>
        </label>
        <textarea 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-4 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none resize-y min-h-[100px]" 
          placeholder="e.g. Deduct points for incorrect spacing. Must use formal language (-습니다/비니다). Topic must address both pros and cons..." 
          value={data.rubric}
          onChange={(e) => onChange('rubric', e.target.value)}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase">Grading Strictness:</label>
        <select 
          className="bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none cursor-pointer"
          value={data.strictness}
          onChange={(e) => onChange('strictness', e.target.value)}
        >
          <option>Lenient (Focus on meaning)</option>
          <option>Medium (Standard TOPIK rules)</option>
          <option>Strict (Grammar & Spelling focused)</option>
        </select>
      </div>
    </div>
  );
};

export default AiGradingBlock;