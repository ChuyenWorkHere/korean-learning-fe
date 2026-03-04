import React from 'react';
import { User, Trash2, Mic, Volume2, PlayCircle, Plus } from 'lucide-react';

const DialogueSequenceBlock = ({ data, onChange }) => {
  
  const addMessage = () => {
    const newMessages = [...data.messages];
    const lastMsg = newMessages[newMessages.length - 1];
    const nextSpeaker = lastMsg && lastMsg.speaker === 'A' ? 'B' : 'A';
    const isLearner = nextSpeaker === 'B';

    newMessages.push({
      id: `msg-${Date.now()}`, speaker: nextSpeaker, korean: '', english: '', 
      isAutoPlay: !isLearner, requiresSpeech: isLearner
    });
    onChange('messages', newMessages);
  };

  const updateMessage = (msgIndex, field, value) => {
    const newMessages = [...data.messages];
    newMessages[msgIndex][field] = value;
    onChange('messages', newMessages);
  };

  const deleteMessage = (msgIndex) => {
    const newMessages = [...data.messages];
    newMessages.splice(msgIndex, 1);
    if(newMessages.length === 0) {
      newMessages.push({ id: `msg-${Date.now()}`, speaker: 'A', korean: '', english: '', isAutoPlay: true, requiresSpeech: false });
    }
    onChange('messages', newMessages);
  };

  const toggleSpeaker = (msgIndex) => {
    const newMessages = [...data.messages];
    const msg = newMessages[msgIndex];
    if (msg.speaker === 'A') {
      msg.speaker = 'B'; msg.requiresSpeech = true; msg.isAutoPlay = false;
    } else {
      msg.speaker = 'A'; msg.requiresSpeech = false; msg.isAutoPlay = true;
    }
    onChange('messages', newMessages);
  };

  return (
    <div className="p-8 space-y-12 relative">
      <style>{`
        @keyframes pulse-height { 0%, 100% { height: 12px; } 50% { height: 28px; } }
        .waveform-bar { animation: pulse-height 1.5s ease-in-out infinite; }
      `}</style>

      {data.messages.map((msg, msgIndex) => {
        const isLearner = msg.speaker === 'B';
        return (
          <div key={msg.id} className="relative group/msg">
            <div className={`absolute top-0 ${isLearner ? '-left-12' : '-right-12'} opacity-0 group-hover/msg:opacity-100 transition-opacity flex flex-col gap-2`}>
              <button onClick={() => toggleSpeaker(msgIndex)} className="p-2 bg-white dark:bg-[#2d2916] rounded-full shadow-sm hover:text-[#eecd2b]" title="Switch Speaker"><User className="w-4 h-4" /></button>
              <button onClick={() => deleteMessage(msgIndex)} className="p-2 bg-white dark:bg-[#2d2916] rounded-full shadow-sm hover:text-red-500" title="Delete Message"><Trash2 className="w-4 h-4" /></button>
            </div>

            <div className={`flex items-start gap-4 ${isLearner ? 'flex-row-reverse text-right' : ''}`}>
              <div className={`w-10 h-10 rounded-full border-2 overflow-hidden shrink-0 ${isLearner ? 'border-[#eecd2b]/40' : 'border-[#eecd2b]'}`}>
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="font-bold text-gray-500">{msg.speaker}</span>
                </div>
              </div>

              <div className="flex-1 space-y-2">
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

                <div className={`p-5 relative overflow-hidden ${isLearner ? 'bg-[#f8f8f6] dark:bg-[#221f10] rounded-2xl rounded-tr-none border border-[#eecd2b]/40' : 'bg-[#eecd2b]/5 rounded-2xl rounded-tl-none border border-[#eecd2b]/10'}`}>
                  {isLearner && (
                    <div className="absolute bottom-0 right-0 left-0 h-12 flex items-end justify-center gap-[2px] opacity-20 pointer-events-none">
                      {[0.1, 0.4, 0.2, 0.6, 0.3, 0.8, 0.5].map((delay, i) => (
                        <div key={i} className="waveform-bar w-1 bg-[#eecd2b] rounded-full" style={{ animationDelay: `${delay}s` }}></div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-3 relative z-10">
                    <div className="space-y-1">
                      <label className={`text-[10px] font-bold opacity-40 uppercase block ${isLearner ? 'text-right' : 'text-left'}`}>Korean (Target)</label>
                      <input 
                        className={`w-full bg-transparent border-0 border-b border-[#eecd2b]/20 focus:border-[#eecd2b] focus:ring-0 p-0 py-1 text-lg font-medium outline-none ${isLearner ? 'text-right text-[#eecd2b]' : 'text-left text-[#1b190d] dark:text-white'}`}
                        type="text" placeholder="Type Korean sentence..."
                        value={msg.korean} onChange={(e) => updateMessage(msgIndex, 'korean', e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className={`text-[10px] font-bold opacity-40 uppercase block ${isLearner ? 'text-right' : 'text-left'}`}>English Translation</label>
                      <input 
                        className={`w-full bg-transparent border-0 border-b border-[#eecd2b]/20 focus:border-[#eecd2b] focus:ring-0 p-0 py-1 text-sm outline-none ${isLearner ? 'text-right' : 'text-left'}`}
                        type="text" placeholder="Translation..."
                        value={msg.english} onChange={(e) => updateMessage(msgIndex, 'english', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#eecd2b]/10 relative z-10">
                    {isLearner ? (
                      <>
                        <div className="flex items-center gap-2"><Mic className="text-[#eecd2b] w-4 h-4" /><span className="text-xs font-semibold text-[#eecd2b]">Voice Recognition Active</span></div>
                        <span className="text-[10px] font-bold opacity-50">Accuracy Threshold: 85%</span>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center gap-2"><Volume2 className="text-[#eecd2b] w-4 h-4" /><span className="text-xs font-semibold">Auto-generate Audio (TTS)</span></div>
                        <PlayCircle className="w-4 h-4 opacity-50" />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {msgIndex !== data.messages.length - 1 && (
              <div className={`absolute h-8 w-0.5 bg-[#eecd2b]/20 -bottom-10 ${isLearner ? 'right-[19px]' : 'left-[19px]'}`}></div>
            )}
          </div>
        );
      })}

      <div className="pt-6 flex justify-center">
        <button onClick={addMessage} className="flex items-center gap-2 px-6 py-2 border-2 border-dashed border-[#eecd2b]/40 rounded-full text-xs font-bold text-[#1b190d] dark:text-[#eecd2b] hover:bg-[#eecd2b]/10 hover:border-[#eecd2b] transition-all uppercase tracking-wider">
          <Plus className="w-4 h-4" /> Add Next Message
        </button>
      </div>
    </div>
  );
};

export default DialogueSequenceBlock;