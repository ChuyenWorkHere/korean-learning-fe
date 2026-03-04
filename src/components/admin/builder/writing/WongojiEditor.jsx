import React, { useState } from 'react';

const WongojiEditor = ({ rows = 10, cols = 20 }) => {
  const [text, setText] = useState('');
  const totalCells = rows * cols;

  const handleChange = (e) => {
    // Ngăn người dùng gõ vượt quá số lượng ô trên giấy
    if (e.target.value.length <= totalCells) {
      setText(e.target.value);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8 bg-white dark:bg-[#2d2916] rounded-xl shadow-sm">
      <h3 className="text-lg font-bold mb-4 text-[#1b190d] dark:text-[#eecd2b]">
        TOPIK 원고지 연습 (Wongoji Practice)
      </h3>

      {/* CONTAINER CHÍNH - Phải set relative để đè thẻ textarea lên lưới */}
      <div className="relative w-full overflow-hidden bg-white border-2 border-green-600/30 p-2 rounded">
        
        {/* 1. TEXTAREA TÀNG HÌNH (Lớp trên cùng) */}
        <textarea
          className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text resize-none p-0 m-0"
          value={text}
          onChange={handleChange}
          spellCheck="false"
        />

        {/* 2. LƯỚI WONGOJI (Lớp bên dưới) */}
        <div 
          className="grid gap-[1px] bg-green-600/30"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: totalCells }).map((_, index) => {
            // Lấy ký tự tại vị trí tương ứng trong chuỗi text
            const char = text[index] || ''; 
            
            // Xử lý xuống dòng: Trên Wongoji, dấu enter (\n) coi như bỏ qua các ô còn lại của dòng đó
            // (Phần này sẽ cần thuật toán phức tạp hơn nếu bạn muốn hỗ trợ phím Enter chuẩn xác, 
            // tạm thời code này map 1-1 ký tự vào ô)

            return (
              <div 
                key={index} 
                className="bg-white aspect-square flex items-center justify-center border border-green-600/20 text-lg font-medium text-gray-800"
              >
                {char}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-between text-sm text-gray-500">
        <span>Gõ tiếng Hàn vào đây để xem điều kỳ diệu!</span>
        <span>{text.length} / {totalCells} 자 (chữ)</span>
      </div>
    </div>
  );
};

export default WongojiEditor;