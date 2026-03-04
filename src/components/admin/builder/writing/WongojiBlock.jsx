import React from 'react';

const WongojiBlock = ({ data, onChange }) => {
  return (
    <div className="p-6 flex flex-col md:flex-row gap-8 items-start">
      <div className="flex-1 w-full overflow-hidden">
        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-4">Live Preview (Wongoji Layout)</label>
        <div className="bg-[#f8f8f6] dark:bg-[#221f10] p-6 rounded-lg overflow-x-auto border border-[#eecd2b]/10">
          <div className="inline-block border border-[#eecd2b]/40 bg-white">
            {/* Render visual preview grid (Fixed at max 4x10 for UI purposes to not break layout) */}
            {Array.from({ length: Math.min(4, Math.max(1, data.rows || 1)) }).map((_, rIdx) => (
              <div key={rIdx} className="flex">
                {Array.from({ length: Math.min(10, Math.max(1, data.cols || 1)) }).map((_, cIdx) => (
                  <div key={cIdx} className="w-7 h-7 border border-[#eecd2b]/40 inline-block -mr-[1px] -mb-[1px]"></div>
                ))}
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[#5e5836] mt-3 italic text-center">Stylized traditional manuscript paper view</p>
        </div>
      </div>
      <div className="w-full md:w-64 space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Rows</label>
          <div className="flex items-center gap-2">
            <button onClick={() => onChange('rows', Math.max(1, data.rows - 1))} className="w-8 h-8 rounded bg-[#eecd2b]/10 flex items-center justify-center hover:bg-[#eecd2b]/20 text-[#eecd2b] font-bold">-</button>
            <input 
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-center text-sm font-bold outline-none" 
              type="number" 
              value={data.rows}
              onChange={(e) => onChange('rows', parseInt(e.target.value) || 1)}
            />
            <button onClick={() => onChange('rows', data.rows + 1)} className="w-8 h-8 rounded bg-[#eecd2b]/10 flex items-center justify-center hover:bg-[#eecd2b]/20 text-[#eecd2b] font-bold">+</button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Columns</label>
          <div className="flex items-center gap-2">
            <button onClick={() => onChange('cols', Math.max(1, data.cols - 1))} className="w-8 h-8 rounded bg-[#eecd2b]/10 flex items-center justify-center hover:bg-[#eecd2b]/20 text-[#eecd2b] font-bold">-</button>
            <input 
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-center text-sm font-bold outline-none" 
              type="number" 
              value={data.cols}
              onChange={(e) => onChange('cols', parseInt(e.target.value) || 1)}
            />
            <button onClick={() => onChange('cols', data.cols + 1)} className="w-8 h-8 rounded bg-[#eecd2b]/10 flex items-center justify-center hover:bg-[#eecd2b]/20 text-[#eecd2b] font-bold">+</button>
          </div>
        </div>
        <div className="pt-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              className="rounded text-[#eecd2b] focus:ring-[#eecd2b] border-[#eecd2b]/30 bg-transparent w-4 h-4 cursor-pointer" 
              type="checkbox"
              checked={data.showGrid}
              onChange={(e) => onChange('showGrid', e.target.checked)}
            />
            <span className="text-xs font-medium">Show grid to user</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default WongojiBlock;