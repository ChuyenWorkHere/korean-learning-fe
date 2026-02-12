// src/components/listening/AudioPlayer.jsx
import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Volume2, Settings } from 'lucide-react';

const AudioPlayer = ({ title, subtitle, duration = "0:45", current = "0:18" }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const toggleSpeed = () => {
    setSpeed(prev => prev === 1 ? 0.75 : 1);
  };

  return (
    <div className="w-full bg-white dark:bg-[#1b190d] rounded-2xl shadow-sm border border-[#f3f1e7] dark:border-[#3a3621] p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center">
      
      {/* Play Button */}
      <button 
        onClick={togglePlay}
        className="flex shrink-0 items-center justify-center rounded-full w-16 h-16 md:w-20 md:h-20 bg-primary text-black hover:scale-105 transition-transform shadow-lg"
      >
        {isPlaying ? (
          <Pause className="w-8 h-8 md:w-10 md:h-10 fill-current" />
        ) : (
          <Play className="w-8 h-8 md:w-10 md:h-10 fill-current ml-1" />
        )}
      </button>

      {/* Controls & Progress */}
      <div className="flex-1 flex flex-col gap-3 w-full">
        
        {/* Top Row: Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <p className="text-lg md:text-xl font-bold leading-tight text-[#1b190d] dark:text-white">{title}</p>
            <p className="text-[#9a8d4c] text-sm font-medium">{subtitle}</p>
          </div>
          
          <div className="flex gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-background-light dark:bg-[#3a3621] text-xs font-bold hover:bg-primary/20 transition-colors text-[#1b190d] dark:text-white">
              <RotateCcw className="w-4 h-4" /> -5s
            </button>
            <button 
              onClick={toggleSpeed}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-background-light dark:bg-[#3a3621] text-xs font-bold hover:bg-primary/20 transition-colors text-[#1b190d] dark:text-white"
            >
              <Settings className="w-4 h-4" /> {speed}x
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-2">
          <div className="group relative flex h-3 w-full cursor-pointer items-center rounded-full bg-[#f3f1e7] dark:bg-[#3a3621]">
            <div className="h-full w-[45%] rounded-full bg-primary relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary border-4 border-white dark:border-[#1b190d] shadow-md"></div>
            </div>
          </div>
          <div className="flex items-center justify-between mt-2 text-[#9a8d4c] text-xs font-bold">
            <p>{current}</p>
            <p>{duration}</p>
          </div>
        </div>
      </div>

      {/* Volume Control (Desktop Only) */}
      <div className="hidden md:flex flex-col items-center gap-3 px-4 border-l border-[#f3f1e7] dark:border-[#3a3621]">
        <Volume2 className="text-[#9a8d4c] w-6 h-6" />
        <div className="h-20 w-2 rounded-full bg-[#f3f1e7] dark:bg-[#3a3621] relative overflow-hidden">
          <div className="absolute bottom-0 w-full h-[70%] bg-primary rounded-full"></div>
        </div>
      </div>

    </div>
  );
};

export default AudioPlayer;