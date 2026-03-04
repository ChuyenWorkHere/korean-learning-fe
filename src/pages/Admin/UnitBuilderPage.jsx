import React, { useEffect, useState } from 'react';
import { ChevronRight, Plus, X, Headphones, Book, Mic, AlignLeft, FileEdit } from 'lucide-react';
import CourseFooter from '../../components/admin/courses/CourseDetail/CourseFooter';
import UnitSection from '../../components/admin/courses/CourseDetail/UnitSection';
import { useParams } from 'react-router';
import toast from 'react-hot-toast';
import { unitService } from '../../services/unitService';
import { lessonService } from '../../services/lessonService'; // <-- THÊM DÒNG NÀY

const LESSON_TYPES = [
  { id: 'grammar', title: 'Grammar & Vocabulary', description: 'Lý thuyết, từ vựng và ví dụ', icon: AlignLeft, color: 'emerald' },
  { id: 'listening', title: 'Listening Practice', description: 'Audio, chép chính tả (Dictation)', icon: Headphones, color: 'blue' },
  { id: 'reading', title: 'Reading Comprehension', description: 'Đoạn văn dài và True/False', icon: Book, color: 'purple' },
  { id: 'writing', title: 'Writing Challenge', description: 'Viết luận, dịch câu (Wongoji)', icon: FileEdit, color: 'amber' },
  { id: 'speaking', title: 'Speaking Roleplay', description: 'Hội thoại tương tác có AI', icon: Mic, color: 'rose' },
];

