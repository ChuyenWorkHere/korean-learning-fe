import React, { useState } from 'react';
import { 
  Hexagon, LayoutDashboard, BookOpen, Users, BarChart2, Settings,
  ChevronRight, Plus, LayoutGrid, MoreVertical, ChevronUp, ChevronDown,
  GripVertical, Headphones, Book, Sparkles, Edit, Trash2, PlusCircle,
  MessageSquare, ArrowUp, ArrowDown
} from 'lucide-react';

const CourseManager = () => {
  // --- STATE QUẢN LÝ DỮ LIỆU KHÓA HỌC ---
  const [courseTitle] = useState("Complete Beginner A1");
  
  const [units, setUnits] = useState([
    {
      id: 'unit-1',
      title: 'Unit 1: Hangul Basics',
      description: 'Estimated 45 mins',
      icon: 'grid',
      isExpanded: true,
      lessons: [
        { id: 'l1', title: 'Vowels Part 1: Basic Sounds', type: 'Listening Exercise', duration: '12 mins', status: 'Published', iconType: 'listening', color: 'blue' },
        { id: 'l2', title: 'Consonants Part 1: The Building Blocks', type: 'Reading Theory', duration: '15 mins', status: 'Published', iconType: 'reading', color: 'emerald' },
        { id: 'l3', title: 'Quiz: Hangul Basics Mastery', type: 'Interactive Quiz', duration: '10 Questions', status: 'Published', iconType: 'quiz', color: 'purple' }
      ]
    },
    {
      id: 'unit-2',
      title: 'Unit 2: Greetings & Introductions',
      description: 'Estimated 1h 20m',
      icon: 'forum',
      isExpanded: false,
      lessons: [
        { id: 'l4', title: 'Hello and Goodbye', type: 'Speaking Practice', duration: '15 mins', status: 'Draft', iconType: 'listening', color: 'blue' }
      ]
    }
  ]);

  // --- LOGIC XỬ LÝ (MVP) ---

  // 1. Mở/Đóng Unit
  const toggleUnit = (unitId) => {
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, isExpanded: !unit.isExpanded } : unit
    ));
  };

  // 2. Cập nhật tên Unit
  const updateUnitTitle = (unitId, newTitle) => {
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, title: newTitle } : unit
    ));
  };

  // 3. Thêm Unit mới
  const addUnit = () => {
    const newUnit = {
      id: `unit-${Date.now()}`,
      title: `Unit ${units.length + 1}: New Unit`,
      description: 'Estimated 0 mins',
      icon: 'grid',
      isExpanded: true,
      lessons: []
    };
    setUnits([...units, newUnit]);
  };

  // 4. Thêm Lesson mới vào Unit
  const addLesson = (unitId) => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          lessons: [...unit.lessons, {
            id: `l-${Date.now()}`,
            title: 'New Lesson',
            type: 'Theory',
            duration: '0 mins',
            status: 'Draft',
            iconType: 'reading',
            color: 'emerald'
          }]
        };
      }
      return unit;
    }));
  };

  // 5. Cập nhật tên Lesson
  const updateLessonTitle = (unitId, lessonId, newTitle) => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        return {
          ...unit,
          lessons: unit.lessons.map(lesson => 
            lesson.id === lessonId ? { ...lesson, title: newTitle } : lesson
          )
        };
      }
      return unit;
    }));
  };

  // 6. Xóa Lesson
  const deleteLesson = (unitId, lessonId) => {
    if(!window.confirm("Are you sure you want to delete this lesson?")) return;
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        return { ...unit, lessons: unit.lessons.filter(l => l.id !== lessonId) };
      }
      return unit;
    }));
  };

  // 7. Di chuyển Lesson (Lên/Xuống) - Thay thế cho Drag & Drop
  const moveLesson = (unitId, lessonIndex, direction) => {
    setUnits(units.map(unit => {
      if (unit.id === unitId) {
        const newLessons = [...unit.lessons];
        if (direction === 'up' && lessonIndex > 0) {
          [newLessons[lessonIndex - 1], newLessons[lessonIndex]] = [newLessons[lessonIndex], newLessons[lessonIndex - 1]];
        } else if (direction === 'down' && lessonIndex < newLessons.length - 1) {
          [newLessons[lessonIndex + 1], newLessons[lessonIndex]] = [newLessons[lessonIndex], newLessons[lessonIndex + 1]];
        }
        return { ...unit, lessons: newLessons };
      }
      return unit;
    }));
  };

  // Helper render Icon
  const renderLessonIcon = (type, color) => {
    const colorClasses = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500',
      emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500',
      purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-500'
    };
    const css = colorClasses[color] || colorClasses.blue;

    return (
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${css}`}>
        {type === 'listening' && <Headphones className="w-6 h-6" />}
        {type === 'reading' && <Book className="w-6 h-6" />}
        {type === 'quiz' && <Sparkles className="w-6 h-6" />}
      </div>
    );
  };

  // Tính toán tổng quan
  const totalUnits = units.length;
  const totalLessons = units.reduce((acc, unit) => acc + unit.lessons.length, 0);

  return (
    <div className="bg-[#f8f8f6] dark:bg-[#221f10] text-slate-800 dark:text-slate-100 min-h-screen flex font-display">
      
      {/* Main Content Area */}
      <main className="flex-1 p-8">
        
        {/* Header & Breadcrumbs */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <nav className="flex items-center gap-2 text-slate-400 dark:text-slate-500 text-sm mb-1">
              <a href="#" className="hover:text-[#eecd2b] transition-colors">Courses</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-slate-600 dark:text-slate-300 font-semibold">{courseTitle}</span>
            </nav>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Course Structure Manager</h1>
          </div>
          <button 
            onClick={addUnit}
            className="bg-[#eecd2b] hover:bg-[#eecd2b]/90 text-[#221f10] px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-[#eecd2b]/20 transition-all active:scale-95"
          >
            <Plus className="w-5 h-5" />
            <span>Add Unit</span>
          </button>
        </header>

        <div className="max-w-5xl space-y-6">
          
          {units.map((unit, unitIndex) => (
            <section key={unit.id} className="bg-white dark:bg-slate-800/50 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 overflow-hidden transition-all">
              
              {/* Unit Header */}
              <div 
                className="p-6 flex items-center justify-between bg-slate-50/50 dark:bg-slate-700/30 border-b border-slate-200 dark:border-slate-700/50 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                onClick={() => toggleUnit(unit.id)}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="bg-[#eecd2b]/10 dark:bg-[#eecd2b]/20 text-[#eecd2b] w-10 h-10 rounded-lg flex items-center justify-center">
                    {unit.icon === 'grid' ? <LayoutGrid className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    {/* Inline edit Unit Title (Click stop propagation to avoid toggling) */}
                    <input 
                      type="text"
                      className="text-lg font-bold text-slate-900 dark:text-white bg-transparent border-none focus:ring-1 focus:ring-[#eecd2b] p-0 w-full"
                      value={unit.title}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateUnitTitle(unit.id, e.target.value)}
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-400">{unit.lessons.length} Lessons • {unit.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    {unit.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Lessons List (Chỉ hiện khi Expanded) */}
              {unit.isExpanded && (
                <div className="p-4 space-y-2">
                  
                  {unit.lessons.map((lesson, lessonIndex) => (
                    <div key={lesson.id} className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-slate-700/30 hover:border-[#eecd2b]/50 dark:hover:border-[#eecd2b]/50 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-all">
                      
                      {/* Thao tác di chuyển lên/xuống (MVP) thay vì Kéo thả */}
                      <div className="flex flex-col text-slate-300 dark:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => moveLesson(unit.id, lessonIndex, 'up')} disabled={lessonIndex === 0} className="hover:text-[#eecd2b] disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                        <button onClick={() => moveLesson(unit.id, lessonIndex, 'down')} disabled={lessonIndex === unit.lessons.length - 1} className="hover:text-[#eecd2b] disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                      </div>

                      {renderLessonIcon(lesson.iconType, lesson.color)}
                      
                      <div className="flex-1">
                        {/* Inline edit Lesson Title */}
                        <input 
                          type="text"
                          className="font-bold text-slate-800 dark:text-slate-200 bg-transparent border-none focus:ring-1 focus:ring-[#eecd2b] p-0 w-full"
                          value={lesson.title}
                          onChange={(e) => updateLessonTitle(unit.id, lesson.id, e.target.value)}
                        />
                        <p className="text-xs text-slate-400 font-medium">{lesson.type} • {lesson.duration}</p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full ${lesson.status === 'Published' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                          {lesson.status}
                        </span>
                        
                        {/* Nút thao tác */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 text-slate-400 hover:text-[#eecd2b] transition-colors"><Edit className="w-4 h-4" /></button>
                          <button onClick={() => deleteLesson(unit.id, lesson.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Add Lesson Button */}
                  <button 
                    onClick={() => addLesson(unit.id)}
                    className="w-full py-4 mt-4 border-2 border-dashed border-slate-200 dark:border-slate-700/50 rounded-xl text-slate-400 hover:text-[#eecd2b] hover:border-[#eecd2b]/50 hover:bg-[#eecd2b]/5 transition-all flex items-center justify-center gap-2 font-bold group"
                  >
                    <PlusCircle className="w-5 h-5 text-slate-300 group-hover:text-[#eecd2b] transition-colors" />
                    <span>Add Lesson to {unit.title.split(':')[0]}</span>
                  </button>
                </div>
              )}
            </section>
          ))}

        </div>

        {/* Sticky Footer Summary */}
        <div className="mt-12 p-6 bg-[#eecd2b]/10 border border-[#eecd2b]/20 rounded-2xl flex flex-wrap items-center justify-between max-w-5xl gap-4">
          <div className="flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Units</span>
              <span className="text-2xl font-extrabold text-[#221f10] dark:text-white">{totalUnits}</span>
            </div>
            <div className="h-10 w-px bg-[#eecd2b]/30"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total Lessons</span>
              <span className="text-2xl font-extrabold text-[#221f10] dark:text-white">{totalLessons}</span>
            </div>
            <div className="h-10 w-px bg-[#eecd2b]/30"></div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm font-bold text-[#221f10] dark:text-white">All Saved</span>
              </div>
            </div>
          </div>
          <button className="bg-[#221f10] dark:bg-white text-white dark:text-[#221f10] px-6 py-2 rounded-full font-bold text-sm hover:opacity-90 transition-opacity">
            Preview Course
          </button>
        </div>

      </main>
    </div>
  );
};

export default CourseManager;