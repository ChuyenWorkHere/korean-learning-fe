// src/pages/LessonFeedbackPage.jsx
import React from 'react';
import { Edit3, ArrowRight } from 'lucide-react';
import GrammarHeader from '../../components/grammar/GrammarHeader';
import TheorySection from '../../components/grammar/TheorySection';
import PracticeQuestion from '../../components/grammar/PracticeQuestion';

// Import Components

const LessonFeedbackPage = () => {

    // --- MOCK DATA ---
    const grammarData = {
        title: "-고 싶다",
        level: "Beginner",
        meaning: "I want to...",
        description: "The grammar pattern <span class='font-bold text-primary'>-고 싶다</span> is attached to the stem of a verb to express the speaker's desire.",
        rules: [
            "Used for 1st person (I) and 2nd person (You) questions.",
            "For 3rd person, use <strong>-고 싶어하다</strong>."
        ],
        conjugation: "-고 싶다",
        examples: [
            { verb: "가다 (to go)", sentence: "학교에 가<span class='text-primary font-bold'>고 싶어요</span>.", meaning: "I want to go to school." },
            { verb: "먹다 (to eat)", sentence: "비빔밥을 먹<span class='text-primary font-bold'>고 싶어요</span>.", meaning: "I want to eat bibimbap." }
        ]
    };

    const practiceData = [
        {
            id: 1,
            verb: "마시다 (to drink)",
            questionText: "커피를 (마시다) <span class='text-green-500 border-b-2 border-green-500/30 px-2 pb-1'>마시고 싶어요</span>.",
            userAnswer: "마시고 싶어요",
            isCorrect: true,
            explanation: "I want to drink coffee."
        },
        {
            id: 2,
            verb: "여행하다 (to travel)",
            questionText: "한국에 (여행하다) <span class='text-red-500 border-b-2 border-red-500/30 px-2 pb-1'>______</span>.",
            userAnswer: "여행하고 싶다",
            isCorrect: false,
            correctAnswer: "여행하고 싶어요",
            explanation: "Remember to use the polite ending '-어요' in this context."
        }
    ];

    // Tính toán phần trăm hoàn thành
    const correctCount = practiceData.filter(q => q.isCorrect).length;
    const totalCount = practiceData.length;
    const progressPercent = Math.round((correctCount / totalCount) * 100);

    return (
        <main className="flex-1 w-full">
            <div className="mx-auto pb-10">

                {/* 1. HEADER */}
                <GrammarHeader
                    title={grammarData.title}
                    level={grammarData.level}
                    meaning={grammarData.meaning}
                />

                <div className="grid grid-cols-1 gap-8">

                    {/* 2. THEORY SECTION */}
                    <TheorySection
                        description={grammarData.description}
                        rules={grammarData.rules}
                        conjugation={grammarData.conjugation}
                        examples={grammarData.examples}
                    />

                    {/* 3. PRACTICE SECTION */}
                    <section className="space-y-6">
                        <div className="flex items-center gap-2 px-2">
                            <Edit3 className="text-primary w-6 h-6" />
                            <h2 className="text-xl font-bold">Practice Exercises</h2>
                        </div>

                        <div className="grid gap-6">
                            {practiceData.map((q) => (
                                <PracticeQuestion
                                    key={q.id}
                                    {...q}
                                />
                            ))}
                        </div>

                        {/* 4. FOOTER SUMMARY & NEXT BUTTON */}
                        <div className="mt-12 flex flex-col items-center gap-6 p-8 bg-primary/5 rounded-3xl border border-primary/10">
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="h-2 w-48 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-green-500 rounded-full transition-all duration-1000"
                                            style={{ width: `${progressPercent}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm font-bold text-green-500">
                                        {progressPercent}% Complete
                                    </span>
                                </div>
                                <p className="text-sm opacity-60 text-gray-500 dark:text-gray-400">
                                    {correctCount}/{totalCount} Questions correct. Practice makes perfect!
                                </p>
                            </div>

                            <button className="bg-primary hover:bg-primary/90 text-[#1b190d] font-black py-4 px-16 rounded-2xl text-lg shadow-xl shadow-primary/20 transition-all active:scale-95 flex items-center gap-3">
                                Next Lesson
                                <ArrowRight className="w-5 h-5" strokeWidth={3} />
                            </button>
                        </div>

                    </section>
                </div>
            </div>
        </main>
    );
};

export default LessonFeedbackPage;