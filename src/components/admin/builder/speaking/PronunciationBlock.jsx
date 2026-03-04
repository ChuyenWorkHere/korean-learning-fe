import React from 'react';
import { Mic, Volume2 } from 'lucide-react';

const PronunciationBlock = ({ data, onChange }) => {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-[#5e5836] dark:text-[#f0ede4]/70">
          Nhập câu tiếng Hàn để học viên luyện phát âm. Hệ thống AI sẽ nghe và chấm điểm dựa trên câu gốc này.
        </p>
      </div>

      <div className="space-y-5">
        {/* Câu mục tiêu (Tiếng Hàn) */}
        <div>
          <label className="text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase tracking-widest mb-1 block">
            Target Phrase (Korean) *
          </label>
          <textarea
            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/30 rounded-lg px-4 py-3 text-lg focus:ring-1 focus:ring-[#eecd2b] outline-none font-bold text-[#1b190d] dark:text-white resize-y min-h-[80px]"
            placeholder="Ví dụ: 따뜻한 카페라떼 한 잔 주세요."
            value={data.koreanText || ''}
            onChange={(e) => onChange('koreanText', e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bản dịch (Tiếng Anh/Việt) */}
          <div>
            <label className="text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase tracking-widest mb-1 flex items-center gap-1">
              Translation / Meaning
            </label>
            <input
              type="text"
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-[#1b190d] dark:text-white"
              placeholder="Ví dụ: One warm cafe latte, please."
              value={data.englishText || ''}
              onChange={(e) => onChange('englishText', e.target.value)}
            />
          </div>

          {/* Hướng dẫn phát âm (Phonetic) */}
          <div>
            <label className="text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase tracking-widest mb-1 flex items-center gap-1">
              Pronunciation Guide (Optional)
            </label>
            <input
              type="text"
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-[#1b190d] dark:text-white"
              placeholder="Ví dụ: [따뜨탄 카페라떼 한 잔 주세용]"
              value={data.phonetic || ''}
              onChange={(e) => onChange('phonetic', e.target.value)}
            />
          </div>
        </div>

        {/* Cài đặt AI chấm điểm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#eecd2b]/10">
          <div>
            <label className="text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase tracking-widest mb-1 block">
              Passing Score (%)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                max="100"
                className="w-24 bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-[#1b190d] dark:text-white text-center"
                placeholder="80"
                value={data.passingScore || 80}
                onChange={(e) => onChange('passingScore', parseInt(e.target.value) || 0)}
              />
              <span className="text-xs text-[#5e5836] dark:text-[#f0ede4]/50">Mức điểm AI yêu cầu để qua bài</span>
            </div>
          </div>
          
          <div>
            <label className="text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase tracking-widest mb-1 block">
              Time Limit (Seconds)
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                className="w-24 bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-[#1b190d] dark:text-white text-center"
                placeholder="15"
                value={data.timeLimit || 15}
                onChange={(e) => onChange('timeLimit', parseInt(e.target.value) || 0)}
              />
              <span className="text-xs text-[#5e5836] dark:text-[#f0ede4]/50">Số giây cho phép (0 = không giới hạn)</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PronunciationBlock;