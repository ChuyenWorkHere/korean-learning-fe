// src/components/study/FloatingActions.jsx
import React from 'react';
import { Volume2, Star } from 'lucide-react';

const FloatingActions = ({ onSpeak, onFavorite, isFavorite }) => {
  return (
    <div className="fixed bottom-10 right-10 flex flex-col gap-4 z-10">
      <button 
        onClick={onSpeak}
        className="size-14 rounded-2xl bg-white dark:bg-[#2d2a1a] shadow-2xl border border-[#e7e3cf] dark:border-[#3d3a2a] flex items-center justify-center text-[#9a8d4c] hover:text-primary hover:scale-110 transition-all"
        title="Listen pronunciation"
      >
        <Volume2 className="w-6 h-6" />
      </button>
      
      <button 
        onClick={onFavorite}
        className={`size-14 rounded-2xl bg-white dark:bg-[#2d2a1a] shadow-2xl border border-[#e7e3cf] dark:border-[#3d3a2a] flex items-center justify-center hover:scale-110 transition-all ${isFavorite ? 'text-primary' : 'text-[#9a8d4c] hover:text-primary'}`}
        title="Save to favorites"
      >
        <Star className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
      </button>
    </div>
  );
};

export default FloatingActions;