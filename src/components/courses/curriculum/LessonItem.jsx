// src/components/curriculum/LessonItem.jsx
import React from 'react';
import { CheckCircle, PlayCircle, Lock } from 'lucide-react';

const LessonItem = ({ 
  title, 
  subtitle, // Ví dụ: "10 min • Completed"
  status = "locked", // "completed" | "active" | "locked"
  onAction 
}) => {
  
  // 1. Trạng thái HOÀN THÀNH (Completed)
  if (status === "completed") {
    return (
      <div className="flex items-center gap-4 bg-slate-50 dark:bg-white/5 px-6 py-4 rounded-xl border border-slate-200 dark:border-white/10 opacity-75">
        <div className="text-green-500 flex items-center justify-center rounded-full bg-green-500/10 shrink-0 size-12">
          <CheckCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-slate-900 dark:text-white text-base font-bold">{title}</p>
          <p className="text-slate-500 dark:text-[#b9b49d] text-sm">{subtitle}</p>
        </div>
        <button 
          onClick={onAction}
          className="bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
        >
          Review
        </button>
      </div>
    );
  }

  // 2. Trạng thái ĐANG HỌC (Active)
  if (status === "active") {
    return (
      <div className="flex items-center gap-4 bg-white dark:bg-[#393628] px-6 py-4 rounded-xl border-2 border-primary shadow-xl shadow-primary/10 relative overflow-hidden group">
        <div className="absolute left-0 top-0 h-full w-1 bg-primary"></div>
        <div className="text-primary flex items-center justify-center rounded-full bg-primary/20 shrink-0 size-12">
          <PlayCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <p className="text-slate-900 dark:text-white text-base font-bold">{title}</p>
            {/* <span className="animate-pulse bg-primary text-[10px] font-bold px-1.5 py-0.5 rounded text-background-dark uppercase tracking-wider">Active</span> */}
          </div>
          <p className="text-slate-500 dark:text-[#eecd2b]/80 text-sm font-medium">{subtitle}</p>
        </div>
        <button 
          onClick={onAction}
          className="bg-primary text-background-dark dark:bg-white/10 dark:text-white px-4 py-2 rounded-lg text-sm font-bold hover:scale-105 transition-transform shadow-md"
        >
          Start Lesson
        </button>
      </div>
    );
  }

  // 3. Trạng thái KHÓA (Locked) - Mặc định
  return (
    <div className="flex items-center gap-4 bg-slate-50/50 dark:bg-white/[0.02] px-6 py-4 rounded-xl border border-dashed border-slate-300 dark:border-white/5 grayscale">
      <div className="text-slate-400 dark:text-white/20 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/5 shrink-0 size-12">
        <Lock className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <p className="text-slate-400 dark:text-white/30 text-base font-bold">{title}</p>
        <p className="text-slate-400 dark:text-white/20 text-sm">{subtitle}</p>
      </div>
      <div className="px-4 py-2 opacity-0 select-none">Locked</div> {/* Placeholder để giữ layout */}
    </div>
  );
};

export default LessonItem;