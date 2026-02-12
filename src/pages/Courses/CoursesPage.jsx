// src/pages/CoursesPage.jsx
import React from 'react';
// 1. Import Lucide Icons
import {
    Search, Bell, BookOpen, Headphones, Book, Mic, PenTool,
    Flame, Star, CheckCircle
} from 'lucide-react';

// 2. Import Components
import CourseCard from '../../components/courses/CourseCard'; // <-- Component mới

const CoursesPage = () => {
    return (
        <div className="flex flex-col min-h-screen">

            {/* --- MAIN CONTENT --- */}
            <div className="flex-1 pb-16">

                {/* Welcome Section */}
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
                    <h2 className="text-[#1b190d] dark:text-white text-2xl font-bold leading-tight">
                        Your Learning Path
                    </h2>
                    <a className="text-primary text-sm font-bold hover:underline" href="#">
                        View All Curriculum
                    </a>
                </div>

                {/* --- COURSE GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                    <CourseCard
                        key={1}
                        title="Grammar"
                        description="Particles & Sentence Structure"
                        icon={BookOpen}
                        badgeText="CORE"
                        progress={80}
                        completedLessons={12} totalLessons={15}
                        buttonText="Continue"
                    />

                    <CourseCard
                        key={3}
                        title="Listening"
                        description="Audio Comprehension"
                        icon={Headphones}
                        badgeText="INTERACTIVE"
                        progress={45}
                        completedLessons={9} totalLessons={20}
                        buttonText="Continue"
                    />

                    <CourseCard
                        key={2}
                        title="Reading"
                        description="Hangul & Short Stories"
                        icon={Book}
                        badgeText="PRACTICE"
                        progress={90}
                        completedLessons={18} totalLessons={20}
                        buttonText="Continue"
                    />

                    <CourseCard
                        key={4}
                        title="Speaking"
                        description="Pronunciation Practice"
                        icon={Mic}
                        badgeText="ADVANCED"
                        progress={10}
                        completedLessons={2} totalLessons={20}
                        buttonText="Start Module"
                    />

                    <CourseCard
                        key={5}
                        title="Writing"
                        description="Stroke Order & Sentences"
                        icon={PenTool}
                        badgeText="SKILLS"
                        progress={0}
                        completedLessons={0} totalLessons={15}
                        buttonText="Start Module"
                    />

                    {/* Locked Card */}
                    <CourseCard

                        key={6}
                        title="Advanced Dialogue"
                        description="Complete Speaking Level 1 to unlock"
                        isLocked={true}
                    />

                </div>
            </div>
        </div>
    );
};

export default CoursesPage;