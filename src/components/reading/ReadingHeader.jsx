// src/components/reading/ReadingHeader.jsx
import React from 'react';
import { ChevronRight, Clock, BookOpen } from 'lucide-react';

const ReadingHeader = ({ 
  courseTitle = "Intermediate Courses",
  unitTitle = "Unit 4",
  lessonType = "Reading",
  title,
  tags = [] 
}) => {
  return (
    <header className="pb-6 border-b border-black/5 dark:border-white/5 bg-background-light/80 dark:bg-background-dark/80 top-0 z-10">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 mb-8 text-sm font-medium text-[#888263]">
          <a href="#" className="hover:text-primary transition-colors">{courseTitle}</a>
          <span className="text-xs"><ChevronRight className="w-3 h-3" /></span>
          <a href="#" className="hover:text-primary transition-colors">{unitTitle}</a>
          <span className="text-xs"><ChevronRight className="w-3 h-3" /></span>
          <span className="text-[#181711] dark:text-white font-semibold">{lessonType}</span>
        </nav>

        {/* Title & Tags */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="text-[#181711] dark:text-white text-3xl md:text-4xl font-bold tracking-tight">
              {title}
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <div key={index} className={`flex h-7 items-center justify-center rounded-full px-3 text-xs font-semibold ${
                  tag.highlight 
                    ? 'bg-primary/20 text-[#181711] dark:text-primary font-bold uppercase tracking-wider' 
                    : 'bg-black/5 dark:bg-white/10 text-[#888263] dark:text-[#ccc]'
                }`}>
                  {tag.icon && <span className="mr-1">{tag.icon}</span>}
                  {tag.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ReadingHeader;