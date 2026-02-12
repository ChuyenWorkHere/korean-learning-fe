// src/components/dashboard/WordDayCard.jsx
import React from 'react';
import { Volume2, Bookmark, Hexagon, Sun } from 'lucide-react';

const WordDayCard = ({ 
  koreanWord, 
  romanization, 
  meaning, 
  level,
  onListen,
  onSave
}) => {
  return (
    <div className="h-full"> {/* h-full để nó cao bằng các cột bên cạnh nếu cần */}
      <h3 className="text-xl font-bold text-text-main dark:text-white mb-6 flex items-center gap-2">
        <Sun className="w-6 h-6 text-primary" />
        Word of the Day
      </h3>

      <div className="bg-primary/10 border-2 border-primary/30 rounded-xl p-8 relative overflow-hidden group shadow-lg h-[calc(100%-3.5rem)] flex flex-col justify-center">
        
        {/* Decorative Background Icon (Hexagon - Honeycomb style) */}
        <div className="absolute -top-4 -right-4 text-primary/10 select-none pointer-events-none rotate-12">
          <Hexagon strokeWidth={1} className="w-40 h-40 fill-current" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          <span className="bg-primary text-text-main text-[10px] font-bold uppercase px-3 py-1 rounded-full mb-4 inline-block shadow-sm">
            {level}
          </span>
          
          <h4 className="text-5xl font-black text-text-main mb-2 tracking-tight">
            {koreanWord}
          </h4>
          <p className="text-text-muted font-medium mb-1 text-lg">
            {romanization}
          </p>
          <p className="text-2xl font-bold text-text-main mb-8">
            {meaning}
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button 
              onClick={onListen}
              className="w-full py-2.5 bg-white text-text-main border border-soft-tan rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-soft-tan transition-colors shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              Listen
            </button>
            
            <button 
              onClick={onSave}
              className="w-full py-2.5 bg-text-main text-white rounded-lg text-sm font-semibold hover:bg-text-main/90 transition-colors shadow-md flex items-center justify-center gap-2"
            >
              <Bookmark className="w-4 h-4" />
              Save to Vocab
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordDayCard;