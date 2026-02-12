import React, { useState } from 'react';
import { MessageCircle, ArrowRight, Eye, ChevronDown, ChevronUp } from 'lucide-react';

const SenseCard = ({ index, data, highlightWord }) => {
  
  // Trạng thái mở rộng ví dụ
  const [isExpanded, setIsExpanded] = useState(false);
  const INITIAL_COUNT = 3; // Số lượng ví dụ hiển thị mặc định

  // Xử lý dữ liệu ví dụ (API có thể trả về Object hoặc Array)
  const allExamples = Array.isArray(data.example_info)
    ? data.example_info
    : (data.example_info ? [data.example_info] : []);

  const hasMore = allExamples.length > INITIAL_COUNT;
  const displayedExamples = isExpanded ? allExamples : allExamples.slice(0, INITIAL_COUNT);

  // Helper: Highlight từ khóa trong câu ví dụ
  const renderKorean = (sentence) => {
    if (!highlightWord) return sentence;
    const parts = sentence.split(highlightWord);
    return (
      <>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            {part}
            {i < parts.length - 1 && (
              <span className="bg-primary/40 px-1 rounded font-bold text-[#181711] dark:text-white">
                {highlightWord}
              </span>
            )}
          </React.Fragment>
        ))}
      </>
    );
  };

  return (
    <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 md:p-8">

        {/* Header: Meaning Index & POS */}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-[#181711] dark:text-white">
            {index}. {data.translation.trans_word} / <span className="text-primary font-black">{highlightWord}</span>
          </h3>
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-bold rounded uppercase">
            {data.pos || 'Word'}
          </span>
        </div>

        {/* Detailed Description */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {data.translation.trans_dfn}
        </p>

        {/* Examples Section */}
        {allExamples.length > 0 && (
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4 space-y-4">
            <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 border-b border-gray-200 dark:border-gray-700 pb-2">
              Example Sentences ({allExamples.length})
            </h4>

            <div className="space-y-6">
              {displayedExamples.map((ex, idx) => (
                <div key={idx} className="flex gap-4 group animate-in fade-in slide-in-from-top-1 duration-300">
                  <MessageCircle className="w-5 h-5 text-primary mt-1 shrink-0 hidden md:block opacity-60" />
                  <div>
                    <p className="text-xl leading-relaxed text-[#181711] dark:text-gray-100 font-medium">
                      {renderKorean(ex.example)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer: Stats & More */}
      <div className="bg-gray-50 dark:bg-gray-800 px-8 py-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
          <Eye className="w-4 h-4" />
          <span>4.5k learners saved this</span>
        </div>

        {hasMore && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-semibold text-primary hover:text-[#dcb914] flex items-center gap-1 transition-all"
          >
            {isExpanded ? (
              <>Thu gọn <ChevronUp className="w-4 h-4" /></>
            ) : (
              <>Xem thêm {allExamples.length - INITIAL_COUNT} ví dụ <ChevronDown className="w-4 h-4" /></>
            )}
          </button>
        )}
      </div>
    </section>
  );
};

export default SenseCard;