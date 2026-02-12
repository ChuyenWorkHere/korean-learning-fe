// src/pages/BookReaderPage.jsx
import React, { useState } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Type, Palette } from 'lucide-react';
import { useNavigate } from 'react-router';
import AudioControls from '../../components/books/reader/AudioControls';
import TextDisplay from '../../components/books/reader/TextDisplay';
import SideAssistant from '../../components/books/reader/SideAssistant';

// Import Components


const BookReaderPage = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-hidden">
      
      <main className="flex-1 flex flex-col h-full relative min-w-0">
        
        {/* --- 1. READER TOOLBAR (HEADER) --- */}
        <header className="h-16 border-b border-primary/10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur flex items-center justify-between px-4 md:px-6 z-20 shrink-0">
          
          {/* Left: Back & Title */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="p-2 hover:bg-primary/10 rounded-full transition-colors text-slate-500 hover:text-primary"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="hidden md:block">
              <div className="flex items-center gap-2 text-[10px] text-slate-500 uppercase font-bold tracking-widest">
                <span>Morning in Seoul</span>
                <span className="text-primary">/</span>
                <span>Chapter 1</span>
              </div>
              <h2 className="text-sm md:text-base font-bold truncate max-w-[200px]">The First Light (서울의 아침)</h2>
            </div>
          </div>

          {/* Center: Audio Controls */}
          <AudioControls 
            isPlaying={isPlaying} 
            onTogglePlay={() => setIsPlaying(!isPlaying)} 
          />

          {/* Right: Settings */}
          <div className="flex items-center gap-1">
            <button className="p-2 hover:bg-primary/10 rounded-full text-slate-500 hover:text-primary transition-colors">
              <Type className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-primary/10 rounded-full text-slate-500 hover:text-primary transition-colors">
              <Palette className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* --- 2. SPLIT VIEW CONTENT --- */}
        <div className="flex flex-1 overflow-hidden relative">
          
          {/* Left Column: Text */}
          <TextDisplay 
            title="The First Light"
            chapter="제1장: 첫 번째 빛"
            image="https://lh3.googleusercontent.com/aida-public/AB6AXuB_ZR-bCj4gvXtrPyXHjVzzmDWgfObg1y_MsKg14DaVGbZGk9h8B5VtjU46JPLKKK6fuBnrruaBGtByWimF913DwCUqfS7PD2UyjCin4u64-zdKift03v1qLCZo0iJcU2vEoiRRfL_p0bNvq5JcomJ7T4cjwzA2TdDh-wC8DQyM7DWZcALRqqEYF57iiJ1wakKw-I9czTuz4ouCUULK909yUGYrL7SuHAJVRmARA998D3kDUAPPLZ_6ImvJFDh5JuBKOoAUZ-SQT_ZE"
          />

          {/* Right Column: Assistant (Ẩn trên mobile) */}
          <SideAssistant />
          
        </div>

      </main>
    </div>
  );
};

export default BookReaderPage;