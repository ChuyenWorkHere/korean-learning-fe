// src/pages/LessonWrapperPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Loader2, AlertCircle } from 'lucide-react';
import { lessonService } from '../services/lessonService';
import { LESSON_TYPE } from '../components/admin/constants';
import GrammarPage from './Lessons/Grammar/GrammarPage';
import ListeningPracticePage from './Lessons/Listening/ListeningPracticePage';
import ReadingPage from './Lessons/Reading/ReadingPage';
import WritingChallengePage from './Lessons/Writing/WritingChallengePage';

const LessonWrapperPage = () => {
    const { courseId, lessonId } = useParams();
    const [lessonData, setLessonData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLessonDetail = async () => {
            try {
                setIsLoading(true);

                const data = await lessonService.getLessonById(lessonId);
                setLessonData(data);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Không thể tải nội dung bài học.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchLessonDetail();
    }, [lessonId]);

    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark text-[#eecd2b]">
                <div className="loader"></div>
            </div>
        );
    }

    if (error || !lessonData) {
        return (
            <div className="flex h-screen items-center justify-center bg-background-light dark:bg-background-dark text-red-500">
                <AlertCircle className="w-10 h-10 mb-2" />
                <p>{error}</p>
            </div>
        );
    }


    switch (lessonData.type) {
        case LESSON_TYPE.GRAMMAR:
            return <GrammarPage lessonData={lessonData} />;

        case LESSON_TYPE.LISTENING:
            return <ListeningPracticePage lessonData={lessonData} />;

        case LESSON_TYPE.READING:
            return <ReadingPage lessonData={lessonData} />;

        case LESSON_TYPE.WRITING:
            return <WritingChallengePage lessonData={lessonData} />;


        default:
            return (
                <div className="flex h-screen items-center justify-center text-gray-500">
                    Loại bài học ({lessonData.type}) chưa được hỗ trợ giao diện.
                </div>
            );
    }
};

export default LessonWrapperPage;