// src/components/study/Flashcard.jsx
import React from 'react';
import { RefreshCw, Languages } from 'lucide-react';

const Flashcard = ({
    frontContent,
    backContent,
    subLabel,
    isFlipped,
    onFlip
}) => {
    // Style chung cho cả 2 mặt thẻ (để tránh lặp lại code)
    const cardFaceStyle = `
        absolute w-full h-full backface-hidden
        bg-white dark:bg-[#2d2a1a] 
        rounded-[2rem] shadow-[0_30px_60px_-12px_rgba(0,0,0,0.08)] 
        border border-[#e7e3cf] dark:border-[#3d3a2a]
        flex items-center justify-center p-12
    `;

    return (
        <div
            className="relative w-full max-w-[640px] aspect-[4/3] perspective-1000 group cursor-pointer"
            onClick={onFlip}
        >
            <div className={`
                relative w-full h-full transition-all duration-500 transform-style-3d
                ${isFlipped ? 'rotate-y-180' : ''}
            `}>

                {/* --- MẶT TRƯỚC (FRONT FACE) --- */}
                <div className={`${cardFaceStyle}`}>
                    {/* Decorative Icon */}
                    <div className="absolute top-10 left-10 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Languages className="w-16 h-16" />
                    </div>

                    <div className="text-center">
                        <p className="text-4xl leading-tight text-[#1b190d] dark:text-white font-bold mb-4">
                            {frontContent}
                        </p>
                        <p className="text-[#9a8d4c] text-sm font-bold tracking-[0.3em] uppercase opacity-70">
                            {subLabel || "Vocabulary"}
                        </p>
                    </div>

                    {/* Nút lật (Hiển thị ở mặt trước) */}
                    <FlipButton isFlipped={isFlipped} />
                </div>

                {/* --- MẶT SAU (BACK FACE) --- */}
                {/* rotate-y-180: Vì mặt sau mặc định phải úp ngược so với mặt trước */}
                <div className={`${cardFaceStyle} rotate-y-180`}>
                    <div className="text-center">
                        <p className="text-4xl leading-tight text-[#1b190d] dark:text-white font-bold mb-4">
                            {backContent}
                        </p>
                        <p className="text-[#9a8d4c] text-sm font-bold tracking-[0.3em] uppercase opacity-70">
                            Meaning
                        </p>
                    </div>

                    {/* Nút lật (Hiển thị ở mặt sau) */}
                    <FlipButton isFlipped={isFlipped} />
                </div>

            </div>
        </div>
    );
};

// Tách nút Flip ra component nhỏ để tái sử dụng ở 2 mặt
const FlipButton = ({ isFlipped }) => (
    <button
        className="absolute bottom-10 right-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-primary text-[#1b190d] shadow-xl hover:shadow-primary/30 hover:-translate-y-1 transition-all z-10"
        onClick={(e) => e.stopPropagation()} // Chỉ cần ngăn chặn sự kiện nổi bọt, việc click thẻ cha đã xử lý flip rồi
    >
        <RefreshCw className={`w-8 h-8 transition-transform duration-700 ${isFlipped ? '-rotate-180' : 'group-hover:rotate-180'}`} />
    </button>
);

export default Flashcard;