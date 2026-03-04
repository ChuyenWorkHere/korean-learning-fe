// src/components/writing/LearningTip.jsx
import React from 'react';
import { BrainCircuit } from 'lucide-react';

const LearningTip = ({ title, tipContent }) => {
  return (
    <div className="mt-16 p-8 rounded-xl bg-white dark:bg-[#2d2a1b] border-2 border-dashed border-[#e7e3cf] dark:border-[#3a3726] flex flex-col md:flex-row items-start md:items-center gap-6">
      <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
        <BrainCircuit className="w-8 h-8" />
      </div>
      <div>
        <h4 className="text-[#1b190d] dark:text-white font-bold text-lg mb-1">
          {title}
        </h4>
        <p 
          className="text-[#9a8d4c] dark:text-primary/70 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: tipContent }}
        />
      </div>
    </div>
  );
};

export default LearningTip;