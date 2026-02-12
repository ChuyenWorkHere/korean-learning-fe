// src/components/listening/PracticeProgress.jsx
import React from 'react';
import { Check } from 'lucide-react';

const PracticeProgress = ({ total = 5, current = 3 }) => {
  // Tạo mảng các bước dựa trên tổng số câu
  const steps = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="hidden xl:flex flex-col gap-6 sticky top-24 h-fit pr-8 border-r border-[#f3f1e7] dark:border-[#3a3621]">
      {steps.map((step) => {
        // Logic trạng thái
        const isCompleted = step < current;
        const isCurrent = step === current;

        // Style cho đã hoàn thành (Xanh)
        if (isCompleted) {
          return (
            <div key={step} className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md transition-all">
              <Check className="w-6 h-6" />
            </div>
          );
        }

        // Style cho câu hiện tại (Vàng - To hơn)
        if (isCurrent) {
          return (
            <div key={step} className="w-14 h-14 -ml-1 rounded-full bg-primary text-[#1b190d] flex items-center justify-center shadow-lg font-bold text-xl ring-4 ring-primary/20 scale-110 transition-all">
              {step}
            </div>
          );
        }

        // Style cho câu chưa làm (Xám)
        return (
          <div key={step} className="w-12 h-12 rounded-full bg-[#f3f1e7] dark:bg-[#3a3621] text-[#9a8d4c] flex items-center justify-center font-bold shadow-sm transition-all">
            {step}
          </div>
        );
      })}
    </div>
  );
};

export default PracticeProgress;