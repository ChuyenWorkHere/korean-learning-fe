// src/pages/ListeningPracticePage.jsx
import React, { useState } from 'react';
import AudioPlayer from '../../../components/lesson/listening/AudioPlayer';
import TranscriptView from '../../../components/lesson/listening/TranscriptView';
import PracticeQuestion from '../../../components/lesson/shared/PracticeQuestion';
import LessonHeader from '../../../components/lesson/shared/LessonHeader';
import { LESSON_LEVEL, PASSING_SCORE } from '../../../components/admin/constants';
import SubmitSection from '../../../components/lesson/shared/SubmitSection';
import toast from 'react-hot-toast';
import { lessonService } from '../../../services/lessonService';

const ListeningPracticePage = ({ lessonData }) => {
  const blocks = JSON.parse(lessonData?.content || "[]");

  // --- LẤY DỮ LIỆU TỪ BLOCKS ---
  const mediaBlock = blocks.find(b => b.type === 'media') || {};
  const transcriptBlock = blocks.find(b => b.type === 'transcript') || {};
  const dictationBlocks = blocks.filter(b => b.type === 'dictation'); // Lấy tất cả block điền từ
  const [currentAudioTime, setCurrentAudioTime] = useState(0);
  const [nextLessonId, setNextLessonId] = useState(0);

  const listeningData = {
    title: lessonData?.title || "Listening Lesson",
    level: LESSON_LEVEL[lessonData?.level] || "Beginner",
    meaning: "Listen carefully and complete the exercises below",
    type: "Listening"
  };

  const mediaData = { audioUrl: mediaBlock.audioUrl };
  const transcriptData = { rows: transcriptBlock.rows || [] };

  const quizData = blocks.filter(b => b.type === 'quiz').map(q => ({
    id: q.id,
    questionText: q.question,
    options: q.options,
    explanation: q.explanation || ""
  }));

  // --- STATES ---
  const [quizAnswers, setQuizAnswers] = useState({});
  // Lưu đáp án dictation theo dạng: { 'blockId-index': 'giá trị user gõ' }
  const [dictationAnswers, setDictationAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- HANDLERS ---
  const handleSelectOption = (questionId, optionId) => {
    if (!isSubmitted) {
      setQuizAnswers(prev => ({ ...prev, [questionId]: optionId }));
    }
  };

  const handleDictationChange = (blockId, blankIndex, value) => {
    if (!isSubmitted) {
      setDictationAnswers(prev => ({
        ...prev,
        [`${blockId}-${blankIndex}`]: value
      }));
    }
  };

  // 1. Đếm tổng số câu hỏi (Quiz + Dictation)
  const totalQuizCount = quizData.length;

  // Thuật toán đếm số ô trống (blank) trong Dictation
  let totalDictationCount = 0;
  dictationBlocks.forEach(block => {
    // Regex lấy ra các từ nằm trong ngoặc vuông [...]
    const matches = block.text.match(/\[(.*?)\]/g);
    if (matches) totalDictationCount += matches.length;
  });

  const totalCount = totalQuizCount + totalDictationCount;

  // 2. Tính số câu đúng (Chỉ tính khi đã Submit)
  let correctCount = 0;
  if (isSubmitted) {
    // Tính điểm Quiz
    quizData.forEach(q => {
      const selectedOptId = quizAnswers[q.id];
      const correctOpt = q.options.find(o => o.isCorrect);
      if (correctOpt && selectedOptId === correctOpt.id) correctCount++;
    });

    // Tính điểm Dictation
    dictationBlocks.forEach(block => {
      const parts = block.text.split(/\[(.*?)\]/g);
      parts.forEach((part, index) => {
        // Chỉ xét các phần tử lẻ (là ô trống)
        if (index % 2 !== 0) {
          const expectedWord = part.trim().toLowerCase();
          const blankKey = `${block.id}-${index}`;
          const userAnswer = (dictationAnswers[blankKey] || '').trim().toLowerCase();

          if (userAnswer === expectedWord) correctCount++;
        }
      });
    });
  }

  const progressPercent = totalCount === 0 ? 100 : Math.round((correctCount / totalCount) * 100);

  const handleCheckAnswer = () => {
    // Validate: Bắt buộc người dùng làm hết Quiz và Dictation mới cho nộp
    const answeredQuizCount = Object.keys(quizAnswers).length;
    // Lọc ra các ô dictation đã được điền (không tính ô rỗng)
    const answeredDictationCount = Object.values(dictationAnswers).filter(val => val.trim() !== '').length;

    if (answeredQuizCount < totalQuizCount || answeredDictationCount < totalDictationCount) {
      toast.error("Please answer all questions and fill all blanks before submitting!");
      return;
    }

    setIsSubmitted(true);
    
    if (progressPercent >= PASSING_SCORE) {
      try {
        const nextLessonId = lessonService.completeLesson(lessonData.lessonId);
        setNextLessonId(nextLessonId);
      } catch (error) {
        console.log(error);
        toast.error("Error completing lesson " + lessonData.title);
      }
    }
  };

  const onRetry = () => {
    setIsSubmitted(false);
    setQuizAnswers({});
    setDictationAnswers({});

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <main className="flex-1 flex flex-col items-center font-display pb-20">

      <LessonHeader
        title={listeningData.title}
        level={listeningData.level}
        meaning={listeningData.meaning}
        type={listeningData.type}
      />

      <div className="w-full flex flex-col gap-8">

        {/* 2. Audio Player */}
        <AudioPlayer
          title={listeningData.title}
          subtitle={listeningData.level}
          audioUrl={mediaData.audioUrl}
          onTimeUpdateCallback={(time) => setCurrentAudioTime(time)}
        />

        {/* 3. Transcript View */}
        {transcriptData.rows.length > 0 && (
          <TranscriptView
            transcript={transcriptData.rows}
            currentTime={currentAudioTime}
          />
        )}

        {/* 4. Fill in the blanks (DỮ LIỆU ĐỘNG TỪ DB) */}
        {dictationBlocks.length > 0 && (
          <div className="mt-4 bg-white dark:bg-[#2d2916] p-6 md:p-8 rounded-2xl border border-[#eecd2b]/20 shadow-sm">
            <h3 className="text-lg font-bold text-[#1b190d] dark:text-[#f3f1e7] mb-2">1. Fill in the blanks</h3>
            <p className="text-sm text-[#5e5836] dark:text-[#f3f1e7]/70 mb-8">Listen to the audio and type the missing words.</p>

            <div className="flex flex-col gap-8 text-lg md:text-xl font-medium text-[#1b190d] dark:text-white leading-[3rem]">
              {dictationBlocks.map((block) => {
                // Regex: Tách chuỗi theo định dạng [từ_cần_điền]
                // Ví dụ: "Tôi [yêu] bạn" -> Mảng: ["Tôi ", "yêu", " bạn"]
                // Các phần tử ở vị trí LẺ (index 1, 3, 5...) sẽ là từ cần điền.
                const parts = block.text.split(/\[(.*?)\]/g);

                return (
                  <div key={block.id} className="text-left">
                    {parts.map((part, index) => {
                      // Nếu là chữ bình thường (Index chẵn)
                      if (index % 2 === 0) {
                        return <span key={index} className="whitespace-pre-wrap">{part}</span>;
                      }

                      // Nếu là Ô cần điền (Index lẻ)
                      const expectedWord = part;
                      const blankKey = `${block.id}-${index}`;
                      const userAnswer = dictationAnswers[blankKey] || '';

                      // Logic chấm điểm (Loại bỏ khoảng trắng thừa để chấm chuẩn hơn)
                      const isCorrect = userAnswer.trim().toLowerCase() === expectedWord.trim().toLowerCase();

                      // Quản lý màu sắc viền
                      let inputStateClass = "border-[#eecd2b] focus:bg-[#eecd2b]/10 focus:border-primary text-primary";
                      if (isSubmitted) {
                        inputStateClass = isCorrect
                          ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20"
                          : "border-red-500 text-red-500 bg-red-50 dark:bg-red-900/20";
                      }

                      return (
                        <div key={index} className="relative inline-block mx-1.5 mb-2">
                          <input
                            type="text"
                            value={userAnswer}
                            onChange={(e) => handleDictationChange(block.id, index, e.target.value)}
                            readOnly={isSubmitted}
                            autoComplete="off"
                            spellCheck="false"
                            // Tự động kéo dài ô input theo độ dài của từ gợi ý
                            style={{ width: `${Math.max(expectedWord.length * 1.5, 4)}rem` }}
                            className={`text-center font-bold bg-[#f8f8f6] dark:bg-[#3a3621] border outline-none transition-all ${inputStateClass}`}
                          />

                          {/* Hiển thị đáp án đúng nếu trả lời sai sau khi nộp */}
                          {isSubmitted && !isCorrect && (
                            <div className="absolute top-full left-0 mt-1 w-full text-center">
                              <span className="text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded shadow-sm border border-green-200 dark:border-green-800">
                                {expectedWord}
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. Comprehension Quiz */}
        {quizData.length > 0 && (
          <div className="mt-4">
            <div className="space-y-6">
              {quizData.map((quiz, index) => (
                <PracticeQuestion
                  key={quiz.id}
                  id={index + 1}
                  questionText={`${index + 1}. ${quiz.questionText}`}
                  options={quiz.options}
                  selectedOptionId={quizAnswers[quiz.id]}
                  onSelectOption={(optionId) => handleSelectOption(quiz.id, optionId)}
                  explanation={quiz.explanation}
                  isSubmitted={isSubmitted}
                />
              ))}
            </div>
          </div>
        )}

        {/* 6. Actions */}
        <div className="flex flex-col items-center gap-5 mt-8 pt-8 border-t border-[#eecd2b]/20">
          <SubmitSection
            isSubmitted={isSubmitted}
            onSubmit={handleCheckAnswer}
            progressPercent={progressPercent} 
            correctCount={correctCount}       
            totalCount={totalCount}
            onRetry={onRetry}
            nextLessonId={nextLessonId}           
          />
        </div>
      </div>
    </main>
  );
};

export default ListeningPracticePage;