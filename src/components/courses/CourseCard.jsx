// src/components/courses/CourseCard.jsx
import React from 'react';
import ProgressBar from '../common/ProgressBar';
import { Lock, BookOpen } from 'lucide-react';
import { Link } from 'react-router';

const CourseCard = ({
  id,
  title,
  description,
  icon: Icon, 
  badgeText,
  progress = 0,
  totalLessons,
  completedLessons,
  buttonText = "Continue",
  isLocked = false,
  badgeColorClass = "bg-[#f3f1e7] text-[#9a8d4c] dark:bg-[#3d3821] dark:text-[#b5ab76]"
}) => {

  // 1. Giao diện khi bị KHÓA (Locked State)
  if (isLocked) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 p-5 rounded-xl border border-dashed border-[#e7e3cf] dark:border-[#3d3821] opacity-60 h-full min-h-[260px]">
        <Lock className="w-10 h-10 text-[#9a8d4c]" />
        <div className="text-center px-4 w-full">
          {/* Cắt ngắn title nếu quá dài để tránh vỡ layout */}
          <p className="text-[#9a8d4c] text-sm font-bold line-clamp-2">{title}</p> 
          <p className="text-[#9a8d4c] text-xs mt-2 line-clamp-1">{description}</p>
        </div>
      </div>
    );
  }

  // 2. Giao diện BÌNH THƯỜNG (Active State)
  return (
    <div className="group flex flex-col gap-4 p-5 rounded-xl border border-[#e7e3cf] dark:border-[#3d3821] bg-white dark:bg-[#2d2916] shadow-sm hover:shadow-md transition-all h-full min-h-[260px]">
      
      {/* Header: Icon + Badge */}
      <div className="flex justify-between items-start">
        <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center text-primary shrink-0">
          {/* Bảo vệ ứng dụng: Nếu không có Icon truyền vào thì dùng BookOpen mặc định */}
          {Icon ? <Icon className="w-8 h-8" /> : <BookOpen className="w-8 h-8" />}
        </div>
        {badgeText && (
          <span className={`text-[10px] uppercase tracking-wide font-bold px-2 py-1 rounded ${badgeColorClass}`}>
            {badgeText}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-[#1b190d] dark:text-white text-lg font-bold mb-1 line-clamp-2">
          {title}
        </h3>
        
        {/* Chỉ render mô tả nếu có dữ liệu */}
        {description && (
          <p className="text-[#9a8d4c] dark:text-[#b5ab76] text-sm font-normal mb-4 line-clamp-1">
            {description}
          </p>
        )}

        {/* Progress Bar - Đẩy xuống đáy bằng mt-auto */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex justify-between text-xs font-bold text-[#1b190d] dark:text-[#d1cdb8]">
            <span>{progress}% Complete</span>
            <span>{completedLessons}/{totalLessons} Lessons</span>
          </div>
          <ProgressBar progress={progress} />
        </div>
      </div>

      {/* Action Button */}
      <Link to={`/courses/${id}`} className="block w-full mt-2">
        <button className="w-full py-2 rounded-lg bg-primary/10 text-[#1b190d] dark:text-primary font-bold text-sm group-hover:bg-primary group-hover:text-white dark:group-hover:text-white transition-colors">
          {buttonText}
        </button>
      </Link>
      
    </div>
  );
};

export default CourseCard;