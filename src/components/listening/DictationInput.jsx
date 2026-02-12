// src/components/listening/DictationInput.jsx
import React from 'react';
import { Trash2, Globe } from 'lucide-react';

const DictationInput = ({ value, onChange, onClear }) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {/* Label & Actions */}
      <div className="flex items-center justify-between px-1">
        <label htmlFor="dictation-input" className="text-[#1b190d] dark:text-[#f3f1e7] text-xl font-bold">
          Your Transcription
        </label>
        <button 
          onClick={onClear}
          className="text-[#9a8d4c] text-sm font-semibold hover:text-red-500 transition-colors flex items-center gap-1"
        >
          <Trash2 className="w-4 h-4" /> Clear all
        </button>
      </div>

      {/* Textarea Wrapper */}
      <div className="relative">
        <textarea 
          id="dictation-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full resize-none overflow-hidden rounded-2xl text-[#1b190d] dark:text-[#f3f1e7] focus:outline-none focus:ring-4 focus:ring-primary/20 border-2 border-[#f3f1e7] dark:border-[#3a3621] bg-white dark:bg-[#1b190d] min-h-[260px] placeholder:text-[#9a8d4c]/40 p-6 md:p-8 text-2xl md:text-3xl font-normal leading-relaxed tracking-wide transition-all shadow-sm font-serif-kr" 
          placeholder="Type the Korean sentence here..." 
          spellCheck="false"
        />
        
        {/* Language Indicator */}
        <div className="absolute bottom-6 right-8 flex items-center gap-2 bg-background-light dark:bg-[#3a3621] px-3 py-1.5 rounded-lg border border-[#f3f1e7] dark:border-[#3a3621]">
          <Globe className="w-4 h-4 text-[#9a8d4c]" />
          <span className="text-[#9a8d4c] text-sm font-bold">Language: KR</span>
        </div>
      </div>
    </div>
  );
};

export default DictationInput;