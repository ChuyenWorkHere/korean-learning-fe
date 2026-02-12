import React from 'react';
import { Search, SpellCheck, GitFork, Flag, Info, Flame, X } from 'lucide-react';

const WordNotFound = () => {
  
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 max-w-4xl mx-auto w-full animate-in fade-in duration-500">
      {/* Mascot Illustration */}
      <div className="mb-8 relative">
        <div className="w-64 h-64 bg-primary/10 rounded-full flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
          <div className="text-9xl mb-4 grayscale opacity-80 select-none">
            <img src="/images/bee.png" alt="" srcSet="" />
          </div>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-lg border border-slate-100 dark:border-white/10 flex items-center gap-2 whitespace-nowrap">
          <Info className="text-primary w-5 h-5" />
          <span className="text-sm font-bold italic tracking-tight dark:text-white">Eodiya? (Where is it?)</span>
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center max-w-lg mb-10">
        <h2 className="text-3xl font-bold mb-3 tracking-tight dark:text-white">
          Oops! We couldn't find that word.
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed">
          No results found. 
          Don't give up on your studies! Check your spelling or try a related word.
        </p>
      </div>
    </div>
  );
};

export default WordNotFound;