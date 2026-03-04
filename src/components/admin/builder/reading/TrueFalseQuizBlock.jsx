import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

const TrueFalseQuizBlock = ({ data, onChange }) => {
  const addQuestion = () => {
    const newQuestions = [...data.questions, { id: `q-${Date.now()}`, text: '', isTrue: false }];
    onChange('questions', newQuestions);
  };

  const updateQuestion = (qIndex, field, value) => {
    const newQuestions = [...data.questions];
    newQuestions[qIndex][field] = value;
    onChange('questions', newQuestions);
  };

  const deleteQuestion = (qIndex) => {
    const newQuestions = [...data.questions];
    newQuestions.splice(qIndex, 1);
    if (newQuestions.length === 0) {
      newQuestions.push({ id: `q-${Date.now()}`, text: '', isTrue: false });
    }
    onChange('questions', newQuestions);
  };

  return (
    <div className="p-6 space-y-4">
      {data.questions.map((q, qIndex) => (
        <div key={q.id} className="flex items-center gap-4 lg:gap-6 p-4 bg-[#f8f8f6] dark:bg-[#221f10]/50 rounded-lg group/row border border-transparent hover:border-[#eecd2b]/20 transition-all">
          <div className="flex-1">
            <label className="text-[10px] font-bold text-gray-400 block mb-1">QUESTION {qIndex + 1}</label>
            <input 
              className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 font-medium text-[#1b190d] dark:text-white outline-none" 
              placeholder="Type question statement..." 
              type="text" 
              value={q.text}
              onChange={(e) => updateQuestion(qIndex, 'text', e.target.value)}
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
                onChange={(e) => updateQuestion(qIndex, 'isTrue', e.target.checked)}
              />
              <div className={`w-11 h-6 rounded-full peer transition-colors ${q.isTrue ? 'bg-[#eecd2b]' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div className={`absolute top-[2px] left-[2px] bg-white border-gray-300 border rounded-full h-5 w-5 transition-transform ${q.isTrue ? 'translate-x-full border-white' : ''}`}></div>
              </div>
            </label>
          </div>
          
          <button 
            onClick={() => deleteQuestion(qIndex)}
            className="text-gray-300 hover:text-red-500 transition-colors ml-2"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <button onClick={addQuestion} className="text-sm text-[#eecd2b] font-semibold flex items-center gap-1 hover:underline mt-4">
        <Plus className="w-4 h-4" /> Add Question
      </button>
    </div>
  );
};

export default TrueFalseQuizBlock;