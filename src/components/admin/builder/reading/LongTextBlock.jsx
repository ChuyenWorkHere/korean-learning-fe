import React from 'react';
import { Bold, Italic, List, Wand2 } from 'lucide-react';

const LongTextBlock = ({ data, onChange }) => {
  return (
    <div>
      <div className="p-3 border-b border-[#eecd2b]/10 flex items-center px-6 bg-[#f8f8f6] dark:bg-[#221f10]/50">
        <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300"><Bold className="w-4 h-4" /></button>
        <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300"><Italic className="w-4 h-4" /></button>
        <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300"><List className="w-4 h-4" /></button>
        <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-2"></div>
        <button className="px-3 py-1.5 bg-[#eecd2b]/20 text-[#1b190d] dark:text-[#eecd2b] rounded flex items-center gap-1 hover:bg-[#eecd2b]/30 transition-colors">
          <Wand2 className="w-3 h-3" />
          <span className="text-xs font-semibold">Highlight Vocab</span>
        </button>
      </div>
      <div className="p-6">
        <textarea 
          className="w-full bg-transparent border-none text-xl leading-relaxed text-[#1b190d] dark:text-gray-200 outline-none resize-y min-h-[150px] focus:ring-0 p-0"
          placeholder="Type your story or article here..."
          value={data.content}
          onChange={(e) => onChange('content', e.target.value)}
        />
      </div>
    </div>
  );
};

export default LongTextBlock;