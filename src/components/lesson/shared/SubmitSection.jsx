// src/components/lesson/shared/SubmitSection.jsx
import { CheckCircle2, ArrowRight, RotateCcw } from 'lucide-react'; // Đã thêm ArrowRight
import React from 'react';
import { PASSING_SCORE } from '../../admin/constants';

const SubmitSection = ({
  isSubmitted,
  onSubmit,
  progressPercent,
  correctCount,
  totalCount,
  onRetry,
  nextLessonId
}) => {

  const navigateToNextLesson = () => {
    if (nextLessonId) {
      window.location.href = `/lessons/${nextLessonId}`;
    }
  };
  const isPassed = progressPercent >= PASSING_SCORE;

  return isSubmitted ? (
    <>
      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4 mb-2">
          <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <span className="text-sm font-bold text-green-500">
            {progressPercent}% Complete
          </span>
        </div>
        {isPassed ? (
          <p className="text-sm font-medium text-green-600 dark:text-green-400">
            Great job! You answered {correctCount}/{totalCount} correctly. You can move to the next lesson.
          </p>
        ) : (
          <p className="text-sm font-medium text-red-500 dark:text-red-400">
            You scored {correctCount}/{totalCount}. You need at least {PASSING_SCORE}% to pass. Please try again!
          </p>
        )}
      </div>

      {isPassed ? (
        // Nút NEXT (Màu xanh / vàng) khi Đậu
        <button
          onClick={navigateToNextLesson}
          className="w-full md:w-[320px] h-14 md:h-16 bg-primary hover:bg-primary/90 text-[#1b190d] font-black rounded-2xl text-lg md:text-xl shadow-[0_6px_0_0_#c5a71c] hover:shadow-[0_4px_0_0_#c5a71c] hover:translate-y-0.5 active:shadow-none active:translate-y-1.5 transition-all flex items-center justify-center gap-3">
          Next Lesson
          <ArrowRight className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
        </button>
      ) : (
        <button
          onClick={onRetry}
          className="w-full md:w-[320px] h-14 md:h-16 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 font-black rounded-2xl text-lg md:text-xl border-2 border-red-200 dark:border-red-800 transition-all flex items-center justify-center gap-3 active:scale-95"
        >
          <RotateCcw className="w-6 h-6 md:w-8 md:h-8" strokeWidth={3} />
          Try Again
        </button>
      )}
    </>
  ) : (
    <button
      onClick={onSubmit}
      className="w-full md:w-[320px] h-14 md:h-16 bg-primary text-black font-bold text-lg md:text-xl rounded-2xl shadow-[0_6px_0_0_#c5a71c] hover:shadow-[0_4px_0_0_#c5a71c] hover:translate-y-0.5 active:shadow-none active:translate-y-1.5 transition-all flex items-center justify-center gap-3"
    >
      <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" />
      Check Answers
    </button>
  );
}

export default SubmitSection;