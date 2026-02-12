// src/pages/WritingChallengePage.jsx
import React from 'react';
import ChallengeHeader from '../../components/writing/ChallengeHeader';
import TranslationInput from '../../components/writing/TranslationInput';
import LearningTip from '../../components/writing/LearningTip';
import FeedbackSidePanel from '../../components/writing/feedback/FeedbackSidePanel';
import AnalysisBreakdown from '../../components/writing/feedback/AnalysisBreakdown';
import ComparisonCard from '../../components/writing/feedback/ComparisonCard';


const WritingChallengePage = () => {

    // Handlers
    const handleSaveDraft = (text) => {
        console.log("Saving draft:", text);
        // Logic lưu nháp local/API
    };

    const handleSubmitTranslation = (text) => {
        console.log("Submitting to AI:", text);
        // Chuyển sang màn hình loading hoặc gọi AI API
    };

    return (
        <main className="flex-1 min-h-screen">
            <div className="mx-auto w-full pb-20">

                {/* 1. Header & Prompt */}
                <ChallengeHeader
                    course="Writing Challenges"
                    unit="Section 2"
                    lesson="Challenge #42: Daily Habits"
                    promptLanguage="Vietnamese"
                    promptText="Tôi muốn học tiếng Hàn mỗi ngày"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuDiD9GNsurvEPcH68wcBzC2rXqCmctSmbJGsdilmXxxaBppwSLan_KRZe8RYfz_1XVoHFPnaBckN8mM0BuvQKXobJiGkAI5Muakq0tW9ksAjJtDBvB9DDjVzA7liAFZOzXW5-ux8MBji-hJrItLHDmxsanpZGjyVvVUGSV-imNTFqscc_wZfO81iVRxbgtEZSJiY0Qf36VQ1asmgrzZaW7XQZaQ5-kdXOazCzIPdmrqze93zrmLbrdjTZLNAB9-TmkwZGD4bJSwGDYC"
                />

                {/* 2. Editor Workspace */}
                <TranslationInput
                    onSave={handleSaveDraft}
                    onSubmit={handleSubmitTranslation}
                />

                {/* 3. Helper Widget */}
                <LearningTip
                    title="Learning Tip"
                    tipContent="Try using the object marker <strong>~을/를</strong> and the frequent adverb <strong>매일</strong> (every day) to sound more natural. Don't worry about perfect grammar—AI will help you refine it!"
                />

            </div>
            <div className="flex-1 flex flex-col min-h-screen relative pb-24">

                {/* 2. Main Content Grid */}
                <section className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto w-full">

                    {/* Top: Comparison */}
                    <div className="lg:col-span-12">
                        <ComparisonCard
                            userText={
                                <>
                                    <span className="border-b-2 border-dashed border-[#f87171]/60">나는</span> 한국어 공부해요
                                </>
                            }
                            userMeaning="I study Korean language."
                            aiText={
                                <>
                                    <span className="bg-[#4ade80]/20 text-[#4ade80] px-1 rounded">저는</span> <span className="bg-[#4ade80]/20 text-[#4ade80] px-1 rounded">한국어를</span> 공부해요
                                </>
                            }
                            aiMeaning="I study Korean language (Polite)."
                        />
                    </div>

                    {/* Left: Detailed Analysis */}
                    <div className="lg:col-span-12">
                        <AnalysisBreakdown />
                    </div>

                </section>
            </div>
        </main>

    );
};

export default WritingChallengePage;