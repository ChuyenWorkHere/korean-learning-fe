// src/components/curriculum/ModuleSection.jsx
import React from 'react';

const ModuleSection = ({ title, status, children }) => {
  
  // Logic màu badge dựa trên status
  let badgeClass = "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-white/20"; // Locked
  if (status === "Completed") badgeClass = "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
  if (status === "In Progress") badgeClass = "bg-primary/20 text-primary";

  // Nếu module bị khóa, làm mờ tiêu đề đi chút
  const titleClass = status === "Locked" 
    ? "text-slate-400 dark:text-white/40" 
    : "text-slate-900 dark:text-white";

  return (
    <section>
      <div className="flex items-center gap-3 mb-6">
        <h2 className={`${titleClass} text-2xl font-bold`}>{title}</h2>
        <span className={`${badgeClass} text-xs font-bold px-2 py-1 rounded`}>
          {status}
        </span>
      </div>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </section>
  );
};

export default ModuleSection;