// src/pages/ListeningPracticePage.jsx
import React, { useState } from 'react';
import { CheckCircle2, CornerDownLeft } from 'lucide-react';
import AudioPlayer from '../../components/listening/AudioPlayer';
import DictationInput from '../../components/listening/DictationInput';
import HintBox from '../../components/listening/HintBox';

// Import Components

const ListeningPracticePage = () => {
  const [transcription, setTranscription] = useState('');

  const handleCheckAnswer = () => {
    console.log("Checking answer:", transcription);
    // Logic check answer here
  };

  return (
      <main className="flex-1 flex flex-col items-center min-w-0">
        <div className="w-full flex flex-col gap-8">
          
          {/* 1. Header & Progress */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <a href="#" className="text-primary hover:underline">My Courses</a>
              <span className="text-[#9a8d4c]">/</span>
              <span className="text-[#1b190d] dark:text-[#f3f1e7]">Listening Dictation #12</span>
            </div>
            
            {/* Progress Dots */}
            <div className="flex gap-2">
              {[1, 2].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-green-500"></div>)}
              <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></div>
              {[4, 5].map(i => <div key={i} className="w-2.5 h-2.5 rounded-full bg-[#e5e2d6] dark:bg-[#3a3621]"></div>)}
            </div>
          </div>

          <div className="text-left">
            <h1 className="text-[#1b190d] dark:text-[#f3f1e7] text-3xl md:text-4xl font-bold leading-tight">Listening Practice</h1>
            <p className="text-[#9a8d4c] mt-2 text-base md:text-lg">Listen to the audio and type exactly what you hear in Korean.</p>
          </div>

          {/* 2. Audio Player */}
          <AudioPlayer 
            title="Conversation 12: Morning Coffee"
            subtitle="Sentence 3 of 5 • Intermediate Level"
          />

          {/* 3. Input Area */}
          <DictationInput 
            value={transcription} 
            onChange={setTranscription}
            onClear={() => setTranscription('')}
          />

          {/* 4. Actions */}
          <div className="flex flex-col items-center gap-5 mt-4">
            <button 
              onClick={handleCheckAnswer}
              className="w-full md:w-[320px] h-14 md:h-16 bg-primary text-black font-bold text-lg md:text-xl rounded-2xl shadow-[0_6px_0_0_#c5a71c] hover:shadow-[0_4px_0_0_#c5a71c] hover:translate-y-0.5 active:shadow-none active:translate-y-1.5 transition-all flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-6 h-6 md:w-8 md:h-8" />
              Check Answer
            </button>
            
            <div className="flex items-center gap-2 text-[#9a8d4c] text-sm font-medium hidden md:flex">
              <CornerDownLeft className="w-4 h-4" />
              <span>Press <kbd className="px-2 py-1 rounded-md bg-[#f3f1e7] dark:bg-[#3a3621] border border-[#d6d2b3] dark:border-[#4a452d] font-mono text-xs">Ctrl + Enter</kbd> to submit</span>
            </div>
          </div>

          {/* 5. Hint Box */}
          <HintBox 
            hintText={<span>Focus on particles like <b>-은/는</b> and <b>-이/가</b> which are often spoken quickly in this clip. The speaker sounds like they are asking a polite question.</span>}
          />

        </div>
      </main>
  );
};

export default ListeningPracticePage;