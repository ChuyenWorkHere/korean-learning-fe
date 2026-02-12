// src/pages/VocabularyPage.jsx (Study Mode)
import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';

// Import Components cũ (đã tạo ở bước trước)
import FlashcardHeader from '../../components/vocabulary/FlashcardHeader';
import Flashcard from '../../components/vocabulary/Flashcard';
import StudyControls from '../../components/vocabulary/StudyControls';
import FloatingActions from '../../components/vocabulary/FloatingActions';

const VocabularyPage = () => {
  // Giả lập dữ liệu nhận được từ Library (Ví dụ: đang học bộ "Essential Verbs")
  const DECK_INFO = {
    title: "Essential Verbs",
    subtitle: "Daily Vocabulary Drill • 50 words"
  };

  const VOCAB_LIST = [
    { id: 1, word: '가다', meaning: 'To Go', type: 'Verb' },
    { id: 2, word: '보다', meaning: 'To See', type: 'Verb' },
    { id: 3, word: '먹다', meaning: 'To Eat', type: 'Verb' },
    // ... thêm data
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Handlers
  const handleNext = () => {
    if (currentIndex < VOCAB_LIST.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 150);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev - 1), 150);
    }
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-[#1b190d] dark:text-white">
      <main className="flex-1 relative flex flex-col h-full">
        {/* Top Back Button (Navigational Context) */}
        <div className="absolute top-2 left-2 z-10">
          <button className="flex items-center gap-2 text-[#c9c092] hover:text-primary transition-colors font-bold text-sm">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Library</span>
          </button>
        </div>

        {/* Study Area - Căn giữa nội dung */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
          <div className="w-full max-w-[640px] flex flex-col items-center pb-20"> {/* pb-20 để tránh bị nút Floating che */}
            
            {/* 1. Header & Progress */}
            <FlashcardHeader 
              title={DECK_INFO.title}
              subtitle={DECK_INFO.subtitle}
              currentIndex={currentIndex + 1}
              totalCount={VOCAB_LIST.length}
            />

            {/* 2. Flashcard Main */}
            <Flashcard 
              frontContent={VOCAB_LIST[currentIndex].word}
              backContent={VOCAB_LIST[currentIndex].meaning}
              subLabel={VOCAB_LIST[currentIndex].type}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
            />

            {/* 3. Controls */}
            <StudyControls 
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={currentIndex === 0}
              isLast={currentIndex === VOCAB_LIST.length - 1}
            />

          </div>
        </div>

        {/* 4. Floating Actions (Speaker, Star) */}
        <FloatingActions 
          onSpeak={() => console.log("Speak")}
          onFavorite={() => setIsFavorite(!isFavorite)}
          isFavorite={isFavorite}
        />
      </main>
    </div>
  );
};

export default VocabularyPage;