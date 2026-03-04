import React from 'react';
import { Search, LayoutGrid, List as ListIcon } from 'lucide-react';

const CourseFilterBar = () => {
  return (
    <div className="bg-[#ffffff] dark:bg-[#2d2916] rounded-xl p-4 mb-8 border border-[#eac82e]/10 shadow-sm flex flex-col xl:flex-row gap-4">
      <div className="flex-1 relative flex items-center">
        <Search className="absolute left-4 w-5 h-5 text-[#1b190d]/40 dark:text-[#f0ede4]/40" />
        <input 
          className="w-full bg-[#f8f8f6] dark:bg-[#211e11] border-none rounded-lg pl-12 pr-4 py-3 focus:ring-2 focus:ring-[#eac82e] text-sm font-medium outline-none text-[#1b190d] dark:text-white" 
          placeholder="Search courses by title or ID..." 
          type="text"
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <select className="bg-[#f8f8f6] dark:bg-[#211e11] border-none rounded-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#eac82e] outline-none min-w-[140px] cursor-pointer text-[#1b190d] dark:text-white">
          <option>All Statuses</option>
          <option>Published</option>
          <option>Draft</option>
        </select>
        <select className="bg-[#f8f8f6] dark:bg-[#211e11] border-none rounded-lg px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#eac82e] outline-none min-w-[140px] cursor-pointer text-[#1b190d] dark:text-white">
          <option>All Levels</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>
      </div>
    </div>
  );
};

export default CourseFilterBar;