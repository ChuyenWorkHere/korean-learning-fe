// src/components/courses/CourseCard.jsx
import React from 'react';
import ProgressBar from '../common/ProgressBar';
import { Lock } from 'lucide-react'; // Icon khóa cho trạng thái locked
import { Link } from 'react-router';

const CourseCard = ({
  title,
  description,
  icon: Icon, // Lucide Icon component
  badgeText,
  progress = 0,
  totalLessons,
  completedLessons,
  buttonText = "Continue",
  isLocked = false,
  // Màu sắc badge (mặc định là xám/vàng nhạt)
  badgeColorClass = "bg-[#f3f1e7] text-[#9a8d4c] dark:bg-[#3d3821] dark:text-[#b5ab76]"
}) => {

  // 1. Giao diện khi bị KHÓA (Locked State)
  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-5 rounded-xl border border-dashed border-[#e7e3cf] dark:border-[#3d3821] opacity-60 h-full min-h-[200px]">
        <Lock className="w-10 h-10 text-[#9a8d4c]" />
        <div className="text-center">
          <p className="text-[#9a8d4c] text-sm font-bold">{title}</p>
          <p className="text-[#9a8d4c] text-xs mt-1">{description}</p>
        </div>
      </div>
    );
  }

  // 2. Giao diện BÌNH THƯỜNG (Active State)
  return (
    <div className="group flex flex-col gap-4 p-5 rounded-xl border border-[#e7e3cf] dark:border-[#3d3821] bg-white dark:bg-[#2d2916] shadow-sm hover:shadow-md transition-all h-full">
      {/* Header: Icon + Badge */}
      <div className="flex justify-between items-start">
        <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
          <Icon className="w-8 h-8" />
        </div>
        {badgeText && (
          <span className={`text-xs font-bold px-2 py-1 rounded ${badgeColorClass}`}>
            {badgeText}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-[#1b190d] dark:text-white text-xl font-bold mb-1">
          {title}
        </p>
        <p className="text-[#9a8d4c] dark:text-[#b5ab76] text-sm font-normal mb-4">
          {description}
        </p>

        {/* Progress Bar */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between text-xs font-bold text-[#1b190d] dark:text-[#d1cdb8]">
            <span>{progress}% Complete</span>
            <span>{completedLessons}/{totalLessons} Lessons</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Action Button */}
      <Link to="/courses/1">
        <button className="w-full mt-2 py-2 rounded-lg bg-primary/10 text-[#1b190d] dark:text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
          {buttonText}
        </button>
      </Link>
      {/* <button className="w-full mt-2 py-2 rounded-lg bg-primary/10 text-[#1b190d] dark:text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white transition-colors">
          {buttonText}
        </button> */}
    </div>
  );
};

export default CourseCard;