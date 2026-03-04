import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

// Cập nhật: Thêm question và options vào params
const QuizView = ({ question, options, selectedOption, onSelectOption }) => {
  return (
    <div className="w-full bg-white dark:bg-[#2d2916] p-6 rounded-2xl border border-[#eecd2b]/20 shadow-sm">
      {/* Câu hỏi động */}
      <p className="text-base md:text-lg font-medium text-[#1b190d] dark:text-[#f3f1e7] mb-4">
        {question}
      </p>

      {/* Danh sách đáp án động */}
      <div className="flex flex-col gap-3">
        {options.map((option) => {
          const isSelected = selectedOption === option.id;

          return (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id)}
              className={`flex items-center gap-3 w-full p-4 rounded-xl text-left transition-all border-2 ${isSelected
                  ? 'bg-primary/5 border-primary shadow-[0_4px_0_0_#eecd2b30] translate-y-[2px]'
                  : 'bg-white dark:bg-[#2d2916] border-[#eecd2b]/20 hover:border-primary/50 hover:bg-[#f8f8f6] dark:hover:bg-[#3a3621] shadow-[0_4px_0_0_#eecd2b20] hover:shadow-[0_4px_0_0_#eecd2b40]'
                }`}
            >
              <div className={`shrink-0 transition-colors ${isSelected ? 'text-primary' : 'text-[#d6d2b3] dark:text-[#4a452d]'}`}>
                {isSelected ? (
                  <CheckCircle2 className="w-6 h-6 fill-primary/20" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>

              <span className={`text-base md:text-lg font-medium ${isSelected ? 'text-[#1b190d] dark:text-white' : 'text-[#5e5836] dark:text-[#f3f1e7]/80'
                }`}>
                {option.text}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuizView;