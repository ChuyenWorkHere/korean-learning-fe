import React from 'react';
import { Volume2, UploadCloud, PlusCircle, MinusCircle } from 'lucide-react';

const ExamplesBlock = ({ data, onChange }) => {

  const addExampleRow = () => {
    const newRows = [...data.rows, { id: `row-${Date.now()}`, ko: '', en: '' }];
    onChange('rows', newRows);
  };

  const updateExampleRow = (rowIndex, field, value) => {
    const newRows = [...data.rows];
    newRows[rowIndex][field] = value;
    onChange('rows', newRows);
  };

  const deleteExampleRow = (rowIndex) => {
    const newRows = [...data.rows];
    newRows.splice(rowIndex, 1);
    if (newRows.length === 0) newRows.push({ id: `row-${Date.now()}`, ko: '', en: '' });
    onChange('rows', newRows);
  };

  return (
    <div className="p-4 overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="text-xs uppercase text-[#1b190d]/60 dark:text-[#f8f8f6]/60 font-bold border-b border-[#eecd2b]/10">
            <th className="pb-3 px-4 w-5/12">Korean Sentence</th>
            <th className="pb-3 px-4 w-5/12">English Translation</th>
            <th className="pb-3 px-4 w-2/12 text-center">Audio</th>
            <th className="pb-3 w-10"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#eecd2b]/5">
          {data.rows.map((row, rIndex) => (
            <tr key={row.id} className="group/row hover:bg-[#f8f8f6] dark:hover:bg-[#221f10]/50 transition-colors">
              <td className="py-3 px-4">
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 p-1 outline-none text-[#1b190d] dark:text-white/60" 
                  type="text" placeholder="Korean..."
                  value={row.ko}
                  onChange={(e) => updateExampleRow(rIndex, 'ko', e.target.value)}
                />
              </td>
              <td className="py-3 px-4">
                <input 
                  className="w-full bg-transparent border-none focus:ring-0 p-1 text-[#1b190d] dark:text-white/60 outline-none" 
                  type="text" placeholder="English..."
                  value={row.en}
                  onChange={(e) => updateExampleRow(rIndex, 'en', e.target.value)}
                />
              </td>
              <td className="py-3 px-4 text-center">
                <div className="flex items-center justify-center gap-2">
                  <button className="p-2 text-[#eecd2b] hover:bg-[#eecd2b]/20 rounded-full transition-colors"><Volume2 className="w-4 h-4" /></button>
                  <button className="p-2 text-[#eecd2b]/40 hover:text-[#eecd2b] transition-colors"><UploadCloud className="w-4 h-4" /></button>
                </div>
              </td>
              <td className="py-3 text-center">
                <button onClick={() => deleteExampleRow(rIndex)} className="text-gray-300 hover:text-red-500 lg:opacity-0 group-hover/row:opacity-100 transition-colors">
                  <MinusCircle className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="px-4 mt-2">
        <button onClick={addExampleRow} className="text-sm font-semibold text-[#eecd2b] hover:underline flex items-center gap-1">
          <PlusCircle className="w-4 h-4" /> Add Row
        </button>
      </div>
    </div>
  );
};

export default ExamplesBlock;