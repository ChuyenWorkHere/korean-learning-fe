import React from 'react';
import { X, Plus } from 'lucide-react';

const TranslationBlock = ({ data, onChange }) => {
  
  const handleAddVariation = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const text = data.tempVariation?.trim();
      if (text && !data.variations.includes(text)) {
        onChange('variations', [...data.variations, text]);
        onChange('tempVariation', ''); // Reset input
      }
    }
  };

  const handleRemoveVariation = (varIndex) => {
    const newVars = [...data.variations];
    newVars.splice(varIndex, 1);
    onChange('variations', newVars);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">English Prompt</label>
        <input 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none" 
          type="text" 
          placeholder="e.g. As modern society develops..."
          value={data.english}
          onChange={(e) => onChange('english', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Target Korean Sentence</label>
        <input 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none" 
          type="text" 
          placeholder="e.g. 현대 사회가 발전함에 따라..."
          value={data.korean}
          onChange={(e) => onChange('korean', e.target.value)}
        />
      </div>
      <div>
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2 flex items-center gap-2">
          Acceptable Variations (Tags)
          <span className="text-[10px] font-normal normal-case opacity-60">(Type and press Enter)</span>
        </label>
        <div className="flex flex-wrap items-center gap-2 p-3 bg-[#f8f8f6] dark:bg-[#221f10] rounded-lg min-h-[50px] focus-within:ring-1 focus-within:ring-[#eecd2b]">
          {data.variations.map((v, vIndex) => (
            <span key={vIndex} className="bg-[#eecd2b]/20 text-[#1b190d] dark:text-[#eecd2b] text-[11px] font-medium px-2 py-1 rounded flex items-center gap-1 border border-[#eecd2b]/30">
              {v} 
              <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => handleRemoveVariation(vIndex)} />
            </span>
          ))}
          <input 
            className="bg-transparent border-none p-1 text-[11px] outline-none flex-1 min-w-[150px] focus:ring-0" 
            placeholder="Add another correct translation..."
            value={data.tempVariation || ''}
            onChange={(e) => onChange('tempVariation', e.target.value)}
            onKeyDown={handleAddVariation}
          />
          <button onClick={handleAddVariation} className="text-[11px] font-bold text-[#eecd2b] flex items-center gap-1 hover:underline ml-2">
            <Plus className="w-3 h-3" /> ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default TranslationBlock;