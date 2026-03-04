import React from 'react';

const CourseFooter = ({ totalUnits, totalLessons }) => {
  return (
    <div className="mt-12 p-6 bg-[#eecd2b]/10 border border-[#eecd2b]/20 rounded-2xl flex flex-wrap items-center justify-between max-w-5xl gap-4">
      <div className="flex items-center gap-6">
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Units</span>
          <span className="text-2xl font-extrabold text-[#221f10] dark:text-white">{totalUnits}</span>
        </div>
        <div className="h-10 w-px bg-[#eecd2b]/30"></div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Lessons</span>
          <span className="text-2xl font-extrabold text-[#221f10] dark:text-white">{totalLessons}</span>
        </div>
        <div className="h-10 w-px bg-[#eecd2b]/30"></div>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-sm font-bold text-[#221f10] dark:text-white">All Saved</span>
          </div>
        </div>
      </div>
      <button className="bg-[#221f10] dark:bg-white text-white dark:text-[#221f10] px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
        Preview Course
      </button>
    </div>
  );
};

export default CourseFooter;