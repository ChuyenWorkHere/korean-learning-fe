// src/components/reader/TextDisplay.jsx
import React from 'react';

// Component con hiển thị từ có highlight
const Highlight = ({ children }) => (
  <span className="bg-primary/20 border-b-2 border-primary cursor-pointer hover:bg-primary/40 transition-colors px-0.5 rounded-sm">
    {children}
  </span>
);

const TextDisplay = ({ title, chapter, image }) => {
  return (
    <section className="flex-1 overflow-y-auto p-6 md:p-12 bg-white dark:bg-[#221f10]/30 scroll-smooth">
      <div className="max-w-2xl mx-auto pb-20">
        
        {/* Chapter Image */}
        <div className="mb-10 rounded-xl overflow-hidden border border-primary/10 aspect-[16/9] relative shadow-sm group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
          <img 
            src={image} 
            alt="Chapter illustration" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute bottom-4 left-6 z-20 text-white italic text-sm font-medium">
            Sunrise over Namsan Tower
          </div>
        </div>

        {/* Text Content */}
        <div className="font-serif-kr text-xl md:text-2xl leading-[2.2] text-slate-800 dark:text-slate-200">
          <h1 className="font-display font-bold text-3xl md:text-4xl mb-8 text-primary">
            {chapter}
          </h1>
          
          <p className="mb-8">
            <Highlight>서울</Highlight>의 아침은 언제나 조용하게 시작됩니다. 
            남산 너머로 <Highlight>첫 번째</Highlight> 햇살이 비치면, 
            도시의 고요함이 조금씩 깨어나기 시작합니다.
          </p>

          <p className="mb-8">
            지수 씨는 창문을 열고 신선한 <Highlight>공기</Highlight>를 마셨습니다. 
            길가에는 부지런한 사람들이 벌써 하루를 <Highlight>준비</Highlight>하고 있었습니다. 
            커피 향기가 방 안을 가득 채웠습니다.
          </p>

          <p className="mb-8">
            "오늘은 정말 <Highlight>아름다운</Highlight> 날이 될 것 같아," 지수 씨가 혼잣말을 했습니다. 
            그녀는 가방을 챙겨 <Highlight>지하철</Highlight>역으로 향했습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TextDisplay;