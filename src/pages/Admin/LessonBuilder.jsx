import React, { useState } from 'react';
import { 
  ArrowLeft, AlignLeft, Sigma, Headphones, List, HelpCircle, 
  ChevronUp, ChevronDown, Trash2, Volume2, UploadCloud, PlusCircle,
  CheckCircle, Check
} from 'lucide-react';

const LessonBuilder = () => {
  const [lessonTitle, setLessonTitle] = useState('Lesson 14: Expressing Desires with -고 싶다');
  
  const [blocks, setBlocks] = useState([
    { 
      id: 'block-1', 
      type: 'text', 
      content: "The grammar pattern -고 싶다 is attached to the stem of a verb to express the speaker's desire." 
    },
    {
      id: 'block-2',
      type: 'usage_note',
      notes: [
        { id: 'note-1', text: 'Used for 1st person (I) and 2nd person (You) questions.' },
        { id: 'note-2', text: 'For 3rd person, use -고 싶어하다.' }
      ]
    },
    { 
      id: 'block-3', 
      type: 'formula', 
      pattern: 'Stem + -고 싶다', 
      meaning: 'I want to...' 
    }
  ]);

  // --- LOGIC XỬ LÝ ---

  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    if (type === 'text') newBlock.content = '';
    if (type === 'formula') { newBlock.pattern = ''; newBlock.meaning = ''; }
    if (type === 'examples') newBlock.rows = [{ id: `row-${Date.now()}`, ko: '', en: '' }];
    
    // Khởi tạo cho block Usage Note
    if (type === 'usage_note') {
      newBlock.notes = [{ id: `note-${Date.now()}`, text: '' }];
    }

    if (type === 'quiz') {
      newBlock.question = '';
      newBlock.explanation = '';
      newBlock.options = [
        { id: `opt-${Date.now()}-1`, text: '', isCorrect: true },
        { id: `opt-${Date.now()}-2`, text: '', isCorrect: false },
        { id: `opt-${Date.now()}-3`, text: '', isCorrect: false },
        { id: `opt-${Date.now()}-4`, text: '', isCorrect: false },
      ];
    }
    
    setBlocks([...blocks, newBlock]);
  };

  const moveBlock = (index, direction) => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setBlocks(newBlocks);
  };

  const deleteBlock = (index) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks(newBlocks);
  };

  const updateBlock = (index, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[index][field] = value;
    setBlocks(newBlocks);
  };

  // Logic cho block Usage Note (NEW)
  const addUsageNoteRow = (blockIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].notes.push({ id: `note-${Date.now()}`, text: '' });
    setBlocks(newBlocks);
  };

  const updateUsageNoteRow = (blockIndex, noteIndex, value) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].notes[noteIndex].text = value;
    setBlocks(newBlocks);
  };

  const deleteUsageNoteRow = (blockIndex, noteIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].notes.splice(noteIndex, 1);
    // Luôn giữ lại ít nhất 1 dòng trống
    if (newBlocks[blockIndex].notes.length === 0) {
      newBlocks[blockIndex].notes.push({ id: `note-${Date.now()}`, text: '' });
    }
    setBlocks(newBlocks);
  };

  // Logic cho block Examples
  const addExampleRow = (blockIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].rows.push({ id: `row-${Date.now()}`, ko: '', en: '' });
    setBlocks(newBlocks);
  };

  const updateExampleRow = (blockIndex, rowIndex, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].rows[rowIndex][field] = value;
    setBlocks(newBlocks);
  };

  // Logic cho block Quiz
  const updateQuizOption = (blockIndex, optionIndex, field, value) => {
    const newBlocks = [...blocks];
    if (field === 'isCorrect') {
      newBlocks[blockIndex].options.forEach(opt => opt.isCorrect = false);
      newBlocks[blockIndex].options[optionIndex].isCorrect = true;
    } else {
      newBlocks[blockIndex].options[optionIndex][field] = value;
    }
    setBlocks(newBlocks);
  };

  // --- RENDER GIAO DIỆN KHỐI ĐIỀU KHIỂN ---
  const renderBlockControls = (index) => (
    <div className="flex items-center gap-1 bg-[#f8f8f6] dark:bg-[#221f10] rounded-lg p-1 border border-primary/20">
      <button 
        onClick={() => moveBlock(index, 'up')}
        disabled={index === 0}
        className="p-1 hover:bg-primary/20 rounded text-[#1b190d]/70 dark:text-[#f8f8f6]/70 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <button 
        onClick={() => moveBlock(index, 'down')}
        disabled={index === blocks.length - 1}
        className="p-1 hover:bg-primary/20 rounded text-[#1b190d]/70 dark:text-[#f8f8f6]/70 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-4 bg-primary/20 mx-1"></div>
      <button 
        onClick={() => deleteBlock(index)}
        className="p-1 hover:bg-red-500/20 text-red-500 rounded transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="bg-[#f8f8f6] dark:bg-[#221f10] text-[#1b190d] dark:text-[#f8f8f6] font-display min-h-screen">
      {/* Sticky Top Toolbar */}
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#2d2916] border-b border-primary/20 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1">
            <button className="p-2 hover:bg-primary/10 rounded-full transition-colors flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-primary" />
            </button>
            <div className="flex-1 max-w-2xl">
              <input 
                className="w-full bg-transparent border-none focus:ring-0 text-xl font-bold placeholder-[#1b190d]/30 dark:placeholder-white/30 outline-none" 
                placeholder="Enter Lesson Title..." 
                type="text" 
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-5 py-2.5 font-medium rounded-lg border border-primary/40 hover:bg-primary/5 transition-all">
              Save Draft
            </button>
            <button className="px-6 py-2.5 font-bold rounded-lg bg-primary text-[#221f10] hover:brightness-105 shadow-md shadow-primary/20 transition-all">
              Publish Lesson
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8 p-8 min-h-[calc(100vh-5rem)]">
        
        {/* Left Panel: Content Blocks Sidebar */}
        <aside className="w-full md:w-1/4 sticky top-28 h-fit">
          <div className="bg-white dark:bg-[#2d2916] rounded-xl p-6 shadow-sm border border-primary/10">
            <h2 className="text-sm font-bold uppercase tracking-wider text-primary mb-6">Add Content</h2>
            <div className="space-y-3">
              <button onClick={() => handleAddBlock('text')} className="w-full group flex items-center gap-3 p-4 rounded-lg bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-primary cursor-pointer transition-all">
                <AlignLeft className="w-5 h-5 text-primary" />
                <span className="font-medium">Text Editor</span>
              </button>
              
              {/* NÚT THÊM USAGE NOTE MỚI */}
              <button onClick={() => handleAddBlock('usage_note')} className="w-full group flex items-center gap-3 p-4 rounded-lg bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-primary cursor-pointer transition-all">
                <CheckCircle className="w-5 h-5 text-primary" />
                <span className="font-medium">Usage Note</span>
              </button>

              <button onClick={() => handleAddBlock('formula')} className="w-full group flex items-center gap-3 p-4 rounded-lg bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-primary cursor-pointer transition-all">
                <Sigma className="w-5 h-5 text-primary" />
                <span className="font-medium">Formula Box</span>
              </button>
              <button onClick={() => handleAddBlock('examples')} className="w-full group flex items-center gap-3 p-4 rounded-lg bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-primary cursor-pointer transition-all">
                <List className="w-5 h-5 text-primary" />
                <span className="font-medium">Examples Table</span>
              </button>
              <button onClick={() => handleAddBlock('quiz')} className="w-full group flex items-center gap-3 p-4 rounded-lg bg-primary/10 border border-primary hover:bg-primary/20 cursor-pointer transition-all">
                <HelpCircle className="w-5 h-5 text-primary" />
                <span className="font-bold text-primary">Quick Quiz</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Right Panel: Main Editor Canvas */}
        <section className="flex-1 space-y-6">
          
          {blocks.map((block, index) => (
            <div key={block.id} className="relative group">
              
              {/* --- TEXT BLOCK --- */}
              {block.type === 'text' && (
                <div className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-primary/10 hover:border-primary/40 transition-colors overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-3 bg-primary/5 border-b border-primary/10">
                    <span className="text-xs font-bold uppercase text-primary/60 flex items-center gap-2">
                      <AlignLeft className="w-4 h-4" /> Text Block
                    </span>
                    {renderBlockControls(index)}
                  </div>
                  <div className="p-6">
                    <textarea 
                      className="w-full bg-transparent border-none focus:ring-0 text-lg leading-relaxed resize-y min-h-[100px] placeholder-[#1b190d]/20 dark:placeholder-white/20 outline-none" 
                      placeholder="Explain the core concept here..."
                      value={block.content}
                      onChange={(e) => updateBlock(index, 'content', e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* --- USAGE NOTE BLOCK (NEW) --- */}
              {block.type === 'usage_note' && (
                <div className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-primary/10 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <h3 className="font-bold">Usage Notes (Rules)</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => addUsageNoteRow(index)} className="flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                        <PlusCircle className="w-4 h-4" /> Add Note
                      </button>
                      {renderBlockControls(index)}
                    </div>
                  </div>
                  <div className="p-6 space-y-4">
                    {block.notes.map((note, nIndex) => (
                      <div key={note.id} className="flex items-start gap-3 group/row">
                        {/* Icon giả lập y hệt giao diện user */}
                        <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center mt-2.5 flex-shrink-0">
                          <Check className="w-3 h-3 text-white stroke-[3]" />
                        </div>
                        
                        <div className="flex-1 flex items-center gap-2 bg-[#f8f8f6] dark:bg-[#221f10] border border-[#e7e3cf] dark:border-[#3d3821] rounded-lg p-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                          <input 
                            className="w-full bg-transparent border-none focus:ring-0 p-1 outline-none text-[#1b190d] dark:text-white" 
                            type="text" 
                            placeholder="e.g. Used for 1st person (I) and 2nd person (You) questions."
                            value={note.text}
                            onChange={(e) => updateUsageNoteRow(index, nIndex, e.target.value)}
                          />
                          <button 
                            onClick={() => deleteUsageNoteRow(index, nIndex)} 
                            className="p-2 text-[#9a8d4c] hover:text-red-500 opacity-0 group-hover/row:opacity-100 transition-opacity"
                            title="Delete note"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* --- FORMULA BLOCK --- */}
              {block.type === 'formula' && (
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl shadow-sm border border-primary/20 overflow-hidden relative">
                  <div className="absolute top-4 right-4">{renderBlockControls(index)}</div>
                  <div className="p-8 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-primary">Grammar Pattern</label>
                      <div className="bg-white dark:bg-[#2d2916] rounded-lg p-2 border border-primary/20 shadow-inner">
                        <input 
                          className="w-full bg-transparent border-none focus:ring-0 text-2xl font-bold text-primary outline-none" 
                          type="text" 
                          placeholder="e.g. Noun + 은/는"
                          value={block.pattern}
                          onChange={(e) => updateBlock(index, 'pattern', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-primary">Meaning</label>
                      <div className="bg-white dark:bg-[#2d2916] rounded-lg p-2 border border-primary/20 shadow-inner">
                        <input 
                          className="w-full bg-transparent border-none focus:ring-0 text-xl font-medium outline-none" 
                          type="text" 
                          placeholder="English meaning"
                          value={block.meaning}
                          onChange={(e) => updateBlock(index, 'meaning', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- EXAMPLES TABLE BLOCK --- */}
              {block.type === 'examples' && (
                <div className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-primary/10 overflow-hidden">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10">
                    <div className="flex items-center gap-3">
                      <List className="w-5 h-5 text-primary" />
                      <h3 className="font-bold">Examples Table</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <button onClick={() => addExampleRow(index)} className="flex items-center gap-2 text-sm font-semibold text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                        <PlusCircle className="w-4 h-4" /> Add Row
                      </button>
                      {renderBlockControls(index)}
                    </div>
                  </div>
                  <div className="p-4 overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-xs uppercase text-primary/60 font-bold border-b border-primary/10">
                          <th className="pb-3 px-4 w-5/12">Korean Sentence</th>
                          <th className="pb-3 px-4 w-5/12">English Translation</th>
                          <th className="pb-3 px-4 w-2/12 text-center">Audio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-primary/5">
                        {block.rows.map((row, rIndex) => (
                          <tr key={row.id}>
                            <td className="py-3 px-4">
                              <input 
                                className="w-full bg-transparent border-none focus:ring-0 p-0 text-lg outline-none" 
                                type="text" placeholder="Korean..."
                                value={row.ko}
                                onChange={(e) => updateExampleRow(index, rIndex, 'ko', e.target.value)}
                              />
                            </td>
                            <td className="py-3 px-4">
                              <input 
                                className="w-full bg-transparent border-none focus:ring-0 p-0 text-[#1b190d]/60 dark:text-white/60 outline-none" 
                                type="text" placeholder="English..."
                                value={row.en}
                                onChange={(e) => updateExampleRow(index, rIndex, 'en', e.target.value)}
                              />
                            </td>
                            <td className="py-3 px-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <button title="Play audio" className="p-2 text-primary hover:bg-primary/20 rounded-full transition-colors"><Volume2 className="w-4 h-4" /></button>
                                <button title="Upload audio" className="p-2 text-primary/40 hover:text-primary transition-colors"><UploadCloud className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* --- QUICK QUIZ BLOCK --- */}
              {block.type === 'quiz' && (
                <div className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-primary hover:shadow-md transition-all overflow-hidden relative">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-primary/10 bg-[#f8f8f6] dark:bg-[#221f10]">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary" />
                      <h3 className="font-bold">Multiple Choice Quiz</h3>
                    </div>
                    {renderBlockControls(index)}
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#9a8d4c] mb-2">Question Text</label>
                      <textarea 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#e7e3cf] dark:border-[#3d3821] rounded-lg p-4 focus:ring-1 focus:ring-primary focus:border-primary text-base resize-y min-h-[80px] outline-none"
                        placeholder="Type your question here..."
                        value={block.question}
                        onChange={(e) => updateBlock(index, 'question', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#9a8d4c] mb-3">Answers (Select the correct one)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.options.map((opt, oIndex) => (
                          <div 
                            key={opt.id} 
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${opt.isCorrect ? 'border-primary bg-primary/5' : 'border-[#e7e3cf] dark:border-[#3d3821] bg-[#f8f8f6] dark:bg-[#221f10]'}`}
                          >
                            <input 
                              type="radio" 
                              name={`quiz-${block.id}-correct`}
                              className="w-5 h-5 text-primary focus:ring-primary cursor-pointer border-gray-300 dark:border-gray-600"
                              checked={opt.isCorrect}
                              onChange={() => updateQuizOption(index, oIndex, 'isCorrect', true)}
                            />
                            <input 
                              type="text"
                              className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm outline-none"
                              placeholder={`Option ${oIndex + 1}`}
                              value={opt.text}
                              onChange={(e) => updateQuizOption(index, oIndex, 'text', e.target.value)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#9a8d4c] mb-2">Explanation (Optional)</label>
                      <input 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#e7e3cf] dark:border-[#3d3821] rounded-lg p-3 focus:ring-1 focus:ring-primary focus:border-primary text-sm outline-none"
                        type="text"
                        placeholder="Explain why the answer is correct (shows after user answers)..."
                        value={block.explanation}
                        onChange={(e) => updateBlock(index, 'explanation', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Empty Drop Zone Indicator */}
          {blocks.length === 0 && (
            <div className="h-48 rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-3 bg-primary/5">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <AlignLeft className="w-6 h-6" />
              </div>
              <p className="font-medium text-primary/60">Click a block type on the left to start building</p>
            </div>
          )}

        </section>
      </main>
    </div>
  );
};

export default LessonBuilder;