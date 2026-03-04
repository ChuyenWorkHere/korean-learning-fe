import { useNavigate, useParams } from 'react-router';
import ModuleSection from '../../components/courses/curriculum/ModuleSection';
import LessonItem from '../../components/courses/curriculum/LessonItem';
import CourseHeader from '../../components/courses/curriculum/CourseHeader';
import { useEffect, useState } from 'react';
import { unitService } from '../../services/unitService';
import { courseService } from '../../services/courseService';
import { AlertCircle, Loader2 } from 'lucide-react';
import { PROGRESS_STATUS } from '../../components/admin/constants';


const CourseCurriculumPage = () => {

  const { courseId } = useParams();
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [courseDetail, setCourseDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCourseDetail = async (courseId) => {
      try {
        setIsLoading(true);
        const data = await courseService.getUserCourseDetail(courseId);
        setCourseDetail(data);
        setError(null);
      } catch (err) {
        setError("Failed to load your course. Please try again later.");
        toast.error("Không thể tải khóa học");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserCourseDetail(courseId);

    const getUnitsForUser = async (courseId) => {
      try {
        setIsLoading(true);
        const data = await unitService.getUnitsForUser(courseId);
        setUnits(data);
        setError(null);
      } catch (err) {
        setError("Failed to load course detail. Please try again later.");
        toast.error("Không thể tải danh sách bài học");
      } finally {
        setIsLoading(false);
      }
    }
    getUnitsForUser(courseId);
  }, [courseId]);


  const handleStartLesson = (id) => {
    console.log("Starting lesson:", id);
    navigate(`/lessons/${id}`);
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white">

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
        <main className="flex-1 overflow-y-auto px-2 py-2 max-w-6xl mx-auto w-full min-w-0">

          {/* 1. HERO SECTION */}
          <CourseHeader
            title={courseDetail?.title}
            description={courseDetail?.description}
            progress={courseDetail?.progress}
            onContinue={() => handleStartLesson(12)}
          />

          {/* 2. CURRICULUM CONTENT */}
          <div className="flex flex-col gap-10 pb-20">
            {
              units.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[#eecd2b]">
                  <p className="font-medium text-[#5e5836] dark:text-gray-400">No lessons available. Please check back later.</p>
                </div>
              ) : (
                units.map((unit, index) => (
                  <ModuleSection key={unit.unitId} title={`Module ${index + 1}: ${unit.title}`} status={PROGRESS_STATUS[unit.progressStatus] || "Locked"}>
                    {
                      unit.lessons.map((lesson, lessonIndex) => (
                        <LessonItem
                          key={lesson.lessonId}
                          title={`Lesson ${index + 1}.${lessonIndex + 1}: ${lesson.title}`}
                          subtitle={`${lesson.durationMinutes} min - ${PROGRESS_STATUS[lesson.status] || "Locked"}`}
                          status={PROGRESS_STATUS[lesson.status] || "Locked"}
                          onAction={() => handleStartLesson(lesson.lessonId)}
                        />
                      ))
                    }
                  </ModuleSection>
                ))
              )
            }
          </div>
        </main>
      )}
    </div>
  );
};

export default CourseCurriculumPage;