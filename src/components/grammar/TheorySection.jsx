// src/components/grammar/TheorySection.jsx
import React from 'react';
import { BookOpen, CheckCircle } from 'lucide-react';

const TheorySection = ({ description, rules, conjugation, examples }) => {
  return (
    <section className="bg-white dark:bg-[#2d2a1a] rounded-2xl shadow-sm border border-primary/10 overflow-hidden">
      
      {/* Section Header */}
      <div className="bg-primary/10 px-6 py-4 border-b border-primary/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BookOpen className="text-primary w-6 h-6" />
          <h2 className="text-xl font-bold text-[#1b190d] dark:text-white">Theory Overview</h2>
        </div>
        <span className="text-xs font-bold text-primary uppercase tracking-widest">Reference</span>
      </div>

      <div className="p-6 space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          
          {/* Description & Rules List */}
          <div className="space-y-4">
            <div className="text-base leading-relaxed text-[#1b190d] dark:text-gray-200">
              {/* Sử dụng dangerouslySetInnerHTML nếu description có chứa thẻ HTML (như span, strong) */}
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </div>
            <ul className="space-y-3">
              {rules.map((rule, idx) => (
                <li key={idx} className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle className="text-primary w-5 h-5 shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: rule }} />
                </li>
              ))}
            </ul>
          </div>

          {/* Conjugation Rule Box */}
          <div className="bg-background-light dark:bg-background-dark p-6 rounded-xl border-l-4 border-primary self-center shadow-inner">
            <h3 className="font-bold text-sm mb-3 text-primary uppercase tracking-wider">Conjugation Rule</h3>
            <div className="flex flex-wrap items-center gap-3 text-lg font-mono text-[#1b190d] dark:text-white">
              <span className="bg-primary/20 px-2 py-1 rounded">Stem</span>
              <span className="text-primary font-bold">+</span>
              <span className="bg-primary px-3 py-1 rounded text-[#1b190d] font-bold">{conjugation}</span>
            </div>
          </div>
        </div>

        {/* Examples Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary/5">
                <th className="p-3 border-b border-primary/20 font-bold text-sm text-[#1b190d] dark:text-gray-300">Base Verb</th>
                <th className="p-3 border-b border-primary/20 font-bold text-sm text-[#1b190d] dark:text-gray-300">Korean Sentence</th>
                <th className="p-3 border-b border-primary/20 font-bold text-sm text-[#1b190d] dark:text-gray-300">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {examples.map((ex, idx) => (
                <tr key={idx} className="border-b border-primary/10 last:border-0 hover:bg-primary/5 transition-colors">
                  <td className="p-3 text-sm text-[#1b190d] dark:text-gray-300">{ex.verb}</td>
                  {/* Render HTML cho câu ví dụ để có thể highlight phần ngữ pháp */}
                  <td className="p-3 font-medium text-[#1b190d] dark:text-white" dangerouslySetInnerHTML={{ __html: ex.sentence }} />
                  <td className="p-3 text-xs opacity-60 italic text-gray-500 dark:text-gray-400">{ex.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default TheorySection;