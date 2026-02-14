// src/components/library/DeckCard.jsx
import React from 'react';
import { Play, Bookmark, CheckSquare, SquarePen } from 'lucide-react';

const DeckCard = ({
  title,
  description,
  level,          // "Beginner", "Intermediate", "Advanced"
  totalWords,
  learnedWords,
  icon: Icon,     // Lucide Icon Component
  iconColorClass, // Class màu nền icon (VD: "bg-blue-400/20 text-blue-400")
  onStudy,
  onEdit,
}) => {
  // Tính phần trăm
  const progress = Math.round((learnedWords / totalWords) * 100);
  const isCompleted = progress === 100;

  // Màu badge theo level
  const getLevelColor = (lvl) => {
    switch (lvl) {
      case 'Intermediate': return 'bg-orange-400/20 text-orange-400';
      case 'Advanced': return 'bg-red-400/20 text-red-400';
      default: return 'bg-primary/20 text-primary'; // Beginner
    }
  };

  return (
    <div className="group flex flex-col bg-[#484223]/10 border border-[#484223]/20 hover:border-primary/40 rounded-2xl p-5 transition-all hover:translate-y-[-4px] hover:shadow-xl hover:shadow-primary/5 h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${iconColorClass}`}>
          <Icon className="w-8 h-8" />
        </div>
        <button onClick={onEdit} className="text-[#c9c092] hover:text-primary transition-colors">
          <SquarePen className="w-6 h-6" />
        </button>
      </div>

      {/* Info */}
      <div className="mb-6 flex-1">
        <div className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${getLevelColor(level)}`}>
          {level}
        </div>
        <h3 className="text-xl font-bold dark:text-white text-background-dark">
          {title}
        </h3>
        <p className="text-sm text-[#c9c092] mt-1">
          {description}
        </p>
      </div>

      {/* Footer & Progress */}
      <div className="mt-auto">
        <div className="flex items-center justify-between text-xs font-bold text-[#c9c092] mb-2">
          <span>Progress</span>
          <span className={isCompleted ? "text-green-500" : "text-primary"}>
            {learnedWords}/{totalWords} words
          </span>
        </div>

        <div className="w-full h-2 bg-[#484223]/30 rounded-full overflow-hidden mb-5">
          <div
            className={`h-full transition-all duration-500 ${isCompleted ? 'bg-green-500' : 'bg-primary'}`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <button
          onClick={onStudy}
          className={`w-full py-3 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 group-hover:text-background-dark ${isCompleted
            ? 'bg-[#484223] group-hover:bg-green-500 text-white'
            : 'bg-[#484223] group-hover:bg-primary text-white'
            }`}
        >
          {isCompleted ? <CheckSquare className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          {isCompleted ? 'Review Deck' : 'Study Now'}
        </button>
      </div>
    </div>
  );
};

export default DeckCard;