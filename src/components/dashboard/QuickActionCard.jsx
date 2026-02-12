// src/components/dashboard/QuickActionCard.jsx
import React from 'react';

const QuickActionCard = ({ 
  title, 
  subtitle, 
  icon: Icon,
  badgeText, 
  badgeColorClass,
  iconColorClass,
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className="p-5 bg-white dark:bg-white/5 border border-soft-tan dark:border-white/10 rounded-xl hover:border-primary/50 transition-colors cursor-pointer shadow-sm group"
    >
      <div className="flex justify-between items-start mb-4">
        {/* Icon */}
        <Icon className={`w-8 h-8 ${iconColorClass}`} />
        
        {/* Badge (Review Due / In Progress) */}
        {badgeText && (
          <span className={`text-xs font-bold px-2 py-1 rounded ${badgeColorClass}`}>
            {badgeText}
          </span>
        )}
      </div>
      
      {/* Text Content */}
      <h5 className="font-bold text-text-main dark:text-white text-lg group-hover:text-primary transition-colors">
        {title}
      </h5>
      <p className="text-sm text-text-muted">
        {subtitle}
      </p>
    </div>
  );
};

export default QuickActionCard;