const UnitBuilderPage = () => {
  const [courseTitle] = useState("Complete Beginner A1");
  const { courseId } = useParams();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeUnitId, setActiveUnitId] = useState(null);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const unitsData = await unitService.getAllUnitsByCourseId(courseId);

        const formattedUnits = unitsData.map(u => ({ ...u, lessons: u.lessons || [], isExpanded: true }));
        setUnits(formattedUnits);
      } catch (error) {
        toast.error("Failed to load units. Please try again later.");
      }
    };
    if (courseId) fetchUnits();
  }, [courseId]);

  const openAddLessonModal = (unitId) => { setActiveUnitId(unitId); setIsAddModalOpen(true); };
  const closeAddLessonModal = () => { setIsAddModalOpen(false); setActiveUnitId(null); };

  // Hiển thị chi tiết lesson trong unit
  const toggleUnit = (unitId) => setUnits(units.map(unit => unit.unitId === unitId ? { ...unit, isExpanded: !unit.isExpanded } : unit));

  const addUnit = async () => {
    const payload = { title: 'New Unit', courseId: courseId };
    try {
      const newUnit = await unitService.createUnit(courseId, payload);
      setUnits([...units, { ...newUnit, lessons: [], isExpanded: true }]);
      toast.success("Unit created successfully!");
    } catch (error) {
      toast.error("Failed to create new unit.");
    }
  };

  const saveUnitTitle = async (unitId, newTitle) => {
    try {
      await unitService.updateUnitTitle(unitId, newTitle);

      setUnits(units.map(unit => unit.unitId === unitId ? { ...unit, title: newTitle } : unit));
      toast.success("Unit title saved!");
    } catch (error) {
      toast.error("Failed to save unit title.");
    }
  };

  const deleteUnit = async (unitId) => {
    if (window.confirm("Are you sure you want to delete this entire Unit? All lessons inside will be lost.")) {
      try {
        await unitService.deleteUnit(unitId);

        setUnits(units.filter(unit => unit.unitId !== unitId));
        toast.success("Unit deleted successfully!");
      } catch (error) {
        toast.error("Failed to delete unit.");
      }
    }
  };

  const moveUnit = async (unitIndex, direction) => {
    const newUnits = [...units];
    if (direction === 'up' && unitIndex > 0) {
      [newUnits[unitIndex - 1], newUnits[unitIndex]] = [newUnits[unitIndex], newUnits[unitIndex - 1]];
    } else if (direction === 'down' && unitIndex < newUnits.length - 1) {
      [newUnits[unitIndex + 1], newUnits[unitIndex]] = [newUnits[unitIndex], newUnits[unitIndex + 1]];
    } else {
      return;
    }

    setUnits(newUnits);

    try {
      const unitIdsInNewOrder = newUnits.map(u => u.unitId);
      await unitService.reorderUnits(courseId, unitIdsInNewOrder);
    } catch (error) {
      toast.error("Failed to save new order. Refreshing...");
    }
  };


  // --- LOGIC LESSON (CÓ GỌI API) ---
  const handleConfirmAddLesson = async (typeObj) => {
    const payload = {
      title: `New ${typeObj.title}`,
      type: typeObj.id.toUpperCase(), // Enum: GRAMMAR, LISTENING...
      unitId: activeUnitId,
      status: 'DRAFT',
      durationMinutes: 0
    };

    try {
      // Gọi API tạo Lesson
      const createdLesson = await lessonService.createLesson(payload);

      // Map thêm các biến phục vụ Frontend (icon, color) mà backend không có
      const frontendLesson = {
        ...createdLesson,
        iconType: typeObj.id === 'grammar' ? 'reading' : typeObj.id === 'speaking' ? 'quiz' : typeObj.id,
        color: typeObj.color
      };

      // Cập nhật UI
      setUnits(units.map(unit => {
        if (unit.unitId === activeUnitId) {
          return { ...unit, lessons: [...unit.lessons, frontendLesson] };
        }
        return unit;
      }));

      closeAddLessonModal();
      toast.success("Lesson added successfully!");
    } catch (error) {
      toast.error("Failed to add new lesson.");
    }
  };

  const updateLessonTitle = async (unitId, lessonId, newTitle) => {
    try {
      const unit = units.find(u => u.unitId === unitId);
      const existingLesson = unit.lessons.find(l => l.lessonId === lessonId);

      const payload = {
        ...existingLesson,
        title: newTitle
      };

      await lessonService.updateLesson(lessonId, payload);

      setUnits(units.map(unit => unit.unitId === unitId ? {
        ...unit,
        lessons: unit.lessons.map(lesson => (lesson.lessonId || lesson.lessonId) === lessonId ? { ...lesson, title: newTitle } : lesson)
      } : unit));

      toast.success("Lesson title updated!");
    } catch (error) {
      console.error("Lỗi khi sửa tên bài học:", error);
      toast.error("Failed to update lesson title.");
    }
  };

  const deleteLesson = async (unitId, lessonId) => {
    if (window.confirm("Delete this lesson permanently?")) {
      try {
        await lessonService.deleteLesson(lessonId);
        setUnits(units.map(unit => unit.unitId === unitId ? {
          ...unit,
          lessons: unit.lessons.filter(l => l.lessonId !== lessonId)
        } : unit));
        toast.success("Lesson deleted.");
      } catch (error) {
        toast.error("Failed to delete lesson.");
      }
    }
  };

  const moveLesson = async (unitId, lessonIndex, direction) => {
    let isChanged = false;

    const newUnits = units.map(unit => {
      if (unit.unitId === unitId) {
        const newLessons = [...unit.lessons];
        if (direction === 'up' && lessonIndex > 0) {
          [newLessons[lessonIndex - 1], newLessons[lessonIndex]] = [newLessons[lessonIndex], newLessons[lessonIndex - 1]];
          isChanged = true;
        } else if (direction === 'down' && lessonIndex < newLessons.length - 1) {
          [newLessons[lessonIndex + 1], newLessons[lessonIndex]] = [newLessons[lessonIndex], newLessons[lessonIndex + 1]];
          isChanged = true;
        }
        return { ...unit, lessons: newLessons };
      }
      return unit;
    });

    if (!isChanged) return;

    setUnits(newUnits);

    try {
      const targetUnit = newUnits.find(u => u.unitId === unitId);
      const lessonIdsInNewOrder = targetUnit.lessons.map(l => l.lessonId);

      await lessonService.reorderLessons(unitId, lessonIdsInNewOrder);
    } catch (error) {
      console.error("Lỗi khi Reorder:", error);
      toast.error("Failed to move lesson. Data might be out of sync.");
    }
  };

  const totalUnits = units.length;
  const totalLessons = units.reduce((acc, unit) => acc + (unit.lessons?.length || 0), 0);

  // --- RENDER GIAO DIỆN CHÍNH (Giữ nguyên) ---
  return (
    <div className="text-[#1b190d] dark:text-[#f0ede4] min-h-screen flex font-display relative">
      <main className="flex-1">
        <header className="flex justify-between items-center mb-10">
          <div>
            <nav className="flex items-center gap-2 text-[#5e5836] dark:text-[#f0ede4]/60 text-sm mb-1">
              <span className="hover:text-[#eecd2b] transition-colors cursor-pointer">Courses</span>
              <ChevronRight className="w-4 h-4" />
              <span className="text-[#1b190d] dark:text-white font-semibold">{courseTitle}</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-[#1b190d] dark:text-white">Course Structure Manager</h1>
          </div>
          <button onClick={addUnit} className="bg-[#eecd2b] hover:bg-[#eecd2b]/90 text-[#1b190d] px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#eecd2b]/20 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            <span>Add Unit</span>
          </button>
        </header>

        <div className="max-w-5xl space-y-6 pb-20">
          {units.map((unit, index) => (
            <UnitSection
              key={unit.unitId}
              unit={unit}
              index={index}
              totalUnits={units.length}
              onToggle={() => toggleUnit(unit.unitId)}
              onSaveUnitTitle={(newTitle) => saveUnitTitle(unit.unitId, newTitle)}
              onMoveUnit={(direction) => moveUnit(index, direction)}
              onDeleteUnit={() => deleteUnit(unit.unitId)}
              onAddLesson={() => openAddLessonModal(unit.unitId)}
              onUpdateLessonTitle={(lessonId, newTitle) => updateLessonTitle(unit.unitId, lessonId, newTitle)}
              onMoveLesson={(lessonIndex, direction) => moveLesson(unit.unitId, lessonIndex, direction)}
              onDeleteLesson={(lessonId) => deleteLesson(unit.unitId, lessonId)}
            />
          ))}
        </div>

        <CourseFooter totalUnits={totalUnits} totalLessons={totalLessons} />
      </main>

      {/* --- MODAL CHỌN LOẠI BÀI HỌC --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#2d2916] rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between p-6 border-b border-[#eecd2b]/10 bg-[#f8f8f6] dark:bg-[#221f10]/50">
              <div>
                <h2 className="text-xl font-bold text-[#1b190d] dark:text-white">Create New Lesson</h2>
                <p className="text-sm text-[#5e5836] dark:text-[#f0ede4]/60">Choose a skill format to open the right builder</p>
              </div>
              <button onClick={closeAddLessonModal} className="p-2 hover:bg-[#eecd2b]/20 rounded-full text-[#1b190d]/50 dark:text-white/50 transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LESSON_TYPES.map((type) => {
                const Icon = type.icon;
                return (
                  <button key={type.id} onClick={() => handleConfirmAddLesson(type)} className="flex items-start gap-4 p-4 rounded-xl border-2 border-transparent hover:border-[#eecd2b] bg-[#f8f8f6] dark:bg-[#221f10]/50 hover:bg-[#eecd2b]/5 transition-all text-left group">
                    <div className="p-3 rounded-lg bg-white dark:bg-[#2d2916] shadow-sm group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] text-[#5e5836] dark:text-[#eecd2b] transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1b190d] dark:text-white">{type.title}</h3>
                      <p className="text-xs text-[#5e5836] dark:text-[#f0ede4]/60 mt-1">{type.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitBuilderPage;