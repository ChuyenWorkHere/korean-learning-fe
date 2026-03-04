import React from 'react';
import { Info } from 'lucide-react';

const DictationBlock = ({ data, onChange }) => {
  // Hàm Regex tự động nhận diện chữ trong ngoặc vuông
  const extractDictationBlanks = (text) => {
    if (!text) return [];
    const matches = text.match(/\[(.*?)\]/g);
    return matches ? matches.map(match => match.replace(/[\[\]]/g, '')) : [];
  };

  const blanks = extractDictationBlanks(data.text);

  return (
    <div className="p-6">
      <div className="mb-4 flex items-start gap-4 p-4 bg-[#eecd2b]/10 rounded-xl border border-[#eecd2b]/20 text-[#1b190d] dark:text-white">
        <Info className="w-5 h-5 text-[#eecd2b] mt-0.5 flex-shrink-0" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide">Builder Tooltip</p>
          <p className="text-[13px] opacity-70 mt-1 leading-relaxed">
            Enclose words in <span className="px-1.5 py-0.5 bg-white dark:bg-black/20 rounded font-mono border border-[#eecd2b]/30">[brackets]</span> to create interactive blanks for students. Example: <span className="italic">The weather is [nice] today.</span>
          </p>
        </div>
      </div>

      <div className="relative">
        <textarea 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#eecd2b]/20 rounded-xl text-base p-4 focus:ring-1 focus:ring-[#eecd2b] outline-none resize-y min-h-[150px]" 
          placeholder="Type or paste the full transcript here. Wrap words in [brackets] to make them fillable..." 
          value={data.text}
          onChange={(e) => onChange('text', e.target.value)}
        />
      </div>

      {/* Auto-detected Blanks Preview */}
      <div className="mt-6">
        <p className="text-xs font-semibold opacity-50 mb-2">Detected Blanks Preview:</p>
        <div className="flex flex-wrap gap-2 min-h-[30px]">
          {blanks.length > 0 ? (
            blanks.map((blank, i) => (
              <span key={i} className="px-3 py-1 bg-[#eecd2b]/20 text-[#221f10] dark:text-[#eecd2b] rounded-lg text-sm font-medium border border-[#eecd2b]/30">
                {blank}
              </span>
            ))
          ) : (
            <span className="text-sm italic opacity-40">No blanks detected yet. Try typing [word].</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DictationBlock;