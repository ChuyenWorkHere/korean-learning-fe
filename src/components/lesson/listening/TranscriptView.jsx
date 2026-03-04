import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react'; // Đổi icon sang mũi tên lên/xuống
import { timeToSeconds } from '../../../utils/helpers';

const TranscriptView = ({ transcript, currentTime = 0 }) => {
  // Đổi tên state cho đúng ngữ nghĩa: isExpanded (Đang mở rộng)
  const [isExpanded, setIsExpanded] = useState(true);

  // Dùng để auto-scroll
  const containerRef = useRef(null);
  const activeRowRef = useRef(null);

  // 1. TÍNH TOÁN DÒNG ĐANG ACTIVE DỰA VÀO THỜI GIAN
  let activeIndex = -1;
  for (let i = 0; i < transcript.length; i++) {
    const currentLineTime = timeToSeconds(transcript[i].time);
    // Thời gian của câu tiếp theo. Nếu là câu cuối thì thời gian kết thúc coi như Vô cực
    const nextLineTime = i + 1 < transcript.length ? timeToSeconds(transcript[i + 1].time) : Infinity;

    if (currentTime >= currentLineTime && currentTime < nextLineTime) {
      activeIndex = i;
      break;
    }
  }

  // 2. AUTO-SCROLL KHI ĐỔI CÂU
  useEffect(() => {
    if (activeRowRef.current && containerRef.current && isExpanded) {
      
      const container = containerRef.current;
      const activeRow = activeRowRef.current;

      const scrollPosition = activeRow.offsetTop - (container.clientHeight / 2) + (activeRow.clientHeight / 2);

      container.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeIndex, isExpanded]);

  return (
    <div className="w-full bg-white dark:bg-[#2d2916] rounded-2xl border border-[#eecd2b]/20 shadow-sm overflow-hidden transition-all">

      {/* HEADER CỦA TRANSCRIPT (Luôn hiển thị) */}
      <div
        // Bấm vào khu vực Header cũng có thể đóng/mở
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-[#f8f8f6] dark:hover:bg-[#3a3621]/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-[#1b190d] dark:text-[#f3f1e7]">Transcript</h3>


        </div>

        {/* Nút Toggle thu gọn/mở rộng */}
        <button className="p-1 rounded-md text-[#9a8d4c] hover:bg-[#eecd2b]/10 hover:text-primary transition-all">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* PHẦN NỘI DUNG (Ẩn/Hiện bằng CSS Grid transition cực mượt) */}
      <div className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          {/* Gắn containerRef để quản lý scroll */}
          <div ref={containerRef} className="relative px-4 pb-4 md:px-6 md:pb-6 space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2 border-t border-[#eecd2b]/10 scroll-smooth">
            {transcript.map((row, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={row.id || index}
                  // Gắn ref vào dòng đang active
                  ref={isActive ? activeRowRef : null}
                  className={`flex gap-3 md:gap-4 p-3 rounded-xl transition-all duration-300 border-l-4 ${isActive
                    ? 'bg-[#eecd2b]/10 border-primary shadow-[inset_0_0_20px_rgba(238,205,43,0.05)]' // Thêm shadow nhẹ cho đẹp
                    : 'border-transparent hover:bg-[#f8f8f6] dark:hover:bg-[#3a3621]/50'
                    }`}
                >
                  <div className="flex flex-col items-center shrink-0 w-12 pt-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${isActive ? 'bg-primary text-black' : 'bg-[#f3f1e7] dark:bg-[#3a3621] text-[#5e5836] dark:text-[#f3f1e7]/70'
                      }`}>
                      {row.speaker || "A"}
                    </div>
                    <span className="text-[10px] font-mono text-[#9a8d4c] mt-1">{row.time}</span>
                  </div>

                  <div className="flex-1">
                    <p className={`text-base md:text-lg font-bold transition-all duration-300 ${isActive ? 'text-[#1b190d] dark:text-white' : 'text-[#1b190d]/80 dark:text-[#f3f1e7]/60' // Text mờ hơn khi không active
                      }`}>
                      {row.ko}
                    </p>
                    {/* Render bản dịch nếu có */}
                    {row.en && (
                      <p className={`text-sm mt-1 transition-all duration-300 ${isActive ? 'text-[#5e5836] dark:text-[#f3f1e7]/80' : 'text-[#9a8d4c] dark:text-[#f3f1e7]/40'
                        }`}>
                        {row.en}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default TranscriptView;