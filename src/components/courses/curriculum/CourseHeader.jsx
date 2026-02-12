// src/components/curriculum/CourseHeader.jsx
import React from 'react';

const CourseHeader = ({ title, description, progress, image, onContinue }) => {
  return (
    <div className="bg-white dark:bg-[#2a2718] rounded-2xl overflow-hidden shadow-sm border border-slate-200 dark:border-white/5 mb-10">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div 
          className="w-full md:w-1/2 bg-center bg-no-repeat aspect-video bg-cover" 
          style={{ backgroundImage: `url("${image}")` }}
        ></div>
        
        {/* Content */}
        <div className="flex flex-col p-8 md:p-10 justify-center flex-1">
          <div className="flex flex-col gap-2 mb-6">
            <h1 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight md:text-4xl">
              {title}
            </h1>
            <p className="text-slate-500 dark:text-[#b9b49d] text-base font-normal">
              {description}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-3 mb-8">
            <div className="flex justify-between items-center">
              <p className="text-slate-900 dark:text-white text-sm font-bold">Overall Progress</p>
              <p className="text-primary text-sm font-bold">{progress}%</p>
            </div>
            <div className="h-3 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <button 
            onClick={onContinue}
            className="w-fit flex min-w-[200px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-background-dark text-base font-black hover:scale-[1.02] active:scale-95 transition-transform shadow-lg shadow-primary/20"
          >
            Continue Lesson
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;