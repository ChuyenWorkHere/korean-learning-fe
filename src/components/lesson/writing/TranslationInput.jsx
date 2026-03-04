// src/components/writing/TranslationInput.jsx
import React, { useState } from 'react';
import { PenTool, SpellCheck, Sparkles } from 'lucide-react';

const TranslationInput = ({ onSave, onSubmit }) => {
  const [text, setText] = useState('');
  const maxLength = 500;

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setText(e.target.value);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Input Area */}
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-end pb-3">
          <label className="text-[#1b190d] dark:text-white text-lg font-semibold leading-normal">
            Your Korean Translation
          </label>
          {text.length > 0 && (
            <span className="text-primary text-sm font-medium animate-pulse">
              Draft saved
            </span>
          )}
        </div>
        
        <div className="relative group">
          <textarea 
            value={text}
            onChange={handleChange}
            className="w-full resize-none overflow-hidden rounded-xl text-[#1b190d] dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border-2 border-[#e7e3cf] dark:border-[#3a3726] bg-white dark:bg-[#1b190d] focus:border-primary min-h-[250px] md:min-h-[320px] placeholder:text-[#9a8d4c]/50 p-6 text-xl leading-relaxed transition-all shadow-inner font-serif-kr" 
            placeholder="Type your Korean translation here..."
          />
          {/* Decorative dots inside textarea */}
          <div className="absolute bottom-4 left-4 flex gap-1 opacity-0 group-focus-within:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
            <div className="w-1.5 h-1.5 bg-primary/30 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Toolbar & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
        
        {/* Status Indicators */}
        <div className="flex items-center gap-4 text-[#9a8d4c] dark:text-primary/60">
          <div className="flex items-center gap-1.5">
            <PenTool className="w-4 h-4" />
            <p className="text-sm font-medium">{text.length} / {maxLength}</p>
          </div>
          <div className="h-4 w-px bg-[#e7e3cf] dark:bg-[#3a3726]"></div>
          <div className="flex items-center gap-1.5">
            <SpellCheck className="w-4 h-4" />
            <p className="text-sm font-medium">No errors detected</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => onSave(text)}
            className="flex-1 md:flex-none min-w-[120px] items-center justify-center rounded-lg h-12 px-6 bg-transparent border-2 border-primary text-primary hover:bg-primary/5 font-semibold text-base transition-all"
          >
            Save Draft
          </button>
          <button 
            onClick={() => onSubmit(text)}
            disabled={text.length === 0}
            className="flex-1 md:flex-none min-w-[200px] flex items-center justify-center gap-2 rounded-lg h-12 px-8 bg-primary text-[#1b190d] text-base font-bold shadow-[0_4px_14px_0_rgba(238,205,43,0.39)] hover:shadow-[0_6px_20px_rgba(238,205,43,0.5)] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            <Sparkles className="w-5 h-5 fill-current" />
            Get AI Feedback
          </button>
        </div>
      </div>
      
    </div>
  );
};

export default TranslationInput;