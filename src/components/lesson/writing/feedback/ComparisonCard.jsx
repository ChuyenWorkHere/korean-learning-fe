// src/components/writing/feedback/ComparisonCard.jsx
import React from 'react';
import { User, Sparkles } from 'lucide-react';

const ComparisonCard = ({ userText, userMeaning, aiText, aiMeaning }) => {
  return (
    <div className="bg-background-light dark:bg-[#2a2719] border border-primary/10 rounded-xl shadow-xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-primary/10">
        
        {/* User Input */}
        <div className="p-8 space-y-4">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <User className="w-5 h-5" />
            <h3 className="font-medium text-sm uppercase tracking-wider">Your Translation</h3>
          </div>
          <div className="text-3xl lg:text-4xl leading-relaxed text-slate-800 dark:text-slate-200">
            {userText}
          </div>
          <p className="text-slate-500 text-sm italic mt-2">"{userMeaning}"</p>
        </div>

        {/* Corrected */}
        <div className="p-8 space-y-4 bg-primary/[0.02]">
          <div className="flex items-center gap-2 text-[#4ade80]">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-medium text-sm uppercase tracking-wider">Native & Corrected</h3>
          </div>
          <div className="text-3xl lg:text-4xl leading-relaxed text-slate-800 dark:text-slate-200">
            {aiText}
          </div>
          <p className="text-slate-500 text-sm italic mt-2">"{aiMeaning}"</p>
        </div>

      </div>
    </div>
  );
};

export default ComparisonCard;