// src/components/listening/HintBox.jsx
import React, { useState } from 'react';
import { Lightbulb } from 'lucide-react';

const HintBox = ({ hintText }) => {
  const [showTranslation, setShowTranslation] = useState(false);

  return (
    <div className="mt-4 p-6 md:p-8 bg-primary/10 border border-primary/30 rounded-2xl flex items-start gap-4 md:gap-6">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
        <Lightbulb className="text-primary w-6 h-6 md:w-8 md:h-8" />
      </div>
      <div>
        <h4 className="font-bold text-lg text-[#1b190d] dark:text-white">Need a hint?</h4>
        <p className="text-[#9a8d4c] mt-1 text-base leading-relaxed">
          {hintText}
        </p>
        <button 
          onClick={() => setShowTranslation(!showTranslation)}
          className="mt-3 text-primary text-sm font-bold underline underline-offset-4 decoration-2 decoration-primary/30 hover:decoration-primary transition-all"
        >
          {showTranslation ? "Hide translation" : "Show partial translation"}
        </button>
        
        {showTranslation && (
          <p className="mt-2 text-sm text-[#1b190d] dark:text-white font-medium animate-in fade-in slide-in-from-top-1">
            Translation: "Are you free this weekend?"
          </p>
        )}
      </div>
    </div>
  );
};

export default HintBox;