import React from 'react';
import { X, Plus } from 'lucide-react';
import { AVAILABLE_ICONS } from '../constants';

const CreateCourseModal = ({ isOpen, isSubmitting, onClose, newCourse, setNewCourse, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#ffffff] dark:bg-[#2d2916] max-w-xl w-full rounded-2xl shadow-2xl overflow-auto scroll-smooth animate-in fade-in zoom-in-95 duration-200 my-8">
        <div className="flex justify-between items-center p-6 border-b border-[#eac82e]/10">
          <div>
            <h2 className="text-xl font-bold text-[#1b190d] dark:text-white">Create New Course</h2>
            <p className="text-sm text-[#1b190d]/60 dark:text-[#f0ede4]/60 mt-1">Start by giving your course a name and difficulty level.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-[#eac82e]/10 rounded-full text-[#1b190d]/40 dark:text-white/40 hover:text-red-500 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <form onSubmit={onSubmit}>
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#1b190d]/60 dark:text-[#eac82e]/80 uppercase mb-2">Course Title</label>
              <input 
                type="text" required autoFocus placeholder="e.g. TOPIK II Masterclass" 
                className="w-full bg-[#f8f8f6] dark:bg-[#211e11] border border-[#eac82e]/20 rounded-xl p-4 text-base focus:ring-2 focus:ring-[#eac82e] outline-none transition-all text-[#1b190d] dark:text-white"
                value={newCourse.title} onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })} 
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-[#1b190d]/60 dark:text-[#eac82e]/80 uppercase mb-2">Difficulty Level</label>
              <select 
                className="w-full bg-[#f8f8f6] dark:bg-[#211e11] border border-[#eac82e]/20 rounded-xl p-4 text-base focus:ring-2 focus:ring-[#eac82e] outline-none cursor-pointer text-[#1b190d] dark:text-white"
                value={newCourse.level} onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
              >
                <option value="BEGINNER">Beginner (A1 - A2)</option>
                <option value="INTERMEDIATE">Intermediate (B1 - B2)</option>
                <option value="EXPERT">Expert (C1 - C2)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1b190d]/60 dark:text-[#eac82e]/80 uppercase mb-3">Course Icon</label>
              <div className="grid grid-cols-5 gap-3 max-h-48 overflow-y-auto custom-scrollbar p-2 bg-[#f8f8f6] dark:bg-[#211e11] rounded-xl border border-[#eac82e]/20">
                {AVAILABLE_ICONS.map((item) => {
                  const Icon = item.icon;
                  const isSelected = newCourse.iconName === item.name;
                  return (
                    <button
                      key={item.name} type="button" onClick={() => setNewCourse({ ...newCourse, iconName: item.name })}
                      className={`flex items-center justify-center p-3 rounded-xl border-2 transition-all ${
                        isSelected ? 'border-[#eac82e] bg-[#eac82e]/10 text-[#eac82e]' : 'border-[#eac82e]/10 hover:border-[#eac82e]/40 bg-[#f8f8f6] dark:bg-[#211e11] text-[#1b190d]/40 dark:text-white/40 hover:text-[#eac82e]'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          <div className="p-6 border-t border-[#eac82e]/10 bg-[#f8f8f6] dark:bg-[#211e11]/50 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-3 font-bold text-[#1b190d]/60 dark:text-white/60 hover:bg-[#1b190d]/5 dark:hover:bg-white/5 rounded-xl transition-colors">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="px-6 py-3 font-bold bg-[#eac82e] text-[#211e11] rounded-xl hover:bg-[#eac82e]/90 shadow-md shadow-[#eac82e]/20 transition-all active:scale-95 flex items-center gap-2">
              <Plus className="w-5 h-5" /> Create Draft
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourseModal;