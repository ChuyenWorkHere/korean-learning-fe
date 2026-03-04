import React, { useState, useEffect } from 'react';
import {
  LayoutGrid, MessageSquare, MoreVertical, ChevronUp, ChevronDown,
  PlusCircle, ArrowUp, ArrowDown, Trash2, Check, X as CloseIcon
} from 'lucide-react';
import LessonItem from './LessonItem';

const UnitSection = ({
  unit,
  index,
  totalUnits,
  onToggle,
  onSaveUnitTitle, // Đổi tên hàm thành Save thay vì Update
  onAddLesson,
  onUpdateLessonTitle,
  onMoveLesson,
  onDeleteLesson,
  onMoveUnit,      // Hàm mới
  onDeleteUnit     // Hàm mới
}) => {
  // 1. Quản lý Title cục bộ để tránh re-render / gọi API liên tục
  const [localTitle, setLocalTitle] = useState(unit.title);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Sync lại localTitle nếu prop unit.title bị đổi từ bên ngoài
  useEffect(() => {
    setLocalTitle(unit.title);
  }, [unit.title]);

  // Kiểm tra xem user có đang sửa tên không
  const isTitleChanged = localTitle !== unit.title;

  const handleSaveTitle = (e) => {
    e?.stopPropagation();
    if (localTitle.trim() === '') {
      setLocalTitle(unit.title); // Phục hồi nếu bỏ trống
      return;
    }
    onSaveUnitTitle(localTitle);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setLocalTitle(unit.title);
  };

  return (
    <section className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-slate-200 dark:border-[#3d3821] overflow-visible transition-all">

      {/* Lớp phủ tàng hình để đóng menu khi click ra ngoài */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30" onClick={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}></div>
      )}

      {/* Unit Header */}
      <div
        className="p-6 flex items-center justify-between bg-slate-50/50 dark:bg-[#eecd2b]/5 border-b border-slate-200 dark:border-[#eecd2b]/10 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#eecd2b]/10 transition-colors"
        onClick={() => {
          // Chỉ toggle mở/đóng Unit nếu menu không mở
          if (!isMenuOpen) onToggle();
        }}
      >
        <div className="flex items-center gap-4 flex-1">
          <div className="bg-[#eecd2b]/10 dark:bg-[#eecd2b]/20 text-[#eecd2b] w-10 h-10 rounded-lg flex items-center justify-center shrink-0">
            {unit.icon === 'grid' ? <LayoutGrid className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
          </div>

          <div className="flex-1 flex flex-col items-start justify-center">
            <div className="flex items-center w-full gap-2">
              <input
                type="text"
                className={`text-lg font-bold text-slate-900 dark:text-white bg-transparent border-b-2 focus:ring-0 p-0 w-full outline-none transition-all ${isTitleChanged ? 'border-[#eecd2b]' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                  }`}
                value={localTitle}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => setLocalTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSaveTitle(e);
                  if (e.key === 'Escape') handleCancelEdit(e);
                }}
              />

              {/* Nút Save/Cancel chỉ hiện ra khi có sự thay đổi */}
              {isTitleChanged && (
                <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                  <button onClick={handleSaveTitle} className="p-1 bg-green-100 text-green-600 hover:bg-green-200 rounded-md transition-colors" title="Save Title">
                    <Check className="w-4 h-4" />
                  </button>
                  <button onClick={handleCancelEdit} className="p-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors" title="Cancel">
                    <CloseIcon className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
            <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">{unit.lessons.length} Lessons • {unit.lessons.reduce((total, lesson) => total + (lesson.duration ? parseInt(lesson.duration) : 0), 0)} mins</p>
          </div>
        </div>

        <div className="flex items-center gap-2 ml-4 relative z-40">

          {/* Menu Dropdown cho Unit */}
          <div className="relative">
            <button
              className={`p-2 rounded-lg transition-colors ${isMenuOpen ? 'bg-[#eecd2b]/10 text-[#eecd2b]' : 'text-slate-400 hover:text-slate-600 dark:hover:text-white'}`}
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <MoreVertical className="w-5 h-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#221f10] rounded-xl shadow-xl border border-slate-200 dark:border-[#eecd2b]/20 overflow-hidden py-1 animate-in fade-in zoom-in-95">
                <button
                  disabled={index === 0}
                  onClick={(e) => { e.stopPropagation(); onMoveUnit('up'); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#eecd2b]/10 text-slate-700 dark:text-white flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowUp className="w-4 h-4" /> Move Up
                </button>
                <button
                  disabled={index === totalUnits - 1}
                  onClick={(e) => { e.stopPropagation(); onMoveUnit('down'); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#eecd2b]/10 text-slate-700 dark:text-white flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ArrowDown className="w-4 h-4" /> Move Down
                </button>
                <div className="h-px bg-slate-200 dark:bg-[#eecd2b]/10 my-1"></div>
                <button
                  onClick={(e) => { e.stopPropagation(); onDeleteUnit(); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-50/50 dark:hover:bg-red-500/10 flex items-center gap-3 transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete Unit
                </button>
              </div>
            )}
          </div>

          <button className="p-2 bg-white dark:bg-[#221f10] rounded-lg border border-slate-200 dark:border-[#3d3821] text-slate-600 dark:text-gray-300 pointer-events-none">
            {unit.isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Danh sách Lessons (Giữ nguyên như cũ) */}
      {unit.isExpanded && (
        <div className="p-4 space-y-2 bg-slate-50/30 dark:bg-transparent">
          {unit.lessons.map((lesson, lessonIndex) => (
            <LessonItem
              key={lesson.lessonId}
              lesson={lesson}
              index={lessonIndex}
              totalLessons={unit.lessons.length}
              onUpdateTitle={(val) => onUpdateLessonTitle(lesson.lessonId, val)}
              onMoveUp={() => onMoveLesson(lessonIndex, 'up')}
              onMoveDown={() => onMoveLesson(lessonIndex, 'down')}
              onDelete={() => onDeleteLesson(lesson.lessonId)}
            />
          ))}

          <button
            onClick={(e) => { e.stopPropagation(); onAddLesson(); }}
            className="w-full py-4 mt-4 border-2 border-dashed border-slate-200 dark:border-[#eecd2b]/30 rounded-xl text-slate-400 hover:text-[#eecd2b] hover:border-[#eecd2b]/50 hover:bg-[#eecd2b]/5 transition-all flex items-center justify-center gap-2 font-bold group"
          >
            <PlusCircle className="w-5 h-5 text-slate-300 dark:text-[#eecd2b]/40 group-hover:text-[#eecd2b] transition-colors" />
            <span className="dark:text-gray-300 group-hover:text-[#eecd2b]">Add Lesson to {unit.title.split(':')[0]}</span>
          </button>
        </div>
      )}
    </section>
  );
};

export default UnitSection;