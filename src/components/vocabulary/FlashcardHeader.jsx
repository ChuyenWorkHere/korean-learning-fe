// src/components/study/FlashcardHeader.jsx
import React from 'react';
import ProgressBar from '../common/ProgressBar';

const FlashcardHeader = ({ title, subtitle, currentIndex, totalCount }) => {
    // Tính phần trăm tiến độ
    const progressPercentage = Math.round((currentIndex / totalCount) * 100);

    return (
        <div className="w-full max-w-[640px] flex flex-col gap-3 mb-10">
            <div className="flex justify-between items-end">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-bold text-[#1b190d] dark:text-[#f3f1e7]">
                        {title}
                    </h1>
                    <p className="text-[#9a8d4c] text-sm mt-1">
                        {subtitle}
                    </p>
                </div>
                <div className="text-right">
                    <p className="text-primary text-3xl font-bold leading-none">
                        {currentIndex} / {totalCount}
                    </p>
                    <p className="text-[#9a8d4c] text-[10px] uppercase tracking-widest font-bold mt-1">
                        Review Progress
                    </p>
                </div>
            </div>

            {/* Progress Bar Container */}
            <ProgressBar progress={progressPercentage} />
        </div>
    );
};

export default FlashcardHeader;