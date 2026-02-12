// src/components/lookup/WordHeader.jsx
import React, { useRef } from 'react';
import { Volume2, Bookmark, Share2 } from 'lucide-react';

const WordHeader = ({ word, romaji, level, type, audio }) => {

  const handlePlayAudio = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="px-6 md:px-10">
      {/* Header Info */}
      <div className="flex flex-wrap justify-between items-end gap-3 border-b border-[#f3f1e7] dark:border-[#3a351d] pb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-4">
            <p className="text-[#1b190d] dark:text-white text-5xl font-black leading-tight tracking-[-0.033em]">
              {word}
            </p>
            <button
              onClick={() => handlePlayAudio(word)}
              disabled={!audio}
              className="flex items-center justify-center size-10 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors disabled:opacity-50"
            >
              <Volume2 className="w-5 h-5" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-primary/20 text-[#181711] dark:text-primary text-xs font-bold uppercase tracking-wider rounded-full border border-primary/30">{level}</span>
            <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-full border border-zinc-200 dark:border-zinc-700">{type}</span>
            <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-bold uppercase tracking-wider rounded-full border border-zinc-200 dark:border-zinc-700">[{romaji}]</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#f3f1e7] dark:border-[#3a351d] text-sm font-medium hover:bg-white dark:hover:bg-[#2d2915] text-[#1b190d] dark:text-white">
            <Bookmark className="w-4 h-4" /> Save
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#f3f1e7] dark:border-[#3a351d] text-sm font-medium hover:bg-white dark:hover:bg-[#2d2915] text-[#1b190d] dark:text-white">
            <Share2 className="w-4 h-4" /> Share
          </button>
        </div>
      </div>

    </div>
  );
};

export default WordHeader;