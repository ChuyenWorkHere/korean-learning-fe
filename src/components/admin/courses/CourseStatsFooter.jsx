import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CourseStatsFooter = ({ totalCourses, enrolledStudents = "12,450", activeInstructors = 18 }) => {
  return (
    <footer className="mt-12 flex flex-col sm:flex-row items-center justify-between text-sm text-[#1b190d]/40 dark:text-[#f0ede4]/40 border-t border-[#eac82e]/10 pt-8 gap-4">
      <div className="flex gap-6">
        <span>Total Courses: <b className="text-[#1b190d] dark:text-white">{totalCourses}</b></span>
        <span>Enrolled Students: <b className="text-[#1b190d] dark:text-white">{enrolledStudents}</b></span>
        <span>Active Instructors: <b className="text-[#1b190d] dark:text-white">{activeInstructors}</b></span>
      </div>
      <div className="flex items-center gap-2">
        <span>Page 1 of 3</span>
        <div className="flex items-center ml-2 gap-1">
          <button className="w-8 h-8 rounded bg-[#eac82e]/10 text-[#eac82e] flex items-center justify-center hover:bg-[#eac82e] hover:text-[#211e11] transition-colors"><ChevronLeft className="w-4 h-4" /></button>
          <button className="w-8 h-8 rounded bg-[#eac82e] text-[#211e11] font-bold text-xs flex items-center justify-center">1</button>
          <button className="w-8 h-8 rounded bg-[#eac82e]/10 text-[#eac82e] flex items-center justify-center hover:bg-[#eac82e] hover:text-[#211e11] font-bold text-xs transition-colors">2</button>
          <button className="w-8 h-8 rounded bg-[#eac82e]/10 text-[#eac82e] flex items-center justify-center hover:bg-[#eac82e] hover:text-[#211e11] font-bold text-xs transition-colors">3</button>
          <button className="w-8 h-8 rounded bg-[#eac82e]/10 text-[#eac82e] flex items-center justify-center hover:bg-[#eac82e] hover:text-[#211e11] transition-colors"><ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </footer>
  );
};

export default CourseStatsFooter;