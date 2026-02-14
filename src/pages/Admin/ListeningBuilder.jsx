import React, { useState } from 'react';
import { 
  ArrowLeft, PlayCircle, Subtitles, Edit3, HelpCircle, 
  ChevronUp, ChevronDown, Trash2, Volume2, UploadCloud, 
  PlusCircle, MoreVertical, Play, MinusCircle, Info
} from 'lucide-react';

const ListeningBuilder = () => {
  const [lessonTitle, setLessonTitle] = useState('Daily Conversation Audio');
  
  // State quản lý danh sách các khối nội dung cho Listening
  const [blocks, setBlocks] = useState([
    { 
      id: 'block-1', 
      type: 'media', 
      audioUrl: '' 
    },
    { 
      id: 'block-2', 
      type: 'transcript', 
      rows: [
        { id: 'row-1', time: '0:05', speaker: 'Min-jun', ko: '안녕하세요! 오늘 날씨가 정말 좋네요.', en: 'Hello! The weather is really nice today.' },
        { id: 'row-2', time: '0:12', speaker: 'Ji-soo', ko: '네, 맞아요. 공원에 산책 가고 싶어요.', en: "Yes, that's right. I want to go for a walk in the park." },
      ] 
    },
    { 
      id: 'block-3', 
      type: 'dictation', 
      text: '오늘 날씨가 정말 [좋네요]. 공원에 [산책] 가고 싶어요.' 
    }
  ]);

  // --- LOGIC XỬ LÝ CHUNG ---

  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    
    if (type === 'media') newBlock.audioUrl = '';
    if (type === 'transcript') newBlock.rows = [{ id: `row-${Date.now()}`, time: '', speaker: '', ko: '', en: '' }];
    if (type === 'dictation') newBlock.text = '';
    
    // Tái sử dụng block Quiz từ Grammar Builder
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

  // --- LOGIC CHO TRANSCRIPT ---
  const addTranscriptRow = (blockIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].rows.push({ id: `row-${Date.now()}`, time: '', speaker: '', ko: '', en: '' });
    setBlocks(newBlocks);
  };

  const updateTranscriptRow = (blockIndex, rowIndex, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].rows[rowIndex][field] = value;
    setBlocks(newBlocks);
  };

  const deleteTranscriptRow = (blockIndex, rowIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].rows.splice(rowIndex, 1);
    if (newBlocks[blockIndex].rows.length === 0) addTranscriptRow(blockIndex); // Giữ ít nhất 1 dòng
    setBlocks(newBlocks);
  };

  // --- LOGIC CHO QUIZ (Tái sử dụng) ---
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

  // --- HELPER: Phân tích các từ trong ngoặc vuông [...] cho phần Dictation ---
  const extractDictationBlanks = (text) => {
    if (!text) return [];
    const matches = text.match(/\[(.*?)\]/g);
    return matches ? matches.map(match => match.replace(/[\[\]]/g, '')) : [];
  };

  // --- RENDER GIAO DIỆN KHỐI ĐIỀU KHIỂN ---
  const renderBlockControls = (index) => (
    <div className="flex items-center gap-1 bg-[#f8f8f6] dark:bg-[#221f10] rounded-lg p-1 border border-[#efce2a]/20">
      <button 
        onClick={() => moveBlock(index, 'up')}
        disabled={index === 0}
        className="p-1 hover:bg-[#efce2a]/20 rounded text-[#1b190d]/70 dark:text-[#f8f8f6]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <button 
        onClick={() => moveBlock(index, 'down')}
        disabled={index === blocks.length - 1}
        className="p-1 hover:bg-[#efce2a]/20 rounded text-[#1b190d]/70 dark:text-[#f8f8f6]/70 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
      <div className="w-[1px] h-4 bg-[#efce2a]/20 mx-1"></div>
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
      <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#2d2916] border-b border-[#efce2a]/20 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-6 flex-1">
            <button className="p-2 hover:bg-[#efce2a]/10 rounded-full transition-colors flex items-center justify-center">
              <ArrowLeft className="w-6 h-6 text-[#efce2a]" />
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
            <span className="text-xs italic text-[#1b190d]/40 dark:text-white/40 mr-4">Auto-saved at 14:23</span>
            <button className="px-5 py-2.5 font-medium rounded-lg border border-[#efce2a]/40 hover:bg-[#efce2a]/5 transition-all">
              Save Draft
            </button>
            <button className="px-6 py-2.5 font-bold rounded-lg bg-[#efce2a] text-[#221f10] hover:brightness-105 shadow-md shadow-[#efce2a]/20 transition-all">
              Publish Lesson
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto flex flex-col md:flex-row gap-8 p-8 min-h-[calc(100vh-5rem)]">
        
        {/* Left Panel: Content Blocks Sidebar */}
        <aside className="w-full md:w-1/4 sticky top-28 h-fit">
          <div className="bg-white dark:bg-[#2d2916] rounded-xl p-6 shadow-sm border border-[#efce2a]/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#1b190d]/40 dark:text-white/40 mb-6">Add Content Block</h2>
            <div className="space-y-3">
              
              <button onClick={() => handleAddBlock('media')} className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-[#efce2a]/30 hover:border-[#efce2a] bg-[#efce2a]/5 hover:bg-[#efce2a]/10 transition-all group text-left">
                <div className="p-2 bg-[#efce2a]/20 rounded-lg group-hover:bg-[#efce2a] transition-colors">
                  <PlayCircle className="w-5 h-5 text-[#efce2a] dark:text-[#efce2a] group-hover:text-[#221f10]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b190d] dark:text-white">Media Player</p>
                  <p className="text-[10px] opacity-60">Audio upload & controls</p>
                </div>
              </button>

              <button onClick={() => handleAddBlock('transcript')} className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-[#efce2a]/30 hover:border-[#efce2a] bg-[#efce2a]/5 hover:bg-[#efce2a]/10 transition-all group text-left">
                <div className="p-2 bg-[#efce2a]/20 rounded-lg group-hover:bg-[#efce2a] transition-colors">
                  <Subtitles className="w-5 h-5 text-[#efce2a] dark:text-[#efce2a] group-hover:text-[#221f10]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b190d] dark:text-white">Transcript</p>
                  <p className="text-[10px] opacity-60">Interactive script editor</p>
                </div>
              </button>

              <button onClick={() => handleAddBlock('dictation')} className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-[#efce2a]/30 hover:border-[#efce2a] bg-[#efce2a]/5 hover:bg-[#efce2a]/10 transition-all group text-left">
                <div className="p-2 bg-[#efce2a]/20 rounded-lg group-hover:bg-[#efce2a] transition-colors">
                  <Edit3 className="w-5 h-5 text-[#efce2a] dark:text-[#efce2a] group-hover:text-[#221f10]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b190d] dark:text-white">Dictation</p>
                  <p className="text-[10px] opacity-60">Fill-in-the-blanks tool</p>
                </div>
              </button>

              <button onClick={() => handleAddBlock('quiz')} className="w-full flex items-center gap-3 p-3 rounded-xl border-2 border-dashed border-[#efce2a]/30 hover:border-[#efce2a] bg-[#efce2a]/5 hover:bg-[#efce2a]/10 transition-all group text-left">
                <div className="p-2 bg-[#efce2a]/20 rounded-lg group-hover:bg-[#efce2a] transition-colors">
                  <HelpCircle className="w-5 h-5 text-[#efce2a] dark:text-[#efce2a] group-hover:text-[#221f10]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b190d] dark:text-white">Quiz</p>
                  <p className="text-[10px] opacity-60">Comprehension checks</p>
                </div>
              </button>

            </div>

            <div className="mt-8 p-4 rounded-xl bg-[#efce2a]/5 border border-[#efce2a]/20">
              <p className="text-[11px] font-bold text-[#efce2a] uppercase mb-2 flex items-center gap-1"><Info className="w-3 h-3"/> Pro Tip</p>
              <p className="text-xs opacity-70 leading-relaxed text-[#1b190d] dark:text-white">Use the Transcript block to automatically generate audio timestamps for the student's player.</p>
            </div>
          </div>
        </aside>

        {/* Right Panel: Main Editor Canvas */}
        <section className="flex-1 space-y-6 pb-20">
          
          {blocks.map((block, index) => (
            <div key={block.id} className="relative group">
              
              {/* --- MEDIA PLAYER BLOCK --- */}
              {block.type === 'media' && (
                <div className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-[#efce2a]/20 overflow-hidden">
                  <div className="p-4 border-b border-[#efce2a]/10 flex justify-between items-center bg-[#efce2a]/5">
                    <div className="flex items-center gap-2 text-[#efce2a]">
                      <PlayCircle className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-tight text-[#1b190d] dark:text-white">0{index+1}. Media Player</span>
                    </div>
                    {renderBlockControls(index)}
                  </div>
                  <div className="p-8">
                    {/* Upload Zone */}
                    <div className="border-2 border-dashed border-[#efce2a]/30 rounded-xl p-10 flex flex-col items-center justify-center bg-[#f8f8f6] dark:bg-[#221f10]/30 hover:bg-[#efce2a]/5 transition-colors cursor-pointer mb-8">
                      <div className="w-12 h-12 bg-[#efce2a]/20 rounded-full flex items-center justify-center mb-4">
                        <UploadCloud className="text-[#efce2a] w-6 h-6" />
                      </div>
                      <p className="font-medium text-[#1b190d] dark:text-white">Upload Conversation Audio</p>
                      <p className="text-xs opacity-50 mt-1">MP3, WAV, or OGG (Max 10MB)</p>
                    </div>

                    {/* Custom Player UI Simulation */}
                    <div className="bg-[#f8f8f6] dark:bg-[#221f10]/50 p-6 rounded-xl border border-[#efce2a]/10">
                      <div className="flex items-center gap-6">
                        <button className="w-12 h-12 bg-[#efce2a] rounded-full flex items-center justify-center text-[#221f10] shadow-lg shadow-[#efce2a]/30 hover:scale-105 transition-transform">
                          <Play className="w-6 h-6 fill-current ml-1" />
                        </button>
                        <div className="flex-1">
                          <div className="flex justify-between text-[10px] font-bold mb-2">
                            <span>00:00</span>
                            <span className="text-[#efce2a] tracking-widest">PREVIEW MODE</span>
                            <span>03:45</span>
                          </div>
                          <div className="relative h-1.5 bg-[#efce2a]/20 rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full w-1/3 bg-[#efce2a]"></div>
                            <div className="absolute top-0 left-[33%] w-2 h-2 -mt-[1px] bg-white border-2 border-[#efce2a] rounded-full shadow-md"></div>
                          </div>
                        </div>
                        <div className="flex flex-col gap-2 text-[#1b190d] dark:text-white">
                          <button className="p-2 hover:bg-[#efce2a]/10 rounded-lg transition-colors"><Volume2 className="w-4 h-4" /></button>
                          <button className="p-2 hover:bg-[#efce2a]/10 rounded-lg transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- TRANSCRIPT BLOCK --- */}
              {block.type === 'transcript' && (
                <div className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-[#efce2a]/20 overflow-hidden">
                  <div className="p-4 border-b border-[#efce2a]/10 flex justify-between items-center bg-[#efce2a]/5">
                    <div className="flex items-center gap-2 text-[#efce2a]">
                      <Subtitles className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-tight text-[#1b190d] dark:text-white">0{index+1}. Audio Transcript</span>
                    </div>
                    {renderBlockControls(index)}
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-12 gap-4 mb-4 text-[11px] font-bold uppercase tracking-wider opacity-40 px-2 text-[#1b190d] dark:text-white">
                      <div className="col-span-2 lg:col-span-1">Time</div>
                      <div className="col-span-3 lg:col-span-2">Speaker</div>
                      <div className="col-span-6 lg:col-span-4">Korean Text</div>
                      <div className="hidden lg:block lg:col-span-4">English Translation</div>
                      <div className="col-span-1"></div>
                    </div>
                    
                    {block.rows.map((row, rIndex) => (
                      <div key={row.id} className="grid grid-cols-12 gap-2 lg:gap-4 items-start mb-4 p-2 hover:bg-[#efce2a]/5 rounded-lg border border-transparent hover:border-[#efce2a]/10 transition-all group/row">
                        <div className="col-span-2 lg:col-span-1">
                          <input 
                            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#efce2a]/20 rounded text-xs px-2 py-2 focus:ring-1 focus:ring-[#efce2a] outline-none" 
                            type="text" placeholder="0:00"
                            value={row.time} onChange={(e) => updateTranscriptRow(index, rIndex, 'time', e.target.value)}
                          />
                        </div>
                        <div className="col-span-3 lg:col-span-2">
                          <input 
                            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#efce2a]/20 rounded text-xs px-2 py-2 focus:ring-1 focus:ring-[#efce2a] outline-none font-bold" 
                            type="text" placeholder="Name"
                            value={row.speaker} onChange={(e) => updateTranscriptRow(index, rIndex, 'speaker', e.target.value)}
                          />
                        </div>
                        <div className="col-span-6 lg:col-span-4">
                          <textarea 
                            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#efce2a]/20 rounded text-sm px-2 py-2 focus:ring-1 focus:ring-[#efce2a] outline-none resize-y min-h-[36px]" 
                            rows="1" placeholder="Korean transcript..."
                            value={row.ko} onChange={(e) => updateTranscriptRow(index, rIndex, 'ko', e.target.value)}
                          />
                        </div>
                        <div className="col-span-11 lg:col-span-4 mt-2 lg:mt-0 lg:col-start-auto col-start-3">
                          <textarea 
                            className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#efce2a]/20 rounded text-sm px-2 py-2 focus:ring-1 focus:ring-[#efce2a] outline-none resize-y min-h-[36px] text-opacity-70" 
                            rows="1" placeholder="English translation..."
                            value={row.en} onChange={(e) => updateTranscriptRow(index, rIndex, 'en', e.target.value)}
                          />
                        </div>
                        <div className="col-span-1 flex justify-center items-center h-9">
                          <button onClick={() => deleteTranscriptRow(index, rIndex)} className="text-[#1b190d]/20 dark:text-white/20 hover:text-red-500 transition-colors">
                            <MinusCircle className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <button onClick={() => addTranscriptRow(index)} className="mt-4 w-full py-3 border-2 border-dotted border-[#efce2a]/40 rounded-xl text-[#efce2a] font-medium hover:bg-[#efce2a]/5 transition-colors flex items-center justify-center gap-2">
                      <PlusCircle className="w-4 h-4" />
                      Add New Row
                    </button>
                  </div>
                </div>
              )}

              {/* --- DICTATION BLOCK --- */}
              {block.type === 'dictation' && (
                <div className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-[#efce2a]/20 overflow-hidden">
                  <div className="p-4 border-b border-[#efce2a]/10 flex justify-between items-center bg-[#efce2a]/5">
                    <div className="flex items-center gap-2 text-[#efce2a]">
                      <Edit3 className="w-5 h-5" />
                      <span className="text-sm font-bold uppercase tracking-tight text-[#1b190d] dark:text-white">0{index+1}. Dictation Activity</span>
                    </div>
                    {renderBlockControls(index)}
                  </div>
                  <div className="p-6">
                    <div className="mb-4 flex items-start gap-4 p-4 bg-[#efce2a]/10 rounded-xl border border-[#efce2a]/20 text-[#1b190d] dark:text-white">
                      <Info className="w-5 h-5 text-[#efce2a] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide">Builder Tooltip</p>
                        <p className="text-[13px] opacity-70 mt-1 leading-relaxed">
                          Enclose words in <span className="px-1.5 py-0.5 bg-white dark:bg-black/20 rounded font-mono border border-[#efce2a]/30">[brackets]</span> to create interactive blanks for students. Example: <span className="italic">The weather is [nice] today.</span>
                        </p>
                      </div>
                    </div>

                    <div className="relative">
                      <textarea 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#efce2a]/20 rounded-xl text-base p-4 focus:ring-1 focus:ring-[#efce2a] outline-none resize-y min-h-[150px]" 
                        placeholder="Type or paste the full transcript here. Wrap words in [brackets] to make them fillable..." 
                        value={block.text}
                        onChange={(e) => updateBlock(index, 'text', e.target.value)}
                      />
                    </div>

                    {/* Auto-detected Blanks Preview */}
                    <div className="mt-6">
                      <p className="text-xs font-semibold opacity-50 mb-2">Detected Blanks Preview:</p>
                      <div className="flex flex-wrap gap-2 min-h-[30px]">
                        {extractDictationBlanks(block.text).length > 0 ? (
                          extractDictationBlanks(block.text).map((blank, i) => (
                            <span key={i} className="px-3 py-1 bg-[#efce2a]/20 text-[#221f10] dark:text-[#efce2a] rounded-lg text-sm font-medium border border-[#efce2a]/30">
                              {blank}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm italic opacity-40">No blanks detected yet. Try typing [word].</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- QUICK QUIZ BLOCK (Tái sử dụng) --- */}
              {block.type === 'quiz' && (
                <div className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-[#efce2a] hover:shadow-md transition-all overflow-hidden relative">
                  <div className="flex items-center justify-between px-6 py-4 border-b border-[#efce2a]/10 bg-[#f8f8f6] dark:bg-[#221f10]">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-[#efce2a]" />
                      <h3 className="font-bold text-[#1b190d] dark:text-white uppercase tracking-tight text-sm">0{index+1}. Comprehension Quiz</h3>
                    </div>
                    {renderBlockControls(index)}
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-[#9a8d4c] dark:text-[#efce2a]/70 mb-2">Question Text</label>
                      <textarea 
                        className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#e7e3cf] dark:border-[#3d3821] rounded-lg p-4 focus:ring-1 focus:ring-[#efce2a] focus:border-[#efce2a] text-base resize-y min-h-[80px] outline-none"
                        placeholder="What did Min-jun want to do?"
                        value={block.question}
                        onChange={(e) => updateBlock(index, 'question', e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-[#9a8d4c] dark:text-[#efce2a]/70 mb-3">Answers (Select the correct one)</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {block.options.map((opt, oIndex) => (
                          <div 
                            key={opt.id} 
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${opt.isCorrect ? 'border-[#efce2a] bg-[#efce2a]/5' : 'border-[#e7e3cf] dark:border-[#3d3821] bg-[#f8f8f6] dark:bg-[#221f10]'}`}
                          >
                            <input 
                              type="radio" 
                              name={`quiz-${block.id}-correct`}
                              className="w-5 h-5 text-[#efce2a] focus:ring-[#efce2a] cursor-pointer border-gray-300 dark:border-gray-600"
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
                  </div>
                </div>
              )}

            </div>
          ))}

          {/* Empty Drop Zone Indicator */}
          {blocks.length === 0 && (
            <div className="h-48 rounded-xl border-2 border-dashed border-[#efce2a]/30 flex flex-col items-center justify-center gap-3 bg-[#efce2a]/5">
              <div className="w-12 h-12 rounded-full bg-[#efce2a]/20 flex items-center justify-center text-[#efce2a]">
                <PlayCircle className="w-6 h-6" />
              </div>
              <p className="font-medium text-[#efce2a]/60">Click a block type on the left to start building your listening lesson.</p>
            </div>
          )}

        </section>
      </main>
    </div>
  );
};

export default ListeningBuilder;