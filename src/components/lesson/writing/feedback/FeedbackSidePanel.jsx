// src/components/writing/feedback/FeedbackSidePanel.jsx
import React from 'react';
import ScoreBadge from './ScoreBadge';
import { Sparkles, SparklesIcon } from 'lucide-react';

const FeedbackSidePanel = () => {
  return (
    <div className="space-y-6">
      <ScoreBadge performanceText="Great Attempt!" score={85} />
      
      {/* Native Nuance Card */}
      <div className="bg-primary/10 dark:bg-primary/[0.03] border border-primary rounded-xl p-8 relative overflow-hidden group">
        <div className="absolute -right-4 -top-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
          <SparklesIcon className="w-32 h-32 text-primary" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <SparklesIcon className="w-6 h-6 text-primary" />
            <h3 className="font-bold text-xl">Native Nuance</h3>
          </div>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
            While Koreans often omit particles in spoken conversation, including <span className="font-bold">~를</span> in written exercises demonstrates a strong grasp of grammar and makes your writing look more professional.
          </p>
        </div>
      </div>
  
    </div>
  );
};

export default FeedbackSidePanel;