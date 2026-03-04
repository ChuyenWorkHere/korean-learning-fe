import React from 'react';

const QuizBlock = ({ data, onChange }) => {
  const updateOption = (optIndex, field, value) => {
    const newOptions = [...data.options];
    if (field === 'isCorrect') {
      newOptions.forEach(opt => opt.isCorrect = false);
      newOptions[optIndex].isCorrect = true;
    } else {
      newOptions[optIndex][field] = value;
    }
    onChange('options', newOptions);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <label className="block text-xs font-bold uppercase text-[#5e5836] dark:text-[#eecd2b]/70 mb-2">Question Text</label>
        <textarea 
          className="w-full bg-[#f8f8f6] dark:bg-[#221f10] border border-[#e7e3cf] dark:border-[#3d3821] rounded-lg p-4 focus:ring-1 focus:ring-[#eecd2b] outline-none resize-y min-h-[80px]"
          placeholder="e.g. Where does Ji-soo want to go?"
          value={data.question}
          onChange={(e) => onChange('question', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase text-[#5e5836] dark:text-[#eecd2b]/70 mb-3">Answers (Select the correct one)</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.options.map((opt, oIndex) => (
            <div 
              key={opt.id} 
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-colors ${opt.isCorrect ? 'border-[#eecd2b] bg-[#eecd2b]/5' : 'border-[#e7e3cf] dark:border-[#3d3821] bg-[#f8f8f6] dark:bg-[#221f10]'}`}
            >
              <input 
                type="radio" 
                name={`quiz-${data.id}-correct`}
                className="w-5 h-5 text-[#eecd2b] focus:ring-[#eecd2b] cursor-pointer border-gray-300 dark:border-gray-600 bg-transparent"
                checked={opt.isCorrect}
                onChange={() => updateOption(oIndex, 'isCorrect', true)}
              />
              <input 
                type="text"
                className="w-full bg-transparent border-none p-0 focus:ring-0 text-sm outline-none"
                placeholder={`Option ${oIndex + 1}`}
                value={opt.text}
                onChange={(e) => updateOption(oIndex, 'text', e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizBlock;