// src/components/reading/QuizSidebar.jsx
import React from 'react';
import { HelpCircle, CheckCircle2, Send } from 'lucide-react';

const QuestionCard = ({ id, question, options }) => {
  return (
    <div className="p-5 rounded-xl bg-white dark:bg-[#2d2a1a] shadow-sm border border-black/5 dark:border-white/5">
      <p className="text-xs font-bold text-[#888263] mb-2 uppercase tracking-wider">Question {id}</p>
      <p className="font-medium text-[#181711] dark:text-white mb-4 leading-snug text-lg">
        {question}
      </p>
      <div className="space-y-3">
        {options.map((opt, idx) => (
          <label
            key={idx}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all group ${opt.isCorrect
              ? 'border-primary bg-primary/5'
              : 'border-black/5 dark:border-white/10 hover:bg-background-light dark:hover:bg-white/5'
              }`}
          >
            <input
              type="radio"
              name={`q${id}`}
              className="w-4 h-4 text-primary focus:ring-primary border-gray-300"
              defaultChecked={opt.isCorrect}
            />
            <span className={`text-sm ${opt.isCorrect ? 'font-semibold text-[#181711] dark:text-primary' : 'text-[#4d4a3e] dark:text-[#ccc]'}`}>
              {opt.text}
            </span>
            {opt.isCorrect && <CheckCircle2 className="ml-auto text-primary w-5 h-5" />}
          </label>
        ))}
      </div>
    </div>
  );
};

const QuizSidebar = () => {
  // Mock Data
  const questions = [
    {
      id: 1,
      question: "광장시장은 몇 년도에 설립되었나요?",
      options: [
        { text: "1895년", isCorrect: false },
        { text: "1905년", isCorrect: true },
        { text: "1945년", isCorrect: false }
      ]
    },
    {
      id: 2,
      question: "광장시장에서 가장 유명한 음식은 무엇인가요?",
      options: [
        { text: "불고기와 냉면", isCorrect: false },
        { text: "빈대떡과 마약김밥", isCorrect: true }
      ]
    }
  ];

  return (
    <aside className="w-full lg:w-[35%] overflow-y-auto p-4 custom-scrollbar bg-[#fcfbf8] dark:bg-black/20 border-l border-black/5 dark:border-white/5">

      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="text-primary w-6 h-6" />
        <h4 className="text-xl font-bold text-[#181711] dark:text-white">Comprehension Quiz</h4>
      </div>

      <div className="space-y-8 pb-20 max-h-[calc(100vh-150px)] overflow-y-auto">
        {questions.map((q) => (
          <QuestionCard key={q.id} {...q} />
        ))}
      </div>
      {/* Action Buttons */}
      <div className="pt-4 flex flex-col gap-3">
        <button className="w-full bg-primary hover:bg-primary/90 text-background-dark font-bold py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 active:scale-[0.98]">
          <Send className="w-5 h-5" />
          Submit Lesson
        </button>
        <button className="w-full bg-transparent border-2 border-[#888263]/20 hover:border-primary/50 text-[#888263] hover:text-primary font-semibold py-3 rounded-xl transition-all text-sm">
          Save for later
        </button>
      </div>

    </aside>
  );
};

export default QuizSidebar;