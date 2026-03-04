import React from 'react';
import { User, Camera, UserCheck } from 'lucide-react';

const RoleplaySetupBlock = ({ data, onChange }) => {
  const updateCharacter = (charKey, field, value) => {
    const updatedChar = { ...data[charKey], [field]: value };
    onChange(charKey, updatedChar);
  };

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Character A */}
      <div className="space-y-4">
        <label className="text-xs font-bold uppercase tracking-wider opacity-50">Character A (Tutor)</label>
        <div className="flex items-center gap-4">
          <div className="relative group/img">
            <div className="w-20 h-20 rounded-2xl bg-[#eecd2b]/10 border-2 border-dashed border-[#eecd2b]/30 flex flex-col items-center justify-center cursor-pointer hover:border-[#eecd2b] transition-all overflow-hidden">
              {data.characterA.avatarUrl ? (
                <img src={data.characterA.avatarUrl} alt="Char A" className="w-full h-full object-cover" />
              ) : <User className="w-8 h-8 text-[#eecd2b]/50" />}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <input 
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none" 
              placeholder="Name (e.g. Waiter)" 
              value={data.characterA.name}
              onChange={(e) => updateCharacter('characterA', 'name', e.target.value)}
            />
            <select 
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none cursor-pointer"
              value={data.characterA.voiceType}
              onChange={(e) => updateCharacter('characterA', 'voiceType', e.target.value)}
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
              {data.characterB.avatarUrl ? (
                <img src={data.characterB.avatarUrl} alt="Char B" className="w-full h-full object-cover" />
              ) : <User className="w-8 h-8 text-[#eecd2b]/50" />}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
          <div className="flex-1 space-y-3">
            <input 
              className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border-none rounded-lg p-3 text-sm focus:ring-1 focus:ring-[#eecd2b] outline-none" 
              placeholder="Name (e.g. Customer)" 
              value={data.characterB.name}
              onChange={(e) => updateCharacter('characterB', 'name', e.target.value)}
            />
            <div className="flex items-center gap-2 p-3 bg-[#eecd2b]/5 rounded-lg border border-[#eecd2b]/10">
              <UserCheck className="w-4 h-4 text-[#eecd2b]" />
              <span className="text-[11px] font-medium text-[#1b190d] dark:text-white">User-Controlled Character</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleplaySetupBlock;