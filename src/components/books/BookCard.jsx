// src/components/library/BookCard.jsx
import React from 'react';
import { Clock } from 'lucide-react';

const BookCard = ({
  title,
  subtitle,
  image,
  level,       // VD: "A1 Beginner"
  levelCode,   // VD: "A1", "B1", "C1" (Dùng để tô màu)
  duration,    // VD: "15 min read"
  onRead
}) => {
  
  // Logic màu sắc cho Badge
  const getBadgeColor = (code) => {
    if (code.startsWith('A')) return 'bg-primary text-white'; // Beginner (Vàng/Primary)
    if (code.startsWith('B')) return 'bg-orange-500 text-white'; // Intermediate (Cam)
    if (code.startsWith('C')) return 'bg-red-500 text-white'; // Advanced (Đỏ)
    return 'bg-gray-500 text-white';
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-[#2d2915] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-[#f3f1e7] dark:border-[#3a351a] h-full">
      {/* Cover Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#eeebe2]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
        
        {/* Level Badge */}
        <div className="absolute top-3 left-3 z-20">
          <span className={`${getBadgeColor(levelCode)} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider shadow-sm`}>
            {level}
          </span>
        </div>
        
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={image} 
          alt={title} 
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-bold text-lg leading-snug group-hover:text-primary transition-colors text-[#1b190d] dark:text-[#f3f1e7]">
          {title}
        </h3>
        <p className="text-[#9a8d4c] dark:text-[#b0a575] text-sm font-medium">
          {subtitle}
        </p>
        
        <div className="flex items-center gap-2 mt-auto pt-2 text-[#9a8d4c] dark:text-[#b0a575] text-xs">
          <Clock className="w-4 h-4" />
          <span>{duration}</span>
        </div>

        <button 
          onClick={onRead}
          className="mt-4 w-full bg-[#f3f1e7] dark:bg-[#3a351a] hover:bg-primary hover:text-white transition-colors text-[#1b190d] dark:text-[#f3f1e7] font-bold py-2 rounded-lg text-sm"
        >
          Start Reading
        </button>
      </div>
    </div>
  );
};

export default BookCard;