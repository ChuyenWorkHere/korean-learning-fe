import React, { useState } from 'react';
import { Edit3, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { LESSON_LEVEL, PASSING_SCORE } from '../../../components/admin/constants';
import GrammarHeader from '../../../components/lesson/grammar/GrammarHeader';
import TheorySection from '../../../components/lesson/grammar/TheorySection';
import PracticeQuestion from '../../../components/lesson/shared/PracticeQuestion';
import SubmitSection from '../../../components/lesson/shared/SubmitSection';
import LessonHeader from '../../../components/lesson/shared/LessonHeader';
import { lessonService } from '../../../services/lessonService';

const GrammarPage = ({ lessonData }) => {

    const blocks = JSON.parse(lessonData?.content || "[]");

    const theoryBlock = blocks.find(b => b.type === 'theory') || {};
    const formulaBlock = blocks.find(b => b.type === 'formula') || {};
    const usageNoteBlock = blocks.find(b => b.type === 'usage_note') || { notes: [] };
    const examplesBlock = blocks.find(b => b.type === 'examples') || { rows: [] };

    const grammarData = {
        title: lessonData?.title || "Grammar Lesson",
        level: LESSON_LEVEL[lessonData?.level] || "Beginner",
        meaning: formulaBlock.meaning || "Grammar pattern",
        type: "Grammar",
        description: theoryBlock.content || "",
        // Chuyển mảng [{id, text}] của Admin thành mảng chuỗi [text] cho UI
        rules: usageNoteBlock.notes.map(n => n.text),
        conjugation: formulaBlock.pattern || "",
        // Chuyển mảng rows của Admin sang định dạng examples của UI
        examples: examplesBlock.rows.map(r => ({
            verb: "", // Dữ liệu của bạn chưa lưu base verb, có thể để trống
            sentence: r.ko,
            meaning: r.en
        }))
    };

    const practiceData = blocks.filter(b => b.type === 'quiz').map(q => ({
        id: q.id,
        verb: "", // Tùy chọn
        questionText: q.question,
        options: q.options,
        explanation: q.explanation
    }));

    // --- STATE QUẢN LÝ ---
    const [quizAnswers, setQuizAnswers] = useState({}); // Lưu ID đáp án user chọn { q1: 'o1', q2: 'o2' }
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [nextLessonId, setNextLessonId] = useState(0);

    // Tính toán điểm số
    const totalCount = practiceData.length;
    let correctCount = 0;

    practiceData.forEach(q => {
        const selectedOptId = quizAnswers[q.id];
        const correctOpt = q.options.find(o => o.isCorrect);
        if (correctOpt && selectedOptId === correctOpt.id) correctCount++;
    });
    const progressPercent = totalCount === 0 ? 0 : Math.round((correctCount / totalCount) * 100);

    // Xử lý sự kiện chọn đáp án
    const handleSelectOption = (questionId, optionId) => {
        if (!isSubmitted) {
            setQuizAnswers(prev => ({ ...prev, [questionId]: optionId }));
        }
    };

    const handleCheckAnswer = async () => {
        // Validate: Bắt buộc người dùng làm hết Quiz và Dictation mới cho nộp
        const answeredQuizCount = Object.keys(quizAnswers).length;

        if (answeredQuizCount < totalCount) {
            toast.error("Please answer all questions before submitting!");
            return;
        }

        setIsSubmitted(true);

        if (progressPercent >= PASSING_SCORE) {
            try {
                const nextLessonId = await lessonService.completeLesson(lessonData.lessonId);
                setNextLessonId(nextLessonId);
            } catch (error) {
                toast.error("Error completing lesson " + lessonData.title);
            }
        }
    };

    const onRetry = () => {
        setIsSubmitted(false);
        setQuizAnswers({});

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return (
        <main className="flex-1 w-full">
            <div className="pb-10">

                <LessonHeader
                    title={grammarData.title}
                    level={grammarData.level}
                    meaning={grammarData.meaning}
                    type={grammarData.type}
                />

                <div className="grid grid-cols-1 gap-8">

                    <TheorySection
                        description={grammarData.description}
                        rules={grammarData.rules}
                        conjugation={grammarData.conjugation}
                        examples={grammarData.examples}
                    />

                    <section className="space-y-6">
                        <div className="flex items-center gap-2 px-2">
                            <Edit3 className="text-primary w-6 h-6" />
                            <h2 className="text-xl font-bold dark:text-white">Practice Exercises</h2>
                        </div>

                        <div className="grid gap-6">
                            {practiceData.map((q, index) => (
                                <PracticeQuestion
                                    key={q.id}
                                    id={index + 1}
                                    verb={q.verb}
                                    questionText={q.questionText}
                                    options={q.options}
                                    selectedOptionId={quizAnswers[q.id]}
                                    onSelectOption={(optId) => handleSelectOption(q.id, optId)}
                                    explanation={q.explanation}
                                    isSubmitted={isSubmitted}
                                />
                            ))}
                        </div>

                        {/* FOOTER SUMMARY & SUBMIT BUTTON */}
                        <div className="mt-12 flex flex-col items-center gap-6 p-8  border-t-2 border-primary/10">
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
                    </section>
                </div>
            </div>
        </main>
    );
};

export default GrammarPage;