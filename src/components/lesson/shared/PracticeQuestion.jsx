import React from 'react';
import { CheckCircle2, XCircle, AlertCircle, Circle } from 'lucide-react';

const PracticeQuestion = ({
  id,
  questionText,
  options, // Mảng 4 đáp án [{id, text, isCorrect}]
  selectedOptionId, // ID đáp án user đang chọn
  onSelectOption, // Hàm xử lý khi click chọn đáp án
  explanation,
  isSubmitted // Trạng thái đã nộp bài chưa
}) => {

  // Xác định câu hỏi này đúng hay sai sau khi nộp
  const isCorrect = isSubmitted && options.find(o => o.id === selectedOptionId)?.isCorrect;
  const correctAnswerText = options.find(o => o.isCorrect)?.text;

  // Logic màu sắc giao diện bọc ngoài (Giữ nguyên thiết kế cũ của bạn)
  let theme;
  if (!isSubmitted) {
    theme = {
      border: 'border-gray-200 dark:border-gray-700',
      bgBadge: 'bg-gray-200 dark:bg-gray-700',
      textBadge: 'To do',
    };
  } else {
    theme = isCorrect
      ? {
        border: 'border-green-500',
        bgBadge: 'bg-green-500',
        textBadge: 'Correct',
      }
      : {
        border: 'border-red-500',
        bgBadge: 'bg-red-500',
        textBadge: 'Incorrect',
      };
  }

  return (
    <div className={`bg-white dark:bg-[#2d2a1a] p-6 rounded-2xl border-2 ${theme.border} shadow-lg relative overflow-hidden transition-all duration-300`}>

      {/* Result Badge */}
      <div className={`absolute top-0 right-0 px-4 py-1 ${theme.bgBadge} ${!isSubmitted ? 'text-gray-500 dark:text-gray-300' : 'text-white'} text-[10px] font-black uppercase tracking-widest rounded-bl-xl transition-colors`}>
        {theme.textBadge}
      </div>

      <div className="flex flex-col gap-4">
        {/* Câu hỏi động */}
        <p className="text-base md:text-lg font-medium text-[#1b190d] dark:text-[#f3f1e7] mb-4">
          {questionText}
        </p>

        {/* Danh sách đáp án động */}
        <div className="flex flex-col gap-3">
          {options.map((option) => {
            const isSelected = selectedOptionId === option.id;

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

        {/* Feedback Section (Giữ nguyên hộp màu xanh/đỏ cũ của bạn) */}
        {isSubmitted && (
          isCorrect ? (
            <div className="flex items-center justify-between mt-2 animate-in fade-in slide-in-from-top-2">
              <p className="text-sm opacity-60 text-gray-500 dark:text-gray-400">"{explanation}"</p>
              <span className="text-sm text-green-500 font-bold flex items-center gap-1">
                Well done!
              </span>
            </div>
          ) : (
            <div className="flex flex-col gap-2 p-4 mt-2 bg-red-500/5 rounded-xl border border-red-500/10 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-xs font-black text-red-500 uppercase tracking-widest">Correct Answer:</span>
              </div>
              <p className="text-lg font-bold text-green-500">{correctAnswerText}</p>
              <p className="text-xs opacity-60 italic text-gray-500 dark:text-gray-400 mt-1">{explanation}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PracticeQuestion;