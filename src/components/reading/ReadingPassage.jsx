// src/components/reading/ReadingPassage.jsx
import React from 'react';
import { Volume2 } from 'lucide-react';

// Component con: Tooltip từ vựng
const VocabTooltip = ({ word, meaning, pronunciation }) => {
  return (
    <span className="relative group cursor-help inline-block">
      <span className="border-b-2 border-primary/50 hover:border-primary pb-0.5 transition-all font-medium">
        {word}
      </span>
      {/* Tooltip Box */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-[200px] px-4 py-3 bg-primary text-[#181711] text-sm rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50 pointer-events-none transform translate-y-2 group-hover:translate-y-0">
        <div className="font-bold text-base mb-1 flex items-center justify-between">
          {word}
          <Volume2 className="w-3 h-3 opacity-50" />
        </div>
        <div className="text-xs opacity-70 mb-1 italic">{pronunciation}</div>
        <div className="leading-snug font-medium">{meaning}</div>
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-primary"></div>
      </div>
    </span>
  );
};

const ReadingPassage = ({ title, image, content }) => {
  return (
    <div className="w-full lg:w-[65%] overflow-y-auto px-8 py-8 custom-scrollbar border-r border-black/5 dark:border-white/5 bg-white dark:bg-[#1a180e]">
      <article className="prose prose-slate max-w-none dark:prose-invert">

        {/* Hero Image */}
        <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden mb-8 group shadow-sm">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url('${image}')` }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-6 left-6">
            <h3 className="text-white text-2xl md:text-3xl font-bold font-serif-kr tracking-wide">{title}</h3>
          </div>
        </div>

        {/* Text Body */}
        <div className="font-serif-kr text-xl leading-loose text-[#2d2c25] dark:text-[#e5e4de] space-y-8">
          <p>
            광장시장은 서울의 중심인 종로에 위치한 <VocabTooltip word="전통 시장" pronunciation="jeontong sijang" meaning="Traditional Market" />입니다.
            이 시장은 1905년에 설립되었으며, 한국에서 가장 오래된 상설 시장 중 하나로 알려져 있습니다.
          </p>

          <div className="bg-primary/5 border-l-4 border-primary p-6 my-8 rounded-r-lg">
            <p className="text-xs uppercase font-bold text-[#888263] mb-2 tracking-widest">Culture Tip</p>
            <p className="text-base italic leading-relaxed text-[#5c5847] dark:text-[#a39f88]">
              Gwangjang Market was the first permanent market in Korea to be managed solely by Koreans.
            </p>
          </div>

          <p>
            오늘날 광장시장은 맛있는 먹거리로 매우 유명합니다. 특히 <VocabTooltip word="빈대떡" pronunciation="bindaetteok" meaning="Mung Bean Pancake" />과
            마약김밥은 관광객들과 현지인들에게 큰 사랑을 받고 있습니다.
          </p>
        </div>

      </article>
    </div>
  );
};

export default ReadingPassage;