import React, { useState } from 'react';
import { 
  ArrowLeft, Settings, MessageSquare, Mic, Trash2, Camera, 
  ChevronUp, ChevronDown, Plus, ToggleLeft, ToggleRight,
  User, UserCheck, PlayCircle, PlusCircle, Volume2,
  Info
} from 'lucide-react';

const SpeakingBuilder = () => {
  const [lessonTitle, setLessonTitle] = useState('Roleplay: Ordering at a Cafe');
  
  // State quản lý danh sách các khối nội dung
  const [blocks, setBlocks] = useState([
    {
      id: 'block-1',
      type: 'roleplay_setup',
      characterA: {
        name: 'Waiter',
        avatarUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200&auto=format&fit=crop',
        voiceType: 'Male (Polite Tone)'
      },
      characterB: {
        name: 'Customer',
        avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
        isUserControlled: true
      }
    },
    {
      id: 'block-2',
      type: 'dialogue_sequence',
      messages: [
        {
          id: 'msg-1',
          speaker: 'A', // 'A' là Waiter, 'B' là Customer
          korean: '어서 오세요. 무엇을 도와드릴까요?',
          english: 'Welcome. How can I help you?',
          isAutoPlay: true,
          requiresSpeech: false
        },
        {
          id: 'msg-2',
          speaker: 'B',
          korean: '아이스 아메리카노 하나 주세요.',
          english: 'One iced americano, please.',
          isAutoPlay: false,
          requiresSpeech: true
        }
      ]
    }
  ]);

  // --- LOGIC XỬ LÝ CHUNG BLOCKS ---

  const handleAddBlock = (type) => {
    const newBlock = { id: `block-${Date.now()}`, type };
    
    if (type === 'roleplay_setup') {
      newBlock.characterA = { name: 'Person A', avatarUrl: '', voiceType: 'Female (Standard)' };
      newBlock.characterB = { name: 'Person B', avatarUrl: '', isUserControlled: true };
    }
    if (type === 'dialogue_sequence') {
      newBlock.messages = [{
        id: `msg-${Date.now()}`, speaker: 'A', korean: '', english: '', isAutoPlay: true, requiresSpeech: false
      }];
    }
    if (type === 'pronunciation') {
      newBlock.targetPhrase = '';
      newBlock.translation = '';
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

  const updateCharacter = (blockIndex, charKey, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex][charKey][field] = value;
    setBlocks(newBlocks);
  };

  // --- LOGIC CHO DIALOGUE SEQUENCE ---

  const addMessage = (blockIndex) => {
    const newBlocks = [...blocks];
    // Tự động suy luận người nói tiếp theo (A -> B, B -> A)
    const lastMsg = newBlocks[blockIndex].messages[newBlocks[blockIndex].messages.length - 1];
    const nextSpeaker = lastMsg && lastMsg.speaker === 'A' ? 'B' : 'A';
    const isLearner = nextSpeaker === 'B'; // Giả định B luôn là Learner

    newBlocks[blockIndex].messages.push({
      id: `msg-${Date.now()}`,
      speaker: nextSpeaker,
      korean: '',
      english: '',
      isAutoPlay: !isLearner,
      requiresSpeech: isLearner
    });
    setBlocks(newBlocks);
  };

  const updateMessage = (blockIndex, msgIndex, field, value) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].messages[msgIndex][field] = value;
    setBlocks(newBlocks);
  };

  const deleteMessage = (blockIndex, msgIndex) => {
    const newBlocks = [...blocks];
    newBlocks[blockIndex].messages.splice(msgIndex, 1);
    if(newBlocks[blockIndex].messages.length === 0) addMessage(blockIndex);
    setBlocks(newBlocks);
  };

  const toggleSpeaker = (blockIndex, msgIndex) => {
    const newBlocks = [...blocks];
    const msg = newBlocks[blockIndex].messages[msgIndex];
    
    // Nếu đổi sang B (Learner), tự động bật Require Speech và tắt AutoPlay
    if (msg.speaker === 'A') {
      msg.speaker = 'B';
      msg.requiresSpeech = true;
      msg.isAutoPlay = false;
    } else {
      msg.speaker = 'A';
      msg.requiresSpeech = false;
      msg.isAutoPlay = true;
    }
    setBlocks(newBlocks);
  };

  // --- RENDER GIAO DIỆN KHỐI ĐIỀU KHIỂN ---
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
    <div className="bg-[#f8f8f6] dark:bg-[#221f10] text-[#1b190d] dark:text-[#f8f8f6] min-h-screen font-display">
      
      {/* CSS Animation cho Waveform tĩnh */}
      <style>{`
        @keyframes pulse-height {
          0%, 100% { height: 12px; }
          50% { height: 28px; }
        }
        .waveform-bar { animation: pulse-height 1.5s ease-in-out infinite; }
      `}</style>

      {/* Top Toolbar */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#2d2916] border-b border-[#eecd2b]/20 h-16 flex items-center px-6 justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-[#eecd2b]/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5 text-[#1b190d] dark:text-white" />
          </button>
          <div className="flex items-center gap-2 group">
            <input 
              className="text-lg font-semibold bg-transparent border-none p-0 focus:ring-0 outline-none w-64 text-[#1b190d] dark:text-white"
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium text-[#1b190d]/50 dark:text-[#f8f8f6]/50 mr-2 uppercase tracking-wider">Draft Saved 2m ago</span>
          <button className="px-5 py-2 text-sm font-medium border-2 border-[#eecd2b]/30 hover:bg-[#eecd2b]/10 rounded-lg transition-all text-[#1b190d] dark:text-white">Save Draft</button>
          <button className="px-5 py-2 text-sm font-medium bg-[#eecd2b] hover:bg-[#eecd2b]/90 text-[#1b190d] rounded-lg shadow-sm transition-all">Publish Lesson</button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-64px)] overflow-hidden">
        
        {/* Left Panel: Add Block Menu */}
        <aside className="w-72 bg-white dark:bg-[#2d2916] border-r border-[#eecd2b]/20 p-6 flex flex-col gap-8 overflow-y-auto">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#1b190d]/40 dark:text-[#f8f8f6]/40 mb-4">Content Blocks</h2>
            <div className="flex flex-col gap-3">
              
              <button onClick={() => handleAddBlock('roleplay_setup')} className="flex items-center gap-3 p-3 w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 rounded-xl hover:border-[#eecd2b] transition-all text-left group">
                <div className="w-10 h-10 bg-[#eecd2b]/20 rounded-lg flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                  <Settings className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b190d] dark:text-white">Roleplay Setup</p>
                  <p className="text-[10px] opacity-60">Define characters</p>
                </div>
              </button>

              <button onClick={() => handleAddBlock('dialogue_sequence')} className="flex items-center gap-3 p-3 w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 rounded-xl hover:border-[#eecd2b] transition-all text-left group">
                <div className="w-10 h-10 bg-[#eecd2b]/20 rounded-lg flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b190d] dark:text-white">Dialogue Pair</p>
                  <p className="text-[10px] opacity-60">A-B Conversation</p>
                </div>
              </button>

              <button onClick={() => handleAddBlock('pronunciation')} className="flex items-center gap-3 p-3 w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 rounded-xl hover:border-[#eecd2b] transition-all text-left group">
                <div className="w-10 h-10 bg-[#eecd2b]/20 rounded-lg flex items-center justify-center text-[#eecd2b] group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] transition-colors">
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1b190d] dark:text-white">Pronunciation</p>
                  <p className="text-[10px] opacity-60">Target phrase practice</p>
                </div>
              </button>

            </div>
          </div>
          <div className="mt-auto p-4 bg-[#eecd2b]/5 rounded-xl border border-[#eecd2b]/10">
            <p className="text-xs font-bold mb-1 flex items-center gap-2 text-[#eecd2b]">
              <Info className="w-4 h-4" /> Builder Tip
            </p>
            <p className="text-[11px] leading-relaxed opacity-70 text-[#1b190d] dark:text-white">
              Use "Dialogue Sequence" blocks to create natural flow. You can alternate between AI-speaking and User-speaking roles.
            </p>
          </div>
        </aside>

        {/* Right Panel: Workspace Canvas */}
        <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#f8f8f6] dark:bg-[#221f10]">
          <div className="max-w-4xl mx-auto space-y-8 pb-20">
            
            {blocks.map((block, index) => (
              <section key={block.id} className="bg-white dark:bg-[#2d2916] rounded-xl shadow-sm border border-[#eecd2b]/30 overflow-hidden relative group/block">
                <div className="absolute top-0 left-0 w-1 h-full bg-[#eecd2b]"></div>
                
                {/* --- ROLEPLAY SETUP BLOCK --- */}
                {block.type === 'roleplay_setup' && (
                  <>
                    <div className="p-6 border-b border-[#eecd2b]/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#eecd2b]/20 text-[#eecd2b] p-1.5 rounded-lg">
                          <Settings className="w-4 h-4" />
                        </span>
                        <h3 className="font-bold text-[#1b190d] dark:text-white">0{index+1}. Roleplay Setup</h3>
                      </div>
                      {renderBlockControls(index)}
                    </div>
                    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Character A */}
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider opacity-50">Character A (Tutor)</label>
                        <div className="flex items-center gap-4">
                          <div className="relative group/img">
                            <div className="w-20 h-20 rounded-2xl bg-[#eecd2b]/10 border-2 border-dashed border-[#eecd2b]/30 flex flex-col items-center justify-center cursor-pointer hover:border-[#eecd2b] transition-all overflow-hidden">
                              {block.characterA.avatarUrl ? (
                                <img src={block.characterA.avatarUrl} alt="Char A" className="w-full h-full object-cover" />
                              ) : <User className="w-8 h-8 text-[#eecd2b]/50" />}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                <Camera className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <input 
                              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-[#eecd2b]/10 rounded-lg text-sm focus:ring-[#eecd2b] focus:border-[#eecd2b] outline-none" 
                              placeholder="Name (e.g. Waiter)" 
                              value={block.characterA.name}
                              onChange={(e) => updateCharacter(index, 'characterA', 'name', e.target.value)}
                            />
                            <select 
                              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-[#eecd2b]/10 rounded-lg text-sm focus:ring-[#eecd2b] outline-none"
                              value={block.characterA.voiceType}
                              onChange={(e) => updateCharacter(index, 'characterA', 'voiceType', e.target.value)}
                            >
                              <option>Male (Standard)</option>
                              <option>Male (Polite Tone)</option>
                              <option>Female (Standard)</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Character B */}
                      <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider opacity-50">Character B (Learner)</label>
                        <div className="flex items-center gap-4">
                          <div className="relative group/img">
                            <div className="w-20 h-20 rounded-2xl bg-[#eecd2b]/10 border-2 border-dashed border-[#eecd2b]/30 flex flex-col items-center justify-center cursor-pointer hover:border-[#eecd2b] transition-all overflow-hidden">
                              {block.characterB.avatarUrl ? (
                                <img src={block.characterB.avatarUrl} alt="Char B" className="w-full h-full object-cover" />
                              ) : <User className="w-8 h-8 text-[#eecd2b]/50" />}
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                                <Camera className="w-5 h-5 text-white" />
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 space-y-3">
                            <input 
                              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-[#eecd2b]/10 rounded-lg text-sm focus:ring-[#eecd2b] focus:border-[#eecd2b] outline-none" 
                              placeholder="Name (e.g. Customer)" 
                              value={block.characterB.name}
                              onChange={(e) => updateCharacter(index, 'characterB', 'name', e.target.value)}
                            />
                            <div className="flex items-center gap-2 p-2 bg-[#eecd2b]/5 rounded-lg border border-[#eecd2b]/10">
                              <UserCheck className="w-4 h-4 text-[#eecd2b]" />
                              <span className="text-[11px] font-medium text-[#1b190d] dark:text-white">User-Controlled Character</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                {/* --- DIALOGUE SEQUENCE BLOCK --- */}
                {block.type === 'dialogue_sequence' && (
                  <>
                    <div className="p-6 border-b border-[#eecd2b]/10 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="bg-[#eecd2b]/20 text-[#eecd2b] p-1.5 rounded-lg">
                          <MessageSquare className="w-4 h-4" />
                        </span>
                        <h3 className="font-bold text-[#1b190d] dark:text-white">0{index+1}. Dialogue Sequence</h3>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-medium">Sequence Mode:</span>
                          <span className="px-2 py-1 bg-[#eecd2b]/20 rounded text-[10px] font-bold uppercase text-[#1b190d] dark:text-[#eecd2b]">Automatic</span>
                        </div>
                        {renderBlockControls(index)}
                      </div>
                    </div>

                    <div className="p-8 space-y-12 relative">
                      {block.messages.map((msg, msgIndex) => {
                        const isLearner = msg.speaker === 'B';
                        
                        return (
                          <div key={msg.id} className="relative group/msg">
                            {/* Nút đổi người nói / Xóa */}
                            <div className={`absolute top-0 ${isLearner ? '-left-12' : '-right-12'} opacity-0 group-hover/msg:opacity-100 transition-opacity flex flex-col gap-2`}>
                              <button onClick={() => toggleSpeaker(index, msgIndex)} className="p-2 bg-white dark:bg-[#2d2916] rounded-full shadow-sm hover:text-[#eecd2b]" title="Switch Speaker">
                                <User className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteMessage(index, msgIndex)} className="p-2 bg-white dark:bg-[#2d2916] rounded-full shadow-sm hover:text-red-500" title="Delete Message">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            <div className={`flex items-start gap-4 ${isLearner ? 'flex-row-reverse text-right' : ''}`}>
                              {/* Avatar */}
                              <div className={`w-10 h-10 rounded-full border-2 overflow-hidden shrink-0 ${isLearner ? 'border-[#eecd2b]/40' : 'border-[#eecd2b]'}`}>
                                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                  <span className="font-bold text-gray-500">{msg.speaker}</span>
                                </div>
                              </div>

                              <div className="flex-1 space-y-2">
                                {/* Message Settings */}
                                <div className={`flex items-center justify-between ${isLearner ? 'flex-row-reverse' : ''}`}>
                                  <span className="text-sm font-bold text-[#1b190d] dark:text-white">
                                    {isLearner ? 'Character B (Learner)' : 'Character A (Tutor)'}
                                  </span>
                                  
                                  <label className="inline-flex items-center cursor-pointer">
                                    <span className={`text-[10px] font-bold uppercase mr-3 opacity-60 ${isLearner ? 'text-[#eecd2b]' : ''}`}>
                                      {isLearner ? 'Require Speech Input' : 'AI Voice Auto-play'}
                                    </span>
                                    <div className={`relative w-9 h-5 rounded-full transition-colors ${msg.requiresSpeech || msg.isAutoPlay ? 'bg-[#eecd2b]' : 'bg-gray-300 dark:bg-gray-600'}`}>
                                      <div className={`absolute top-[2px] left-[2px] bg-white w-4 h-4 rounded-full transition-transform ${msg.requiresSpeech || msg.isAutoPlay ? 'translate-x-4' : ''}`}></div>
                                    </div>
                                  </label>
                                </div>

                                {/* Message Content Box */}
                                <div className={`p-5 relative overflow-hidden ${
                                  isLearner 
                                    ? 'bg-[#f8f8f6] dark:bg-[#221f10] rounded-2xl rounded-tr-none border border-[#eecd2b]/40' 
                                    : 'bg-[#eecd2b]/5 rounded-2xl rounded-tl-none border border-[#eecd2b]/10'
                                }`}>
                                  
                                  {/* Waveform Visualizer (Only for Learner) */}
                                  {isLearner && (
                                    <div className="absolute bottom-0 right-0 left-0 h-12 flex items-end justify-center gap-[2px] opacity-20 pointer-events-none">
                                      <div className="waveform-bar w-1 bg-[#eecd2b] rounded-full" style={{animationDelay: '0.1s'}}></div>
                                      <div className="waveform-bar w-1 bg-[#eecd2b] rounded-full" style={{animationDelay: '0.4s'}}></div>
                                      <div className="waveform-bar w-1 bg-[#eecd2b] rounded-full" style={{animationDelay: '0.2s'}}></div>
                                      <div className="waveform-bar w-1 bg-[#eecd2b] rounded-full" style={{animationDelay: '0.6s'}}></div>
                                      <div className="waveform-bar w-1 bg-[#eecd2b] rounded-full" style={{animationDelay: '0.3s'}}></div>
                                      <div className="waveform-bar w-1 bg-[#eecd2b] rounded-full" style={{animationDelay: '0.8s'}}></div>
                                      <div className="waveform-bar w-1 bg-[#eecd2b] rounded-full" style={{animationDelay: '0.5s'}}></div>
                                    </div>
                                  )}

                                  <div className="space-y-3 relative z-10">
                                    <div className="space-y-1">
                                      <label className={`text-[10px] font-bold opacity-40 uppercase block ${isLearner ? 'text-right' : 'text-left'}`}>Korean (Target)</label>
                                      <input 
                                        className={`w-full bg-transparent border-0 border-b border-[#eecd2b]/20 focus:border-[#eecd2b] focus:ring-0 p-0 py-1 text-lg font-medium outline-none ${isLearner ? 'text-right text-[#eecd2b]' : 'text-left text-[#1b190d] dark:text-white'}`}
                                        type="text" 
                                        placeholder="Type Korean sentence..."
                                        value={msg.korean}
                                        onChange={(e) => updateMessage(index, msgIndex, 'korean', e.target.value)}
                                      />
                                    </div>
                                    <div className="space-y-1">
                                      <label className={`text-[10px] font-bold opacity-40 uppercase block ${isLearner ? 'text-right' : 'text-left'}`}>English Translation</label>
                                      <input 
                                        className={`w-full bg-transparent border-0 border-b border-[#eecd2b]/20 focus:border-[#eecd2b] focus:ring-0 p-0 py-1 text-sm outline-none ${isLearner ? 'text-right' : 'text-left'}`}
                                        type="text" 
                                        placeholder="Translation..."
                                        value={msg.english}
                                        onChange={(e) => updateMessage(index, msgIndex, 'english', e.target.value)}
                                      />
                                    </div>
                                  </div>

                                  {/* STT Status Footer (Only for Learner) */}
                                  {isLearner && (
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#eecd2b]/10 relative z-10">
                                      <div className="flex items-center gap-2">
                                        <Mic className="text-[#eecd2b] w-4 h-4" />
                                        <span className="text-xs font-semibold text-[#eecd2b]">Voice Recognition Active</span>
                                      </div>
                                      <span className="text-[10px] font-bold opacity-50">Accuracy Threshold: 85%</span>
                                    </div>
                                  )}
                                  
                                  {/* Audio Player Footer (Only for Tutor) */}
                                  {!isLearner && (
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#eecd2b]/10 relative z-10">
                                      <div className="flex items-center gap-2">
                                        <Volume2 className="text-[#eecd2b] w-4 h-4" />
                                        <span className="text-xs font-semibold">Auto-generate Audio (TTS)</span>
                                      </div>
                                      <PlayCircle className="w-4 h-4 opacity-50" />
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* Connector Line (Trừ tin nhắn cuối) */}
                            {msgIndex !== block.messages.length - 1 && (
                              <div className={`absolute h-8 w-0.5 bg-[#eecd2b]/20 -bottom-10 ${isLearner ? 'right-[19px]' : 'left-[19px]'}`}></div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Nút Add Message Nằm Giữa */}
                    <div className="p-6 border-t border-[#eecd2b]/10 flex justify-center">
                      <button 
                        onClick={() => addMessage(index)}
                        className="flex items-center gap-2 px-6 py-2 border-2 border-dashed border-[#eecd2b]/40 rounded-full text-xs font-bold text-[#1b190d] dark:text-[#eecd2b] hover:bg-[#eecd2b]/10 hover:border-[#eecd2b] transition-all uppercase tracking-wider"
                      >
                        <Plus className="w-4 h-4" />
                        Add Next Message
                      </button>
                    </div>
                  </>
                )}

                {/* --- MOCK PRONUNCIATION BLOCK --- */}
                {block.type === 'pronunciation' && (
                  <div className="p-8 flex items-center justify-center text-gray-500 font-medium h-32">
                    <Mic className="w-6 h-6 mr-2 opacity-50" />
                    Pronunciation Test Interface (Coming Soon)
                  </div>
                )}
              </section>
            ))}

            {/* Bottom Add Block Placeholder */}
            <div className="pt-4 pb-12">
              <button className="w-full py-12 border-2 border-dashed border-[#eecd2b]/30 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-[#eecd2b]/5 hover:border-[#eecd2b] transition-all group">
                <div className="w-12 h-12 rounded-full bg-[#eecd2b]/10 flex items-center justify-center group-hover:bg-[#eecd2b] group-hover:text-[#1b190d] text-[#eecd2b] transition-all">
                  <PlusCircle className="w-6 h-6" />
                </div>
                <span className="text-sm font-medium text-gray-500 group-hover:text-[#1b190d] dark:group-hover:text-white transition-colors">
                  {blocks.length === 0 ? "Select a setup block from the left panel to start" : "Add another block to extend the roleplay"}
                </span>
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default SpeakingBuilder;