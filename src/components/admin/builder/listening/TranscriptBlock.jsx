import React, { useState } from 'react';
import { MinusCircle, PlusCircle, Sparkles, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { fileService } from '../../../../services/fileService';
import { formatMsToTime } from '../../../../utils/helpers';


const TranscriptBlock = ({ data, onChange, isGenerating}) => {


  // --- LOGIC QUẢN LÝ DÒNG THOẠI (ROWS) ---
  const addRow = () => {
    const newRows = [...data.rows, { id: `row-${Date.now()}`, time: '', speaker: '', ko: '', en: '' }];
    onChange('rows', newRows);
  };

  const updateRow = (rowIndex, field, value) => {
    const newRows = [...data.rows];
    newRows[rowIndex][field] = value;
    onChange('rows', newRows);
  };

  const deleteRow = (rowIndex) => {
    const newRows = [...data.rows];
    newRows.splice(rowIndex, 1);
    // Luôn giữ lại ít nhất 1 dòng trống
    if (newRows.length === 0) newRows.push({ id: `row-${Date.now()}`, time: '', speaker: '', ko: '', en: '' });
    onChange('rows', newRows);
  };



  return (
    <div className="p-6">

      {/* --- HEADER & NÚT AI --- */}


      {/* --- TIÊU ĐỀ CÁC CỘT --- */}
      <div className="grid grid-cols-12 gap-4 mb-4 text-[11px] font-bold uppercase tracking-wider opacity-40 px-2 text-[#1b190d] dark:text-white">
        <div className="col-span-2 lg:col-span-1 text-center">Time</div>
        <div className="col-span-3 lg:col-span-2">Speaker</div>
        <div className="col-span-6 lg:col-span-4">Korean Text</div>
        <div className="hidden lg:block lg:col-span-4">English Translation</div>
        <div className="col-span-1"></div>
      </div>

      {/* --- DANH SÁCH DÒNG THOẠI --- */}
      {data.rows?.map((row, rIndex) => (
        <div key={row.id} className="grid grid-cols-12 gap-2 lg:gap-4 items-start mb-4 p-2 hover:bg-[#eecd2b]/5 rounded-lg border border-transparent hover:border-[#eecd2b]/10 transition-all group/row">
          <div className="col-span-2 lg:col-span-1">
            <input
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 rounded text-xs px-2 py-2 focus:ring-1 focus:ring-[#eecd2b] outline-none text-center font-mono"
              type="text" placeholder="0:00"
              value={row.time} onChange={(e) => updateRow(rIndex, 'time', e.target.value)}
            />
          </div>
          <div className="col-span-3 lg:col-span-2">
            <input
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 rounded text-xs px-2 py-2 focus:ring-1 focus:ring-[#eecd2b] outline-none font-bold text-center"
              type="text" placeholder="Name"
              value={row.speaker} onChange={(e) => updateRow(rIndex, 'speaker', e.target.value)}
            />
          </div>
          <div className="col-span-6 lg:col-span-4">
            <textarea
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 rounded text-sm px-2 py-2 focus:ring-1 focus:ring-[#eecd2b] outline-none resize-y min-h-[40px]"
              rows="1" placeholder="Korean transcript..."
              value={row.ko} onChange={(e) => updateRow(rIndex, 'ko', e.target.value)}
            />
          </div>
          <div className="col-span-11 lg:col-span-4 mt-2 lg:mt-0 lg:col-start-auto col-start-3">
            <textarea
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 rounded text-sm px-2 py-2 focus:ring-1 focus:ring-[#eecd2b] outline-none resize-y min-h-[40px] text-[#1b190d]/70 dark:text-white/70"
              rows="1" placeholder="English translation..."
              value={row.en} onChange={(e) => updateRow(rIndex, 'en', e.target.value)}
            />
          </div>
          <div className="col-span-1 flex justify-center items-center h-10">
            <button onClick={() => deleteRow(rIndex)} className="text-[#1b190d]/20 dark:text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover/row:opacity-100 p-1">
              <MinusCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      {/* --- NÚT THÊM DÒNG --- */}
      <button onClick={addRow} className="mt-4 w-full py-3 border-2 border-dotted border-[#eecd2b]/40 rounded-xl text-[#eecd2b] font-medium hover:bg-[#eecd2b]/5 transition-colors flex items-center justify-center gap-2">
        <PlusCircle className="w-4 h-4" /> Add New Row
      </button>

      {/* --- MODAL LOADING UPLOAD --- */}
      {isGenerating && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-[#2d2916] p-8 rounded-2xl shadow-2xl flex flex-col items-center max-w-sm w-full mx-4 border border-[#eecd2b]/20 animate-in fade-in zoom-in-95">
            <Loader2 className="w-12 h-12 text-[#eecd2b] animate-spin mb-4" />
            <h3 className="text-lg font-bold text-[#1b190d] dark:text-white mb-2">
              Generating transcript...
            </h3>
            <p className="text-sm text-center text-[#5e5836] dark:text-[#f0ede4]/70">
              Please wait while AI is generating the transcript. This may take a few moments depending on the file size.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptBlock;