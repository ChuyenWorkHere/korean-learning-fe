// src/components/reader/SideAssistant.jsx
import React from 'react';
import { Volume2, PlusCircle, BookOpen } from 'lucide-react';

const VocabularyItem = ({ word, meaning }) => (
  <div className="group flex items-center justify-between p-3 rounded-lg bg-white dark:bg-[#181711] border border-transparent hover:border-primary/40 transition-all cursor-pointer shadow-sm">
    <div>
      <p className="font-bold text-lg font-serif-kr text-slate-900 dark:text-white">{word}</p>
      <p className="text-sm text-slate-500">{meaning}</p>
    </div>
    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="text-slate-400 hover:text-primary transition-colors">
        <Volume2 className="w-5 h-5" />
      </button>
      <button className="text-slate-400 hover:text-primary transition-colors">
        <PlusCircle className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const SideAssistant = () => {
  return (
    <aside className="hidden lg:flex w-[30%] border-l border-primary/10 bg-primary/5 dark:bg-[#181711]/50 flex-col gap-6 overflow-y-auto p-6 h-full">
      
      {/* Context Translation Card */}
      <div>
        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Translation
        </h3>
        <div className="bg-white dark:bg-[#181711] border border-primary/20 p-5 rounded-xl shadow-sm">
          <p className="text-xs text-slate-400 mb-2 italic">Current Selection:</p>
          <p className="text-lg font-serif-kr mb-3 text-slate-800 dark:text-slate-200">
            "서울의 아침은 언제나 조용하게 시작됩니다."
          </p>
          <div className="h-px bg-primary/10 my-3"></div>
          <p className="text-base text-slate-700 dark:text-slate-300 font-medium">
            "Morning in Seoul always begins quietly."
          </p>
          <button className="mt-4 flex items-center gap-2 text-xs font-bold text-primary hover:underline">
            <Volume2 className="w-4 h-4" />
            Listen to sentence
          </button>
        </div>
      </div>

      {/* Vocabulary List */}
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xs font-bold text-primary uppercase tracking-widest">Key Words</h3>
          <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">5 New</span>
        </div>
        
        <div className="flex flex-col gap-3 pb-6">
          <VocabularyItem word="서울" meaning="Seoul (City)" />
          <VocabularyItem word="공기" meaning="Air / Atmosphere" />
          <VocabularyItem word="준비하다" meaning="To prepare" />
          <VocabularyItem word="지하철" meaning="Subway" />
          <VocabularyItem word="햇살" meaning="Sunlight" />
        </div>
      </div>
    </aside>
  );
};

export default SideAssistant;