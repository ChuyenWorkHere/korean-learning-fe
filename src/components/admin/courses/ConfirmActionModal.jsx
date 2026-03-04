import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';

const ConfirmActionModal = ({ isOpen, title, message, confirmText, isDestructive, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#ffffff] dark:bg-[#2d2916] max-w-sm w-full rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-8 text-center">
          <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-6 ${isDestructive ? 'bg-red-100 dark:bg-red-900/30 text-red-500' : 'bg-[#eac82e]/10 text-[#eac82e]'}`}>
            {isDestructive ? <Trash2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
          </div>
          <h2 className="text-xl font-bold text-[#1b190d] dark:text-white mb-3">{title}</h2>
          <p className="text-sm text-[#1b190d]/70 dark:text-[#f0ede4]/70 leading-relaxed">{message}</p>
        </div>
        <div className="p-4 border-t border-[#eac82e]/10 bg-[#f8f8f6] dark:bg-[#211e11]/50 flex justify-center gap-3">
          <button onClick={onClose} className="flex-1 py-3 font-bold text-[#1b190d]/60 dark:text-white/60 hover:bg-[#1b190d]/5 dark:hover:bg-white/5 rounded-xl transition-colors">
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className={`flex-1 py-3 font-bold rounded-xl shadow-md transition-all active:scale-95 ${
              isDestructive ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/20' : 'bg-[#eac82e] hover:bg-[#eac82e]/90 text-[#211e11] shadow-[#eac82e]/20'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmActionModal;