import React, { useState } from 'react';
import { 
  ArrowLeft, Languages, FileEdit, Grid3X3, BrainCircuit, Info, 
  GripVertical, FileText, Trash2, X, Plus, ChevronUp, ChevronDown, PlusCircle
} from 'lucide-react';

const WritingBuilder = () => {
  const [lessonTitle, setLessonTitle] = useState('TOPIK II Essay Practice');
  
  // State quản lý danh sách các khối nội dung cho Writing
  const [blocks, setBlocks] = useState([
    {
      id: 'block-1',
      type: 'essay',
      title: 'Environment Preservation and Economic Growth',
      instructions: 'Write an argumentative essay about...',
      minWords: 600,
      maxWords: 700,
      timeLimit: 50,
      difficulty: 'Advanced (Level 5-6)',
      aiGrading: true
    },
    {
      id: 'block-2',
      type: 'translation',
      english: 'As modern society develops, the importance of environmental protection is increasing.',
      korean: '현대 사회가 발전함에 따라 환경 보호의 중요성이 커지고 있다.',
      variations: ['환경 보호가 중요해지고 있다', '환경 보전의 중요성이 강조된다'],
      tempVariation: '' // State tạm để gõ tag mới
    },
    {
      id: 'block-3',
      type: 'wongoji',
      rows: 20,
      cols: 10,
      showGrid: true
    }
  ]);

  // --- LOGIC XỬ LÝ CHUNG ---

  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    
    if (type === 'essay') {
      newBlock.title = '';
      newBlock.instructions = '';
      newBlock.minWords = 200;
      newBlock.maxWords = 300;
      newBlock.timeLimit = 30;
      newBlock.difficulty = 'Intermediate';
      newBlock.aiGrading = false;
    }
    if (type === 'translation') {
      newBlock.english = '';
      newBlock.korean = '';
      newBlock.variations = [];
      newBlock.tempVariation = '';
    }
    if (type === 'wongoji') {
      newBlock.rows = 20;
      newBlock.cols = 10;
      newBlock.showGrid = true;
    }
    if (type === 'ai_grading') {
      newBlock.rubric = '';
      newBlock.strictness = 'Medium';
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

  // --- LOGIC CHO TRANSLATION VARIATIONS (TAGS) ---
  const handleAddVariation = (index, e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      const newBlocks = [...blocks];
      const text = newBlocks[index].tempVariation.trim();
      if (text && !newBlocks[index].variations.includes(text)) {
        newBlocks[index].variations.push(text);
        newBlocks[index].tempVariation = '';
        setBlocks(newBlocks);
      }
    }
  };

  const handleRemoveVariation = (blockIndex, varIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].variations.splice(varIndex, 1);
    setBlocks(newBlocks);
  };

  // --- RENDER GIAO DIỆN KHỐI ĐIỀU KHIỂN CHUNG ---
  const renderBlockControls = (index) => (
    <div className="flex items-center gap-1">
      <button 
        onClick={() => moveBlock(index, 'up')}
        disabled={index === 0}
        className="p-1 hover:bg-[#eecd2b]/20 rounded text-[#1b190d]/70 dark:text-[#f0ede4]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <button 
        onClick={() => moveBlock(index, 'down')}
        disabled={index === blocks.length - 1}
        className="p-1 hover:bg-[#eecd2b]/20 rounded text-[#1b190d]/70 dark:text-[#f0ede4]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
      <button 
        onClick={() => deleteBlock(index)}
        className="p-1 hover:bg-red-500/20 text-red-500 rounded transition-colors"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="bg-[#f8f8f6] dark:bg-[#221f10] text-[#1b190d] dark:text-[#f0ede4] min-h-screen font-display">
      
      {/* Top Toolbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#2d2916] border-b border-[#eecd2b]/20 h-16 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#f8f8f6] dark:hover:bg-[#221f10] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#5e5836] dark:text-[#f0ede4]" />
          </button>
          <div className="h-6 w-[1px] bg-[#eecd2b]/30 mx-2"></div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight">Writing: </h1>
              <input 
                className="bg-transparent border-none p-0 focus:ring-0 text-lg font-semibold text-[#5e5836] dark:text-[#eecd2b]/80 outline-none w-64" 
                value={lessonTitle}
                onChange={(e) => setLessonTitle(e.target.value)}
              />
            </div>
            <p className="text-[10px] uppercase tracking-widest text-[#eecd2b] font-bold">Lesson Builder / Admin</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 text-sm font-medium text-[#5e5836] dark:text-[#f0ede4] hover:bg-[#f8f8f6] dark:hover:bg-[#221f10] rounded-lg transition-colors">
            Save Draft
          </button>
          <button className="px-6 py-2 bg-[#eecd2b] text-[#1b190d] text-sm font-semibold rounded-lg shadow-sm hover:brightness-105 active:scale-95 transition-all">
            Publish Lesson
          </button>
        </div>
      </header>

      <main className="flex h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Panel: Add Blocks */}
        <aside className="w-64 border-r border-[#eecd2b]/10 bg-white dark:bg-[#2d2916] p-4 overflow-y-auto">
          <h2 className="text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase tracking-widest mb-6 px-2">Elements</h2>
          <div className="space-y-3">
            
            <button onClick={() => handleAddBlock('translation')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <Languages className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Translation</p>
                <p className="text-[10px] text-[#5e5836] dark:text-[#f0ede4]/50">Sentence practice</p>
              </div>
            </button>

            <button onClick={() => handleAddBlock('essay')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <FileEdit className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Free-form Essay</p>
                <p className="text-[10px] text-[#5e5836] dark:text-[#f0ede4]/50">Open response</p>
              </div>
            </button>

            <button onClick={() => handleAddBlock('wongoji')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <Grid3X3 className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Wongoji Grid</p>
                <p className="text-[10px] text-[#5e5836] dark:text-[#f0ede4]/50">Manuscript paper</p>
              </div>
            </button>

            <button onClick={() => handleAddBlock('ai_grading')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">AI Grading</p>
                <p className="text-[10px] text-[#5e5836] dark:text-[#f0ede4]/50">Auto-eval rules</p>
              </div>
            </button>

          </div>
          
          <div className="mt-8 pt-8 border-t border-[#eecd2b]/10">
            <div className="bg-[#eecd2b]/5 rounded-xl p-4 border border-[#eecd2b]/20">
              <div className="flex items-center gap-2 mb-2 text-[#eecd2b]">
                <Info className="w-4 h-4" />
                <span className="text-[11px] font-bold uppercase">Tips</span>
              </div>
              <p className="text-xs leading-relaxed text-[#5e5836] dark:text-[#f0ede4]/70">
                Use the Up/Down arrows to reorder blocks in the lesson sequence. AI grading requires a clear prompt to work effectively.
              </p>
            </div>
          </div>
        </aside>

        {/* Right Panel: Lesson Canvas */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#f8f8f6] dark:bg-[#221f10]">
          
          {blocks.map((block, index) => (
            <section key={block.id} className="max-w-4xl mx-auto bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-[#eecd2b]/10 relative group/block">
              
              {/* --- ESSAY BLOCK --- */}
              {block.type === 'essay' && (
                <>
                  <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-[#eecd2b]" />
                      <h3 className="font-bold">0{index+1}. Essay Prompt</h3>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-2 cursor-pointer" onClick={() => updateBlock(index, 'aiGrading', !block.aiGrading)}>
                        <span className="text-xs font-medium text-[#5e5836] dark:text-[#f0ede4]/70">AI Auto-Grading</span>
                        <div className={`w-10 h-5 rounded-full relative p-1 transition-colors ${block.aiGrading ? 'bg-[#eecd2b]' : 'bg-gray-300 dark:bg-gray-600'}`}>
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${block.aiGrading ? 'ml-auto' : ''}`}></div>
                        </div>
                      </div>
                      {renderBlockControls(index)}
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-12 gap-6">
                    <div className="col-span-12">
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Topic Title</label>
                      <input 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none" 
                        placeholder="e.g., Environment Preservation and Economic Growth" 
                        type="text"
                        value={block.title}
                        onChange={(e) => updateBlock(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="col-span-12">
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Instructions</label>
                      <textarea 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none resize-y min-h-[80px]" 
                        placeholder="Write an argumentative essay about..." 
                        rows="3"
                        value={block.instructions}
                        onChange={(e) => updateBlock(index, 'instructions', e.target.value)}
                      />
                    </div>
                    <div className="col-span-4">
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Word Count Range</label>
                      <div className="flex items-center gap-2">
                        <input 
                          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-center" 
                          type="number" 
                          value={block.minWords}
                          onChange={(e) => updateBlock(index, 'minWords', e.target.value)}
                        />
                        <span className="text-xs text-[#5e5836]">-</span>
                        <input 
                          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-center" 
                          type="number" 
                          value={block.maxWords}
                          onChange={(e) => updateBlock(index, 'maxWords', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-span-4">
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Time Limit (Min)</label>
                      <input 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none text-center" 
                        type="number" 
                        value={block.timeLimit}
                        onChange={(e) => updateBlock(index, 'timeLimit', e.target.value)}
                      />
                    </div>
                    <div className="col-span-4">
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Difficulty</label>
                      <select 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none"
                        value={block.difficulty}
                        onChange={(e) => updateBlock(index, 'difficulty', e.target.value)}
                      >
                        <option>Advanced (Level 5-6)</option>
                        <option>Intermediate (Level 3-4)</option>
                        <option>Beginner (Level 1-2)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* --- TRANSLATION BLOCK --- */}
              {block.type === 'translation' && (
                <>
                  <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
                    <div className="flex items-center gap-3">
                      <Languages className="w-5 h-5 text-[#eecd2b]" />
                      <h3 className="font-bold">0{index+1}. Sentence Translation</h3>
                    </div>
                    {renderBlockControls(index)}
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">English Prompt</label>
                      <input 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none" 
                        type="text" 
                        placeholder="e.g. As modern society develops..."
                        value={block.english}
                        onChange={(e) => updateBlock(index, 'english', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Target Korean Sentence</label>
                      <input 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none" 
                        type="text" 
                        placeholder="e.g. 현대 사회가 발전함에 따라..."
                        value={block.korean}
                        onChange={(e) => updateBlock(index, 'korean', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2 flex items-center gap-2">
                        Acceptable Variations (Tags)
                        <span className="text-[10px] font-normal normal-case opacity-60">(Type and press Enter)</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-2 p-3 bg-[#f8f8f6] dark:bg-[#221f10] rounded-lg min-h-[50px] focus-within:ring-1 focus-within:ring-[#eecd2b]">
                        
                        {/* Render Tags */}
                        {block.variations.map((v, vIndex) => (
                          <span key={vIndex} className="bg-[#eecd2b]/20 text-[#1b190d] dark:text-[#eecd2b] text-[11px] font-medium px-2 py-1 rounded flex items-center gap-1 border border-[#eecd2b]/30">
                            {v} 
                            <X className="w-3 h-3 cursor-pointer hover:text-red-500" onClick={() => handleRemoveVariation(index, vIndex)} />
                          </span>
                        ))}

                        {/* Input for new Tag */}
                        <input 
                          className="bg-transparent border-none p-1 text-[11px] outline-none flex-1 min-w-[150px] focus:ring-0" 
                          placeholder="Add another correct translation..."
                          value={block.tempVariation}
                          onChange={(e) => updateBlock(index, 'tempVariation', e.target.value)}
                          onKeyDown={(e) => handleAddVariation(index, e)}
                        />
                        <button 
                          onClick={(e) => handleAddVariation(index, e)}
                          className="text-[11px] font-bold text-[#eecd2b] flex items-center gap-1 hover:underline ml-2"
                        >
                          <Plus className="w-3 h-3" /> ADD
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* --- WONGOJI GRID BLOCK --- */}
              {block.type === 'wongoji' && (
                <>
                  <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
                    <div className="flex items-center gap-3">
                      <Grid3X3 className="w-5 h-5 text-[#eecd2b]" />
                      <h3 className="font-bold">0{index+1}. Wongoji Grid Setup</h3>
                    </div>
                    {renderBlockControls(index)}
                  </div>
                  <div className="p-6 flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-1 w-full overflow-hidden">
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-4">Live Preview (Wongoji Layout)</label>
                      <div className="bg-[#f8f8f6] dark:bg-[#221f10] p-6 rounded-lg overflow-x-auto border border-[#eecd2b]/10">
                        <div className="inline-block border border-[#eecd2b]/40 bg-white">
                          {/* Render visual preview grid (Fixed at max 4x10 for UI purposes) */}
                          {Array.from({ length: 4 }).map((_, rIdx) => (
                            <div key={rIdx} className="flex">
                              {Array.from({ length: 10 }).map((_, cIdx) => (
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
                          <button onClick={() => updateBlock(index, 'rows', Math.max(1, block.rows - 1))} className="w-8 h-8 rounded bg-[#eecd2b]/10 flex items-center justify-center hover:bg-[#eecd2b]/20 text-[#eecd2b] font-bold">-</button>
                          <input 
                            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-center text-sm font-bold outline-none" 
                            type="number" 
                            value={block.rows}
                            onChange={(e) => updateBlock(index, 'rows', parseInt(e.target.value) || 0)}
                          />
                          <button onClick={() => updateBlock(index, 'rows', block.rows + 1)} className="w-8 h-8 rounded bg-[#eecd2b]/10 flex items-center justify-center hover:bg-[#eecd2b]/20 text-[#eecd2b] font-bold">+</button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2">Columns</label>
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateBlock(index, 'cols', Math.max(1, block.cols - 1))} className="w-8 h-8 rounded bg-[#eecd2b]/10 flex items-center justify-center hover:bg-[#eecd2b]/20 text-[#eecd2b] font-bold">-</button>
                          <input 
                            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-center text-sm font-bold outline-none" 
                            type="number" 
                            value={block.cols}
                            onChange={(e) => updateBlock(index, 'cols', parseInt(e.target.value) || 0)}
                          />
                          <button onClick={() => updateBlock(index, 'cols', block.cols + 1)} className="w-8 h-8 rounded bg-[#eecd2b]/10 flex items-center justify-center hover:bg-[#eecd2b]/20 text-[#eecd2b] font-bold">+</button>
                        </div>
                      </div>
                      <div className="pt-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input 
                            className="rounded text-[#eecd2b] focus:ring-[#eecd2b] border-[#eecd2b]/30 bg-transparent w-4 h-4 cursor-pointer" 
                            type="checkbox"
                            checked={block.showGrid}
                            onChange={(e) => updateBlock(index, 'showGrid', e.target.checked)}
                          />
                          <span className="text-xs font-medium">Show grid to user</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* --- AI GRADING RULES BLOCK (NEW) --- */}
              {block.type === 'ai_grading' && (
                <>
                  <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
                    <div className="flex items-center gap-3">
                      <BrainCircuit className="w-5 h-5 text-[#eecd2b]" />
                      <h3 className="font-bold">0{index+1}. AI Grading Rules</h3>
                    </div>
                    {renderBlockControls(index)}
                  </div>
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase mb-2 flex items-center gap-2">
                        Evaluation Rubric <span className="text-[10px] font-normal normal-case opacity-60">(Prompt context for AI)</span>
                      </label>
                      <textarea 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-4 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none resize-y min-h-[100px]" 
                        placeholder="e.g. Deduct points for incorrect spacing. Must use formal language (-습니다/비니다). Topic must address both pros and cons..." 
                        value={block.rubric}
                        onChange={(e) => updateBlock(index, 'rubric', e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <label className="block text-xs font-bold text-[#5e5836] dark:text-[#eecd2b]/60 uppercase">Grading Strictness:</label>
                      <select 
                        className="bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none"
                        value={block.strictness}
                        onChange={(e) => updateBlock(index, 'strictness', e.target.value)}
                      >
                        <option>Lenient (Focus on meaning)</option>
                        <option>Medium (Standard TOPIK rules)</option>
                        <option>Strict (Grammar & Spelling focused)</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

            </section>
          ))}

          {/* Bottom Add Button (Placeholder if empty) */}
          <div className="max-w-4xl mx-auto py-4 pb-12">
            <button className="w-full border-2 border-dashed border-[#eecd2b]/30 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-[#eecd2b]/5 hover:border-[#eecd2b] transition-all group">
              <PlusCircle className="w-6 h-6 text-[#eecd2b]/40 group-hover:text-[#eecd2b] transition-colors" />
              <span className="text-sm font-semibold text-[#5e5836] dark:text-[#f0ede4]/60 group-hover:text-[#1b190d] dark:group-hover:text-white transition-colors">
                {blocks.length === 0 ? "Click an element on the left to start building" : "Add another block from the left panel"}
              </span>
            </button>
          </div>

        </div>
      </main>
    </div>
  );
};

export default WritingBuilder;