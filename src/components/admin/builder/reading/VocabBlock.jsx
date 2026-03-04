import React from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';

const VocabBlock = ({ data, onChange }) => {

  // --- LOGIC THÊM, SỬA, XÓA TỪ VỰNG ---
  const addWord = () => {
    // Nếu chưa có mảng words thì khởi tạo mảng mới
    const currentWords = data.words || [];
    const newWords = [...currentWords, { id: `v-${Date.now()}`, term: '', meaning: '', example: '' }];
    onChange('words', newWords);
  };

  const updateWord = (index, field, value) => {
    const newWords = [...data.words];
    newWords[index][field] = value;
    onChange('words', newWords);
  };

  const deleteWord = (index) => {
    const newWords = [...data.words];
    newWords.splice(index, 1);
    // Luôn giữ lại ít nhất 1 ô nhập liệu trống
    if (newWords.length === 0) {
      newWords.push({ id: `v-${Date.now()}`, term: '', meaning: '', example: '' });
    }
    onChange('words', newWords);
  };

  return (
    <div className="p-6">
      <p className="text-sm text-[#5e5836] dark:text-[#f0ede4]/70 mb-4">
        Thêm các từ vựng quan trọng xuất hiện trong bài đọc để làm nổi bật (Highlight) và giải nghĩa cho học viên.
      </p>
      
      <div className="space-y-4">
        {data.words?.map((word, index) => (
          <div key={word.id} className="p-4 bg-[#f8f8f6] dark:bg-[#221f10]/50 rounded-xl border border-[#eecd2b]/20 relative group transition-all hover:border-[#eecd2b]/50">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Cột 1: Từ vựng */}
              <div>
                <label className="text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase tracking-widest mb-1 block">Word / Phrase</label>
                <input
                  type="text"
                  className="w-full bg-white dark:bg-[#2d2916] border border-[#eecd2b]/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none font-bold text-[#1b190d] dark:text-white"
                  placeholder="e.g. 곶감"
                  value={word.term}
                  onChange={(e) => updateWord(index, 'term', e.target.value)}
                />
              </div>

              {/* Cột 2: Ý nghĩa */}
              <div>
                <label className="text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase tracking-widest mb-1 block">Meaning</label>
                <input
                  type="text"
                  className="w-full bg-white dark:bg-[#2d2916] border border-[#eecd2b]/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-[#1b190d] dark:text-white"
                  placeholder="e.g. dried persimmon / quả hồng khô"
                  value={word.meaning}
                  onChange={(e) => updateWord(index, 'meaning', e.target.value)}
                />
              </div>

              {/* Dòng 2: Câu ví dụ trải dài */}
              <div className="md:col-span-2">
                <label className="text-[10px] font-bold text-[#5e5836] dark:text-[#f0ede4]/60 uppercase tracking-widest mb-1 block">Example Sentence (Optional)</label>
                <input
                  type="text"
                  className="w-full bg-white dark:bg-[#2d2916] border border-[#eecd2b]/30 rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-[#1b190d]/70 dark:text-white/70"
                  placeholder="e.g. 호랑이가 곶감을 무서워했어요. (Con hổ đã sợ quả hồng khô.)"
                  value={word.example}
                  onChange={(e) => updateWord(index, 'example', e.target.value)}
                />
              </div>
            </div>

            {/* Nút xóa từ vựng (Chỉ hiện khi di chuột vào) */}
            <button
              onClick={() => deleteWord(index)}
              className="absolute -top-2 -right-2 text-slate-300 dark:text-slate-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 bg-white dark:bg-[#2d2916] rounded-full shadow-md"
              title="Delete Word"
            >
              <MinusCircle className="w-5 h-5 fill-white dark:fill-[#2d2916]" />
            </button>
          </div>
        ))}
      </div>

      {/* Nút thêm từ vựng mới */}
      <button
        onClick={addWord}
        className="mt-6 w-full py-3 border-2 border-dotted border-[#eecd2b]/40 rounded-xl text-[#eecd2b] font-bold hover:bg-[#eecd2b]/5 transition-colors flex items-center justify-center gap-2"
      >
        <PlusCircle className="w-5 h-5" /> Add New Vocabulary
      </button>
    </div>
  );
};

export default VocabBlock;