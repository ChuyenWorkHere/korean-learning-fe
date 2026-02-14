import React from 'react';
import { BookOpen, Sun, ScrollText, Lock } from 'lucide-react';

const AchievementGallery = () => {
  return (
    <section className="bg-white dark:bg-[#2d2a1a] rounded-xl p-8 shadow-sm border border-[#e7e3cf] dark:border-[#3a3625]">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold">Achievement Collection</h3>
        <button className="text-sm font-bold text-primary hover:underline">View All 24</button>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {/* Unlocked Badges */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 text-[#221f10]">
            <BookOpen className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold">Grammar Master</p>
            <p className="text-[10px] opacity-60 italic">Level 3</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 text-[#221f10]">
            <Sun className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold">Early Bird</p>
            <p className="text-[10px] opacity-60 italic">Streak 7</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/20 text-[#221f10]">
            <ScrollText className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold">100 Words</p>
            <p className="text-[10px] opacity-60 italic">Nov 2023</p>
          </div>
        </div>

        {/* Locked Badges */}
        <div className="flex flex-col items-center text-center gap-3 opacity-30 grayscale">
          <div className="w-16 h-16 border-2 border-dashed border-[#e7e3cf] dark:border-[#3a3625] rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold">Perfect Score</p>
            <p className="text-[10px] italic">Locked</p>
          </div>
        </div>
        
        <div className="flex flex-col items-center text-center gap-3 opacity-30 grayscale">
          <div className="w-16 h-16 border-2 border-dashed border-[#e7e3cf] dark:border-[#3a3625] rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold">Polyglot</p>
            <p className="text-[10px] italic">Locked</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementGallery;