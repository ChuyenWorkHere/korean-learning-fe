// src/components/writing/ChallengeHeader.jsx
import React from 'react';
import { Languages, Lightbulb } from 'lucide-react';

const ChallengeHeader = ({ course, unit, lesson, promptLanguage, promptText, image }) => {
  return (
    <div className="w-full mb-10">
      
      {/* Breadcrumb */}
      <div className="flex flex-wrap gap-2 mb-8 text-sm font-medium">
        <a className="text-[#9a8d4c] hover:underline" href="#">{course}</a>
        <span className="text-[#9a8d4c]">/</span>
        <a className="text-[#9a8d4c] hover:underline" href="#">{unit}</a>
        <span className="text-[#9a8d4c]">/</span>
        <span className="text-[#1b190d] dark:text-white">{lesson}</span>
      </div>

      {/* Prompt Card */}
      <div className="flex flex-col md:flex-row items-stretch justify-start rounded-xl shadow-sm bg-primary/10 border border-primary/20 overflow-hidden">
        
        {/* Decorative Image */}
        <div 
          className="w-full md:w-1/3 bg-center bg-no-repeat aspect-video md:aspect-square bg-cover" 
          style={{ backgroundImage: `url('${image}')` }}
        ></div>
        
        {/* Content */}
        <div className="flex w-full grow flex-col items-stretch justify-center gap-2 p-8">
          <div className="flex items-center gap-2 text-[#9a8d4c] dark:text-primary/80 uppercase tracking-wider text-xs font-bold mb-2">
            <Languages className="w-4 h-4" />
            {promptLanguage} Prompt
          </div>
          
          <h1 className="text-[#1b190d] dark:text-white text-2xl lg:text-3xl font-bold leading-tight tracking-tight">
            Translate into Korean
          </h1>
          
          <div className="mt-4 flex flex-col md:flex-row md:items-center gap-6 justify-between border-t border-primary/20 pt-6">
            <p className="text-[#1b190d] dark:text-white text-xl md:text-2xl italic font-medium leading-relaxed">
              "{promptText}"
            </p>
            <button className="flex min-w-[100px] items-center justify-center gap-2 rounded-lg h-10 px-6 bg-white dark:bg-[#3a3726] text-[#1b190d] dark:text-white text-sm font-semibold shadow-sm hover:shadow-md transition-all border border-[#e7e3cf] dark:border-none">
              <Lightbulb className="w-4 h-4" />
              Hint
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ChallengeHeader;