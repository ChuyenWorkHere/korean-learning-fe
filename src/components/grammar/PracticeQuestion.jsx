// src/components/grammar/PracticeQuestion.jsx
import React from 'react';
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

const PracticeQuestion = ({ 
  id, 
  verb, 
  questionText, // HTML string để highlight lỗi sai
  userAnswer, 
  isCorrect, 
  correctAnswer, 
  explanation 
}) => {
  
  // Logic màu sắc giao diện
  const theme = isCorrect 
    ? {
        border: 'border-green-500',
        bgBadge: 'bg-green-500',
        textBadge: 'Correct',
        bgInput: 'bg-green-500/5',
        textInput: 'text-green-500',
        icon: <CheckCircle2 className="w-8 h-8 text-green-500 fill-current/20" />
      }
    : {
        border: 'border-red-500',
        bgBadge: 'bg-red-500',
        textBadge: 'Incorrect',
        bgInput: 'bg-red-500/5',
        textInput: 'text-red-500',
        icon: <XCircle className="w-8 h-8 text-red-500 fill-current/20" />
      };

  return (
    <div className={`bg-white dark:bg-[#2d2a1a] p-6 rounded-2xl border-2 ${theme.border} shadow-lg relative overflow-hidden transition-all`}>
      
      {/* Result Badge */}
      <div className={`absolute top-0 right-0 px-4 py-1 ${theme.bgBadge} text-white text-[10px] font-black uppercase tracking-widest rounded-bl-xl`}>
        {theme.textBadge}
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-primary uppercase tracking-widest">Question {id}</span>
          <span className="text-xs opacity-50 italic text-gray-500 dark:text-gray-400">{verb}</span>
        </div>

        {/* Question Text */}
        <p className="text-xl font-medium text-[#1b190d] dark:text-white">
          <span dangerouslySetInnerHTML={{ __html: questionText }} />
        </p>

        {/* User Answer Input (Readonly view) */}
        <div className="relative">
          <input 
            type="text" 
            value={userAnswer} 
            readOnly
            className={`w-full ${theme.bgInput} border-2 ${theme.border} rounded-xl p-4 ${theme.textInput} font-bold outline-none`}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {theme.icon}
          </div>
        </div>

        {/* Feedback Section */}
        {isCorrect ? (
          <div className="flex items-center justify-between">
            <p className="text-sm opacity-60 text-gray-500 dark:text-gray-400">"{explanation}"</p>
            <span className="text-sm text-green-500 font-bold flex items-center gap-1">
              Well done! 🎉
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-2 p-4 bg-red-500/5 rounded-xl border border-red-500/10">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-xs font-black text-red-500 uppercase tracking-widest">Correct Answer:</span>
            </div>
            <p className="text-lg font-bold text-green-500">{correctAnswer}</p>
            <p className="text-xs opacity-60 italic text-gray-500 dark:text-gray-400 mt-1">{explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PracticeQuestion;