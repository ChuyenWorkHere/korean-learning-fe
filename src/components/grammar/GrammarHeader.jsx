// src/components/grammar/GrammarHeader.jsx
import React from 'react';
import { ChevronRight } from 'lucide-react'; // Thay thế icon mũi tên

const GrammarHeader = ({ title, level, meaning }) => {
  return (
    <header className="w-full flex flex-col gap-8 mb-10">
      {/* Breadcrumb Navigation */}
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        <a href="#" className="text-primary font-medium hover:underline">Beginner Courses</a>
        <ChevronRight className="w-4 h-4 text-primary" />
        <a href="#" className="text-primary font-medium hover:underline">Section 4</a>
        <ChevronRight className="w-4 h-4 text-primary" />
        <span className="text-sm font-medium opacity-70">Grammar: {title}</span>
      </nav>

      <div className='flex flex-col gap-2'>
        <h2 className="text-[#1b190d] dark:text-[#f3f1e7] text-3xl md:text-4xl font-bold leading-tight">
          Grammar Point: {title}
        </h2>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 bg-primary/20 text-[#1b190d] dark:text-primary text-sm font-bold rounded-full">
            {level}
          </span>
          <p className="text-primary font-medium text-lg italic">"{meaning}"</p>
        </div>
      </div>
      {/* Main Title Area */}

    </header>
  );
};

export default GrammarHeader;