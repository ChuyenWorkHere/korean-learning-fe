import React, { useState } from 'react';
import { 
  ArrowLeft, Image as ImageIcon, FileText, Sparkles, CheckSquare, 
  Headphones, Trash2, Camera, Bold, Italic, List, 
  Plus, ChevronUp, ChevronDown, Wand2, Languages, Lightbulb
} from 'lucide-react';

const ReadingBuilder = () => {
  const [lessonTitle, setLessonTitle] = useState('Reading: The Tiger and the Persimmon');
  
  // State quản lý danh sách các khối nội dung cho Reading
  const [blocks, setBlocks] = useState([
    {
      id: 'block-1',
      type: 'cover',
      imageUrl: 'https://images.unsplash.com/photo-1590059344498-38bc165158a3?q=80&w=800&auto=format&fit=crop'
    },
    {
      id: 'block-2',
      type: 'long_text',
      content: '옛날 어느 산골에 호랑이 한 마리가 살고 있었습니다. 호랑이는 배가 고파서 마을로 내려왔습니다.\n\n집 안에서 아기가 우는 소리가 들렸습니다.\n"뚝! 자꾸 울면 호랑이가 잡아간다!"\n\n하지만 아기는 울음을 그치지 않았습니다.\n그때 어머니가 말했습니다. "자, 여기 곶감이다!"\n\n그러자 아기가 뚝 울음을 그쳤습니다.\n호랑이는 깜짝 놀랐습니다. \'곶감이 나보다 더 무서운 놈인가 보구나!\''
    },
    {
      id: 'block-3',
      type: 'tf_quiz',
      questions: [
        { id: 'q-1', text: 'The tiger was afraid of the crying baby.', isTrue: false },
        { id: 'q-2', text: "The tiger thinks '곶감' is a scary creature.", isTrue: true }
      ]
    }
  ]);

  // --- LOGIC XỬ LÝ CHUNG ---

  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    
    if (type === 'cover') newBlock.imageUrl = '';
    if (type === 'long_text') newBlock.content = '';
    if (type === 'tf_quiz') newBlock.questions = [{ id: `q-${Date.now()}`, text: '', isTrue: false }];
    
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

  // --- LOGIC CHO TRUE/FALSE QUIZ ---
  const addTfQuestion = (blockIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].questions.push({ id: `q-${Date.now()}`, text: '', isTrue: false });
    setBlocks(newBlocks);
  };

  const updateTfQuestion = (blockIndex, qIndex, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].questions[qIndex][field] = value;
    setBlocks(newBlocks);
  };

  const deleteTfQuestion = (blockIndex, qIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].questions.splice(qIndex, 1);
    if (newBlocks[blockIndex].questions.length === 0) addTfQuestion(blockIndex);
    setBlocks(newBlocks);
  };

  // --- RENDER GIAO DIỆN KHỐI ĐIỀU KHIỂN CHUNG (Style WritingBuilder) ---
  const renderBlockControls = (index) => (
    <div className="flex items-center gap-1">
      <button 
        onClick={() => moveBlock(index, 'up')}
        disabled={index === 0}
        className="p-1 hover:bg-[#eecd2b]/20 rounded text-[#1b190d]/70 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronUp className="w-4 h-4" />
      </button>
      <button 
        onClick={() => moveBlock(index, 'down')}
        disabled={index === blocks.length - 1}
        className="p-1 hover:bg-[#eecd2b]/20 rounded text-[#1b190d]/70 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
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
    <div className="bg-[#f8f8f6] dark:bg-[#221f10] text-[#1b190d] dark:text-gray-100 min-h-screen font-display">
      
      {/* Top Toolbar */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#2d2916]/80 backdrop-blur-md border-b border-[#eecd2b]/20 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#f8f8f6] dark:hover:bg-[#221f10] rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#1b190d] dark:text-white" />
          </button>
          <div className="h-6 w-px bg-[#eecd2b]/30"></div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold tracking-tight">Reading: </h1>
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
          <span className="text-xs text-gray-500 dark:text-gray-400 mr-2 italic">Last saved 2 mins ago</span>
          <button className="px-5 py-2 text-sm font-medium border border-[#eecd2b] text-[#1b190d] dark:text-[#eecd2b] rounded-lg hover:bg-[#eecd2b]/10 transition-colors">
            Save Draft
          </button>
          <button className="px-5 py-2 text-sm font-medium bg-[#eecd2b] text-[#1b190d] rounded-lg hover:shadow-lg hover:shadow-[#eecd2b]/20 transition-all">
            Publish Lesson
          </button>
        </div>
      </header>

      <main className="flex h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Panel: Add Blocks */}
        <aside className="w-72 border-r border-[#eecd2b]/20 bg-white dark:bg-[#2d2916]/50 p-4 overflow-y-auto custom-scrollbar">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#5e5836] dark:text-[#eecd2b]/60 mb-6 px-2">Content Blocks</h2>
          <div className="space-y-3">
            
            <button onClick={() => handleAddBlock('cover')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Article Cover</p>
                <p className="text-[10px] text-[#5e5836] dark:text-gray-400">Header image</p>
              </div>
            </button>

            <button onClick={() => handleAddBlock('long_text')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Long Text</p>
                <p className="text-[10px] text-[#5e5836] dark:text-gray-400">Story paragraphs</p>
              </div>
            </button>

            <button onClick={() => handleAddBlock('vocab')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Vocab Highlight</p>
                <p className="text-[10px] text-[#5e5836] dark:text-gray-400">Word definitions</p>
              </div>
            </button>

            <button onClick={() => handleAddBlock('tf_quiz')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">True/False Quiz</p>
                <p className="text-[10px] text-[#5e5836] dark:text-gray-400">Quick assessment</p>
              </div>
            </button>

            <button onClick={() => handleAddBlock('audio')} className="w-full flex items-center gap-3 p-3 bg-[#f8f8f6] dark:bg-[#221f10] border border-transparent hover:border-[#eecd2b]/50 rounded-xl transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#eecd2b]/10 flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium">Audio Clip</p>
                <p className="text-[10px] text-[#5e5836] dark:text-gray-400">Native pronunciation</p>
              </div>
            </button>

          </div>
          
          <div className="mt-8 pt-8 border-t border-[#eecd2b]/10">
            <div className="space-y-4 px-2">
              <label className="text-[10px] font-bold text-[#1b190d]/60 dark:text-[#eecd2b]/80 mb-1 block">Difficulty Level</label>
              <select className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-[#eecd2b] font-medium text-[#1b190d] dark:text-white outline-none cursor-pointer">
                <option>Intermediate (B1)</option>
                <option>Beginner (A1)</option>
                <option>Advanced (C1)</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Center Canvas: Editor */}
        <section className="flex-1 bg-[#f8f8f6] dark:bg-[#221f10] overflow-y-auto custom-scrollbar p-8">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {blocks.map((block, index) => (
              <section key={block.id} className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-[#eecd2b]/10 relative group/block overflow-hidden">
                
                {/* --- COVER IMAGE BLOCK --- */}
                {block.type === 'cover' && (
                  <>
                    <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
                      <div className="flex items-center gap-3 text-[#1b190d] dark:text-white">
                        <ImageIcon className="w-5 h-5 text-[#eecd2b]" />
                        <h3 className="font-bold">0{index+1}. Article Cover</h3>
                      </div>
                      <div className="flex items-center gap-6">
                        {renderBlockControls(index)}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="w-full aspect-[21/9] rounded-xl overflow-hidden bg-gray-200 dark:bg-gray-800 relative border-2 border-dashed border-[#eecd2b]/40 group/img">
                        {block.imageUrl ? (
                          <img className="w-full h-full object-cover opacity-90" src={block.imageUrl} alt="Cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center opacity-30"><ImageIcon className="w-16 h-16"/></div>
                        )}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <button className="px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-lg border border-white/30 hover:bg-white/30 transition-all flex items-center gap-2">
                            <Camera className="w-4 h-4" /> Change Cover Image
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* --- LONG TEXT BLOCK --- */}
                {block.type === 'long_text' && (
                  <>
                    <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
                      <div className="flex items-center gap-3 text-[#1b190d] dark:text-white">
                        <FileText className="w-5 h-5 text-[#eecd2b]" />
                        <h3 className="font-bold">0{index+1}. Long Text Paragraph</h3>
                      </div>
                      <div className="flex items-center gap-6">
                        {renderBlockControls(index)}
                      </div>
                    </div>
                    <div className="p-3 border-b border-[#eecd2b]/10 flex items-center px-6 bg-[#f8f8f6] dark:bg-[#221f10]/50">
                      <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300"><Bold className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300"><Italic className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-[#eecd2b]/10 rounded text-gray-600 dark:text-gray-300"><List className="w-4 h-4" /></button>
                      <div className="w-px h-4 bg-gray-300 dark:bg-gray-600 mx-2"></div>
                      <button className="px-3 py-1.5 bg-[#eecd2b]/20 text-[#1b190d] dark:text-[#eecd2b] rounded flex items-center gap-1 hover:bg-[#eecd2b]/30 transition-colors">
                        <Wand2 className="w-3 h-3" />
                        <span className="text-xs font-semibold">Highlight Vocab</span>
                      </button>
                    </div>
                    <div className="p-6">
                      <textarea 
                        className="w-full bg-transparent border-none text-xl leading-relaxed text-[#1b190d] dark:text-gray-200 outline-none resize-y min-h-[150px] focus:ring-0 p-0"
                        placeholder="Type your story or article here..."
                        value={block.content}
                        onChange={(e) => updateBlock(index, 'content', e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* --- TRUE / FALSE QUIZ BLOCK --- */}
                {block.type === 'tf_quiz' && (
                  <>
                    <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
                      <div className="flex items-center gap-3 text-[#1b190d] dark:text-white">
                        <CheckSquare className="w-5 h-5 text-[#eecd2b]" />
                        <h3 className="font-bold">0{index+1}. Reading Comprehension (T/F)</h3>
                      </div>
                      <div className="flex items-center gap-6">
                        <button onClick={() => addTfQuestion(index)} className="text-sm text-[#eecd2b] font-semibold flex items-center gap-1 hover:underline">
                          <Plus className="w-4 h-4" /> Add Question
                        </button>
                        {renderBlockControls(index)}
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {block.questions.map((q, qIndex) => (
                        <div key={q.id} className="flex items-center gap-4 lg:gap-6 p-4 bg-[#f8f8f6] dark:bg-[#221f10]/50 rounded-lg group/row border border-transparent hover:border-[#eecd2b]/20 transition-all">
                          <div className="flex-1">
                            <label className="text-[10px] font-bold text-gray-400 block mb-1">QUESTION {qIndex + 1}</label>
                            <input 
                              className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 font-medium text-[#1b190d] dark:text-white outline-none" 
                              placeholder="Type question statement..." 
                              type="text" 
                              value={q.text}
                              onChange={(e) => updateTfQuestion(index, qIndex, 'text', e.target.value)}
                            />
                          </div>
                          
                          <div className="flex flex-col items-center gap-1">
                            <span className={`text-[10px] font-bold uppercase ${q.isTrue ? 'text-[#eecd2b]' : 'text-gray-400'}`}>
                              {q.isTrue ? 'True' : 'False'}
                            </span>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                className="sr-only peer" 
                                checked={q.isTrue}
                                onChange={(e) => updateTfQuestion(index, qIndex, 'isTrue', e.target.checked)}
                              />
                              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#eecd2b]"></div>
                            </label>
                          </div>
                          
                          <button 
                            onClick={() => deleteTfQuestion(index, qIndex)}
                            className="text-gray-300 hover:text-red-500 transition-colors ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* --- MOCK BLOCKS (Vocab, Audio) --- */}
                {['vocab', 'audio'].includes(block.type) && (
                  <>
                    <div className="p-6 border-b border-[#eecd2b]/5 flex justify-between items-center bg-[#eecd2b]/5">
                      <div className="flex items-center gap-3 text-[#1b190d] dark:text-white">
                        {block.type === 'vocab' ? <Sparkles className="w-5 h-5 text-[#eecd2b]" /> : <Headphones className="w-5 h-5 text-[#eecd2b]" />}
                        <h3 className="font-bold capitalize">0{index+1}. {block.type} Block</h3>
                      </div>
                      <div className="flex items-center gap-6">
                        {renderBlockControls(index)}
                      </div>
                    </div>
                    <div className="p-8 flex items-center justify-center text-gray-500 font-medium h-32">
                      {block.type === 'vocab' ? 'Vocabulary Setup Interface (Coming Soon)' : 'Audio Player Interface (Coming Soon)'}
                    </div>
                  </>
                )}

              </section>
            ))}

            {/* Bottom Add Block Placeholder */}
            <div className="pt-4 pb-12">
              <button className="w-full py-10 border-2 border-dashed border-[#eecd2b]/30 rounded-xl flex flex-col items-center justify-center gap-3 hover:bg-[#eecd2b]/5 hover:border-[#eecd2b] transition-all group">
                <div className="w-12 h-12 rounded-full bg-[#eecd2b]/10 flex items-center justify-center group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] text-[#eecd2b] transition-all">
                  <Plus className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-500 group-hover:text-[#1b190d] dark:group-hover:text-white transition-colors">
                  {blocks.length === 0 ? "Select a content block from the left panel to start" : "Click a block type on the left to add more"}
                </span>
              </button>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
};

export default ReadingBuilder;