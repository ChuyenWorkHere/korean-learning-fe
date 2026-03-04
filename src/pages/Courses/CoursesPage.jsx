// src/pages/CoursesPage.jsx
import React, { useState, useEffect } from 'react';
import {
    Search, Bell, BookOpen, Headphones, Book, Mic, PenTool,
    Flame, Star, CheckCircle, Loader2, AlertCircle
} from 'lucide-react';
import toast from 'react-hot-toast';

import CourseCard from '../../components/courses/CourseCard';
import { courseService } from '../../services/courseService';
import { AVAILABLE_ICONS } from '../../components/admin/constants';

const getSkillIcon = (iconName) => {
    return AVAILABLE_ICONS.find(item => item.name === iconName)?.icon || Book;
};

const CoursesPage = () => {
    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserCourses = async () => {
            try {
                setIsLoading(true);
                const data = await courseService.getUserCourses();
                setCourses(data);
                setError(null);
            } catch (err) {
                console.error("Lỗi khi tải danh sách khóa học:", err);
                setError("Failed to load your learning path. Please try again later.");
                toast.error("Không thể tải danh sách khóa học");
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserCourses();
    }, []);

    

    return (
        <div className="flex flex-col min-h-screen font-display">
            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 pb-16">

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
                    <div>
                        <h2 className="text-2xl font-black text-text-main dark:text-white tracking-wide mb-2">Welcome back, Learner!</h2>
                        <p className="text-text-muted tracking-wide text-md">Ready to pollinate your mind? Continue where you left off.</p>
                    </div>
                    <button className="flex min-w-[140px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 bg-primary text-[#1b190d] text-base font-bold transition-transform hover:scale-105 shadow-md">
                        Continue Lesson
                    </button>
                </div>

                {/* Course Grid Title */}
                <div className="flex items-center justify-between pb-6">
                    <h2 className="text-[#1b190d] dark:text-white text-2xl font-bold leading-tight flex items-center gap-2">
                        <Flame className="w-6 h-6 text-orange-500" />
                        Your Learning Path
                    </h2>
                    <button className="text-[#eecd2b] text-sm font-bold hover:underline transition-all">
                        View All Curriculum
                    </button>
                </div>

                {/* --- STATE HANDLING (LOADING / ERROR) --- */}
                {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-[#eecd2b]">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="font-medium text-[#5e5836] dark:text-gray-400">Loading your courses...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-20 text-red-500 bg-red-50 dark:bg-red-900/10 rounded-2xl border border-red-100 dark:border-red-900/30">
                        <AlertCircle className="w-10 h-10 mb-4" />
                        <p className="font-medium">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg font-bold hover:bg-red-200 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    /* --- COURSE GRID --- */
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {courses.map((course) => (
                            <CourseCard
                                key={course.courseId}
                                id={course.courseId}
                                title={course.title}
                                description={course.description}
                                icon={getSkillIcon(course.iconName)}
                                badgeText={course.courseLevel}
                                progress={course.progress || 0}
                                completedLessons={course.completedLessons || 0}
                                totalLessons={course.totalLessons || 0}
                                isLocked={course.isLocked || false}
                                buttonText={course.isEnrolled > 0 ? "Continue" : "Start Module"}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursesPage;