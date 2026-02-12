// src/components/study/StudyControls.jsx
import React from 'react';
import { ArrowLeft, ArrowRight, Lightbulb } from 'lucide-react';

const StudyControls = ({ onNext, onPrev, isFirst, isLast }) => {
  return (
    <div className="w-full flex flex-col items-center mt-12">
      {/* Navigation Buttons */}
      <div className="flex gap-6 w-full max-w-[640px]">
        <button 
          onClick={onPrev}
          disabled={isFirst}
          className="flex-1 flex items-center justify-center gap-3 rounded-2xl h-16 bg-white dark:bg-[#3d3a2a] text-[#1b190d] dark:text-[#f3f1e7] text-lg font-bold hover:bg-[#f3f1e7] dark:hover:bg-[#4d4a3a] transition-all border border-[#e7e3cf] dark:border-[#2d2a1a] shadow-sm active:translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Previous</span>
        </button>

        <button 
          onClick={onNext}
          disabled={isLast}
          className="flex-[1.8] flex items-center justify-center gap-3 rounded-2xl h-16 bg-primary text-[#1b190d] text-lg font-bold hover:brightness-105 hover:shadow-lg transition-all border-b-4 border-[#c9ab24] active:border-b-0 active:translate-y-1 shadow-primary/10 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-b-0"
        >
          <span>Next Word</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard Hint */}
      <div className="mt-12 px-8 py-3 bg-primary/5 rounded-full border border-primary/10">
        <p className="text-[#9a8d4c] text-sm font-medium flex items-center gap-3">
          <Lightbulb className="w-5 h-5" />
          <span>
            Pro tip: Use 
            <kbd className="px-2.5 py-1 bg-white dark:bg-[#2d2a1a] rounded-lg border border-[#e7e3cf] dark:border-[#3d3a2a] text-[10px] font-bold shadow-sm mx-1 font-sans">SPACE</kbd> 
            to flip and 
            <kbd className="px-2.5 py-1 bg-white dark:bg-[#2d2a1a] rounded-lg border border-[#e7e3cf] dark:border-[#3d3a2a] text-[10px] font-bold shadow-sm mx-1 font-sans">ARROWS</kbd> 
            to navigate
          </span>
        </p>
      </div>
    </div>
  );
};

export default StudyControls;