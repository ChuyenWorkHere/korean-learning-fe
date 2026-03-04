import React from 'react';
import { Layers, BookOpen, Users, MoreVertical, Eye, EyeOff, Trash2 } from 'lucide-react';
import { AVAILABLE_ICONS } from '../constants';
import { Link } from 'react-router';

const AdminCourseCard = ({ course, isMenuOpen, onToggleMenu, onToggleStatus, onDelete }) => {
  const iconData = AVAILABLE_ICONS.find(i => i.name === course.iconName);
  const IconComponent = iconData ? iconData.icon : BookOpen;
  const isPublished = course.status === 'PUBLISHED';

  return (
    <div className={`group bg-[#ffffff] dark:bg-[#2d2916] rounded-xl border border-[#eac82e]/5 hover:border-[#eac82e]/40 hover:shadow-xl transition-all flex flex-col relative ${!isPublished ? 'opacity-80 hover:opacity-100' : ''}`}>

      {/* Top Section */}
      <div className="h-32 bg-[#eac82e]/5 dark:bg-[#eac82e]/10 rounded-t-xl flex items-center justify-center relative">
        <div className="w-16 h-16 bg-[#eac82e]/20 rounded-xl flex items-center justify-center">
          <IconComponent className="text-[#eac82e] w-8 h-8" />
        </div>
        <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full ${isPublished ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-[#1b190d]/10 dark:bg-[#f0ede4]/10 text-[#1b190d]/50 dark:text-[#f0ede4]/50'}`}>
          {course.status}
        </span>
      </div>

      {/* Body Section */}
      <div className="p-5 flex-1 flex flex-col relative z-10">
        <span className="inline-block w-fit px-2 py-1 rounded bg-[#f8f8f6] dark:bg-[#211e11] text-[#eac82e] text-[10px] font-bold uppercase tracking-wide mb-3">
          {course.level}
        </span>
        <h3 className="text-lg font-bold leading-tight group-hover:text-[#eac82e] transition-colors line-clamp-2 text-[#1b190d] dark:text-white">
          {course.title}
        </h3>

        <div className="flex items-center justify-between mt-auto text-[#1b190d]/50 dark:text-[#f0ede4]/50 border-t border-[#eac82e]/5 pt-4">
          <div className="flex flex-col items-center">
            <Layers className="w-4 h-4" />
            <span className="text-[11px] font-semibold mt-1 uppercase">{course.units} Units</span>
          </div>
          <div className="flex flex-col items-center border-x border-[#eac82e]/5 px-4 flex-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-[11px] font-semibold mt-1 uppercase">{course.lessons} Lessons</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-4 h-4" />
            <span className={`text-[11px] font-semibold mt-1 uppercase ${course.enrolled !== '0' ? 'text-[#eac82e]' : ''}`}>
              {course.enrolled} Enrolled
            </span>
          </div>
        </div>
      </div>

      {/* Actions Footer */}
      <div className={`px-5 pb-5 pt-2 flex items-center gap-3 relative ${isMenuOpen ? 'z-50' : 'z-20'}`}>
        <Link
          to={`/admin/courses/${course.courseId}/units`}
          className="flex-1 py-2 px-4 text-center rounded-lg border-2 border-[#eac82e]/20 text-[#eac82e] font-bold text-xs hover:bg-[#eac82e] hover:text-[#211e11] transition-all uppercase"
        >
          {isPublished ? 'Edit Structure' : 'Continue Setup'}
        </Link>

        <div className="relative">
          <button
            onClick={onToggleMenu}
            className={`p-2 rounded-lg transition-colors ${isMenuOpen ? 'bg-[#eac82e]/10 text-[#eac82e]' : 'text-[#1b190d]/40 dark:text-[#f0ede4]/40 hover:text-[#eac82e]'}`}
          >
            <MoreVertical className="w-5 h-5" />
          </button>

          {isMenuOpen && (
            <div className="absolute right-0 bottom-full mb-2 w-48 bg-[#ffffff] dark:bg-[#221f10] rounded-xl shadow-xl border border-[#eac82e]/20 overflow-hidden py-1 animate-in fade-in zoom-in-95">
              <button
                onClick={onToggleStatus}
                className="w-full text-left px-4 py-2.5 text-sm hover:bg-[#eac82e]/10 text-[#1b190d] dark:text-white flex items-center gap-3 transition-colors"
              >
                {isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {isPublished ? 'Move to Draft' : 'Publish Course'}
              </button>
              <div className="h-px bg-[#eac82e]/10 my-1"></div>
              <button
                onClick={onDelete}
                className="w-full text-left px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 flex items-center gap-3 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Delete Course
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCourseCard;