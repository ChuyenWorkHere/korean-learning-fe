import React from 'react';
import { Check, Trash2, PlusCircle } from 'lucide-react';

const UsageNoteBlock = ({ data, onChange }) => {
  
  const addNoteRow = () => {
    const newNotes = [...data.notes, { id: `note-${Date.now()}`, text: '' }];
    onChange('notes', newNotes);
  };

  const updateNoteRow = (noteIndex, value) => {
    const newNotes = [...data.notes];
    newNotes[noteIndex].text = value;
    onChange('notes', newNotes);
  };

  const deleteNoteRow = (noteIndex) => {
    const newNotes = [...data.notes];
    newNotes.splice(noteIndex, 1);
    if (newNotes.length === 0) {
      newNotes.push({ id: `note-${Date.now()}`, text: '' });
    }
    onChange('notes', newNotes);
  };

  return (
    <div className="p-6 space-y-4">
      {data.notes.map((note, nIndex) => (
        <div key={note.id} className="flex items-start gap-3 group/row">
          <div className="w-5 h-5 rounded-full bg-[#eecd2b] flex items-center justify-center mt-2.5 flex-shrink-0">
            <Check className="w-3 h-3 text-[#1b190d] stroke-[3]" />
          </div>
          <div className="flex-1 flex items-center gap-2 bg-[#f8f8f6] dark:bg-[#221f10] border border-[#e7e3cf] dark:border-[#3d3821] rounded-lg p-2 focus-within:border-[#eecd2b] transition-all">
            <input 
              className="w-full bg-transparent border-none focus:ring-0 p-1 outline-none text-[#1b190d] dark:text-white" 
              type="text" 
              placeholder="e.g. Used for 1st person (I) and 2nd person (You) questions."
              value={note.text}
              onChange={(e) => updateNoteRow(nIndex, e.target.value)}
            />
            <button 
              onClick={() => deleteNoteRow(nIndex)} 
              className="p-2 text-[#9a8d4c] hover:text-red-500 opacity-0 group-hover/row:opacity-100 transition-opacity"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      <button onClick={addNoteRow} className="mt-2 text-sm font-semibold text-[#eecd2b] hover:underline flex items-center gap-1 px-2">
        <PlusCircle className="w-4 h-4" /> Add Note
      </button>
    </div>
  );
};

export default UsageNoteBlock;