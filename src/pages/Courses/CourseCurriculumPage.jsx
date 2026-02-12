// src/pages/CourseCurriculumPage.jsx
import React from 'react';

// Import Components
import { useNavigate } from 'react-router'; // Để điều hướng khi bấm Start
import ModuleSection from '../../components/courses/curriculum/ModuleSection';
import LessonItem from '../../components/courses/curriculum/LessonItem';
import CourseHeader from '../../components/courses/curriculum/CourseHeader';

const CourseCurriculumPage = () => {
  const navigate = useNavigate();

  // Mock handlers
  const handleStartLesson = (id) => {
    console.log("Starting lesson:", id);
    // navigate(`/lesson/${id}`); 
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">
      
      <main className="flex-1 overflow-y-auto px-2 py-2 max-w-6xl mx-auto w-full min-w-0">
        
        {/* 1. HERO SECTION */}
        <CourseHeader 
          title="Grammar: Particles & Sentence Structure"
          description="Master the foundation of Korean sentence construction with our structured curriculum."
          progress={80}
          image="https://lh3.googleusercontent.com/aida-public/AB6AXuA3SmW4UEMI_NyMueIcvCkNYjpgLNZMIl6e7YO_EPVvcMQFat47xSRR4qbM7tYhAuLFt9ESg_Yif82PUF6hnwuR4MkMQtkZoR-KT9Nuw19NhJqix0jwolnSrB9Jtv6A8pg3YOfLC90UwNR_HDYc_6XSgmDsmrEHDIHw3MuH0ztH6-PoanQCLRasFqc0eK-kXhNSg2wna-mOj3srtMVx9JK4TBubea95DRghN5LPynX91SehBg4AgmDhZcQQId_KmYyxJACWqSGsAaRd"
          onContinue={() => handleStartLesson(12)}
        />

        {/* 2. CURRICULUM CONTENT */}
        <div className="flex flex-col gap-10 pb-20">
          
          {/* Module 1: Completed */}
          <ModuleSection title="Module 1: Basic Particles" status="Completed">
            <LessonItem 
              title="Lesson 11: Subject Particles - 이/가"
              subtitle="10 min • Completed"
              status="completed"
              onAction={() => console.log("Review Lesson 11")}
            />
             {/* Thêm các bài học khác nếu có */}
          </ModuleSection>

          {/* Module 2: In Progress */}
          <ModuleSection title="Module 2: Tenses & Sentence Endings" status="In Progress">
            <LessonItem 
              title="Lesson 12: Past Tense Conjugation"
              subtitle="15 min • Current Lesson"
              status="active"
              onAction={() => handleStartLesson(12)}
            />
            <LessonItem 
              title="Lesson 13: Future Tense - (으)ㄹ 거예요"
              subtitle="12 min • Locked"
              status="locked"
            />
            <LessonItem 
              title="Lesson 14: Formal Politeness Level"
              subtitle="20 min • Locked"
              status="locked"
            />
          </ModuleSection>

          {/* Module 3: Locked */}
          <ModuleSection title="Module 3: Complex Structures" status="Locked">
            <LessonItem 
              title="Lesson 21: Connecting Sentences with -고"
              subtitle="15 min"
              status="locked"
            />
          </ModuleSection>

        </div>
      </main>
    </div>
  );
};

export default CourseCurriculumPage;