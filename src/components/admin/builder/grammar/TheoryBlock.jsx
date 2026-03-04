import React from 'react';
import { Bold, Italic, List } from 'lucide-react';

const TheoryBlock = ({ data, onChange }) => {
  return (
    <div>
      <div className="p-2 border-b border-[#eecd2b]/10 flex items-center justify-between bg-[#f8f8f6] dark:bg-[#221f10]/50">
        <div className="flex items-center gap-1 px-4">
          <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300 transition-colors"><Bold className="w-4 h-4" /></button>
          <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300 transition-colors"><Italic className="w-4 h-4" /></button>
          <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300 transition-colors"><List className="w-4 h-4" /></button>
        </div>
      </div>
      <div className="p-6">
        <textarea 
          className="w-full bg-transparent border-none text-lg leading-relaxed text-[#1b190d] dark:text-gray-200 outline-none resize-y min-h-[100px] focus:ring-0 p-0"
          placeholder="Explain the grammar concept here..."
          value={data.content}
          onChange={(e) => onChange('content', e.target.value)}
        />
      </div>
    </div>
  );
};

export default TheoryBlock;