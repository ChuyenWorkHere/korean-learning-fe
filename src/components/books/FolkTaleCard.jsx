// src/components/library/FolkTaleCard.jsx
import React from 'react';

const FolkTaleCard = ({ title, subtitle, image, onClick }) => {
  return (
    <div
      className="flex-none shrink-0 snap-center group cursor-pointer w-full md:w-64"
      onClick={onClick}
    >
      <div className="aspect-video w-full bg-[#f3f1e7] dark:bg-[#3a351a] rounded-xl overflow-hidden mb-3 border border-transparent group-hover:border-primary transition-all shadow-sm">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          src={image}
          alt={title}
        />
      </div>
      <p className="font-bold text-[#1b190d] dark:text-[#f3f1e7] truncate">
        {title}
      </p>
      <p className="text-xs text-[#9a8d4c] dark:text-[#b0a575] truncate">
        {subtitle}
      </p>
    </div>
  );
};

export default FolkTaleCard;