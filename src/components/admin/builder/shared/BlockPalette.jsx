import React from 'react';
import { Info } from 'lucide-react';

const BlockPalette = ({ elements, onAddBlock }) => {
  return (
    <aside className="
      w-full md:w-64 
      h-auto md:h-fit 
      border-b md:border-b-0 md:border-r 
      md:rounded-xl md:mt-8 
      border-[#eecd2b]/10 
      bg-white dark:bg-[#2d2916] 
      p-3 md:p-4 
      overflow-hidden md:overflow-y-auto 
      shrink-0 z-10
    ">
      {/* Tiêu đề ẩn trên mobile, hiện trên PC */}
      <h2 className="hidden md:block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase tracking-widest mb-6 px-2">
        Elements
      </h2>
      
      {/* DANH SÁCH BUTTON: Cuộn ngang trên Mobile, Cột dọc trên PC */}
      <div className="flex flex-row md:flex-col gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-thin scrollbar-thumb-[#eecd2b]/50 scrollbar-track-transparent">
        {elements.map((el) => {
          const Icon = el.icon;
          return (
            <button 
              key={el.type}
              onClick={() => onAddBlock(el.type)} 
              // Thêm min-w-[160px] để các khối không bị bóp méo khi cuộn ngang trên điện thoại
              className="min-w-[160px] md:min-w-0 md:w-full flex items-center gap-3 p-2.5 md:p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 md:border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group shrink-0"
            >
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors shrink-0">
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="text-left overflow-hidden">
                <p className="text-sm font-medium truncate">{el.label}</p>
                {/* Ẩn dòng mô tả trên mobile cho gọn */}
                <p className="text-[10px] text-[#5e5836] dark:text-[#f0ede4]/50 truncate hidden md:block">{el.description}</p>
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Khối Tips cũng ẩn trên Mobile cho đỡ tốn diện tích */}
      <div className="mt-8 pt-8 border-t border-[#eecd2b]/10 hidden md:block">
        <div className="bg-[#eecd2b]/5 rounded-xl p-4 border border-[#eecd2b]/20">
          <div className="flex items-center gap-2 mb-2 text-[#eecd2b]">
            <Info className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase">Tips</span>
          </div>
          <p className="text-xs leading-relaxed text-[#5e5836] dark:text-[#f0ede4]/70">
            Click elements to add them. Use Up/Down arrows to reorder blocks in the lesson sequence.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default BlockPalette;