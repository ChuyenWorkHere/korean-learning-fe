// src/components/reader/AudioControls.jsx
import React from 'react';
import { Play, Pause, RotateCcw, RotateCw, Settings } from 'lucide-react';

const AudioControls = ({ isPlaying, onTogglePlay }) => {
  return (
    <div className="flex items-center gap-4 bg-primary/5 px-4 py-2 rounded-full border border-primary/10">
      <button className="p-1 hover:text-primary transition-colors" title="Rewind 10s">
        <RotateCcw className="w-4 h-4" />
      </button>
      
      <button 
        onClick={onTogglePlay}
        className="w-8 h-8 bg-primary text-[#1b190d] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
      >
        {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
      </button>
      
      <button className="p-1 hover:text-primary transition-colors" title="Forward 10s">
        <RotateCw className="w-4 h-4" />
      </button>
      
      {/* Progress Bar Giả lập */}
      <div className="w-32 md:w-48 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden relative cursor-pointer group">
        <div className="absolute left-0 top-0 h-full bg-primary w-1/3 group-hover:bg-primary/80"></div>
      </div>
      
      <span className="text-xs font-mono w-10 text-slate-500">0:42</span>
      
      <button className="px-2 py-0.5 text-[10px] font-bold bg-primary/20 text-primary rounded border border-primary/30 hover:bg-primary/30 transition-colors">
        1.0x
      </button>
    </div>
  );
};

export default AudioControls;