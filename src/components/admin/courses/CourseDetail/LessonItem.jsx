import React, { useState, useEffect } from 'react';
import { Headphones, Book, Sparkles, ArrowUp, ArrowDown, Edit, Trash2, AlignLeft, FileEdit, Mic, Check, X as CloseIcon } from 'lucide-react';
import { useNavigate } from 'react-router';

const LessonItem = ({
    lesson,
    index,
    totalLessons,
    onUpdateTitle,
    onMoveUp,
    onMoveDown,
    onDelete
}) => {
    const navigate = useNavigate();
    
    const [localTitle, setLocalTitle] = useState(lesson.title);
    
    const isTitleChanged = localTitle !== lesson.title;

    useEffect(() => {
        setLocalTitle(lesson.title);
    }, [lesson.title]);

    const handleSaveTitle = (e) => {
        e?.stopPropagation();
        if (localTitle.trim() === '') {
            setLocalTitle(lesson.title);
            return;
        }
        
        onUpdateTitle(localTitle);
    };

    const handleCancelEdit = (e) => {
        e?.stopPropagation();
        setLocalTitle(lesson.title);
    };

    const renderIcon = () => {
        const lessonType = lesson.type?.toLowerCase() || 'grammar';

        const typeConfig = {
            grammar: { bg: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500', icon: <AlignLeft className="w-6 h-6" /> },
            listening: { bg: 'bg-blue-50 dark:bg-blue-900/20 text-blue-500', icon: <Headphones className="w-6 h-6" /> },
            reading: { bg: 'bg-purple-50 dark:bg-purple-900/20 text-purple-500', icon: <Book className="w-6 h-6" /> },
            writing: { bg: 'bg-amber-50 dark:bg-amber-900/20 text-amber-500', icon: <FileEdit className="w-6 h-6" /> },
            speaking: { bg: 'bg-rose-50 dark:bg-rose-900/20 text-rose-500', icon: <Mic className="w-6 h-6" /> }
        };

        const config = typeConfig[lessonType] || typeConfig.grammar;

        return (
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${config.bg}`}>
                {config.icon}
            </div>
        );
    };

    const handleEditClick = () => {
        const targetId = lesson.lessonId || lesson.id;
        const typeForUrl = lesson.type?.toLowerCase();
        navigate(`/admin/courses/builder/${typeForUrl}/${targetId}`);
    };

    return (
        <div className="group flex items-center gap-4 p-4 rounded-xl border border-slate-100 dark:border-[#3d3821] hover:border-[#eecd2b]/50 dark:hover:border-[#eecd2b]/50 hover:bg-[#f8f8f6] dark:hover:bg-[#221f10]/50 transition-all">

            {/* Nút di chuyển lên/xuống */}
            <div className="flex flex-col text-slate-300 dark:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button onClick={onMoveUp} disabled={index === 0} className="hover:text-[#eecd2b] disabled:opacity-30 p-0.5">
                    <ArrowUp className="w-4 h-4" />
                </button>
                <button onClick={onMoveDown} disabled={index === totalLessons - 1} className="hover:text-[#eecd2b] disabled:opacity-30 p-0.5">
                    <ArrowDown className="w-4 h-4" />
                </button>
            </div>

            {renderIcon()}

            <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center w-full gap-2">
                    {/* Sửa tên bài học trực tiếp (Inline Edit) */}
                    <input
                        type="text"
                        className={`font-bold text-slate-800 dark:text-gray-200 bg-transparent border-b-2 focus:ring-0 p-0 w-full outline-none transition-all ${
                            isTitleChanged ? 'border-[#eecd2b]' : 'border-transparent hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                        value={localTitle}
                        onClick={(e) => e.stopPropagation()}
                        onChange={(e) => setLocalTitle(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSaveTitle(e);
                            if (e.key === 'Escape') handleCancelEdit(e);
                        }}
                    />
                    
                    {/* Nút Save/Cancel chỉ hiện ra khi người dùng đang gõ nội dung mới */}
                    {isTitleChanged && (
                        <div className="flex items-center gap-1 shrink-0">
                            <button onClick={handleSaveTitle} className="p-1 bg-green-100 text-green-600 hover:bg-green-200 rounded-md transition-colors" title="Save Title">
                                <Check className="w-4 h-4" />
                            </button>
                            <button onClick={handleCancelEdit} className="p-1 bg-red-100 text-red-600 hover:bg-red-200 rounded-md transition-colors" title="Cancel">
                                <CloseIcon className="w-4 h-4" />
                            </button>
                        </div>
                    )}
                </div>
                <p className="text-xs text-slate-400 font-medium capitalize mt-1">
                    {lesson.type?.toLowerCase()} • {lesson.durationMinutes || 0} mins
                </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
                <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-widest rounded-full ${lesson.status === 'PUBLISHED' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
                    {lesson.status}
                </span>

                {/* Nút thao tác Sửa/Xóa */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={handleEditClick} className="p-2 text-slate-400 hover:text-[#eecd2b] transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={onDelete} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
            </div>
        </div>
    );
};

export default LessonItem;