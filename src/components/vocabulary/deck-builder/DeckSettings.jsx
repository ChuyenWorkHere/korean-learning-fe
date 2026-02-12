// src/components/deck-builder/DeckSettings.jsx
import React from 'react';
import { Book, Globe, Mic, Palette, School, Image as ImageIcon } from 'lucide-react';

const ICONS = [
  { id: 'book', icon: Book },
  { id: 'language', icon: Globe },
  { id: 'speaking', icon: Mic },
  { id: 'school', icon: School },
  { id: 'art', icon: Palette },
];

const DeckSettings = ({ info, onChange }) => {
  
  const handleChange = (field, value) => {
    onChange({ ...info, [field]: value });
  };

  return (
    <section className="bg-white dark:bg-[#27251c] border border-[#e7e3cf] dark:border-[#393628] rounded-xl p-6 shadow-sm">
      <div className="flex flex-col md:flex-row gap-6 items-start mb-6">
        
        {/* Cover Icon Preview */}
        <div className="w-32 h-32 bg-[#f8f8f6] dark:bg-[#393628] rounded-xl flex items-center justify-center border border-dashed border-[#9a8d4c] dark:border-[#544f3b] shrink-0">
          <ImageIcon className="w-10 h-10 text-[#9a8d4c] dark:text-[#b9b49d]" />
        </div>

        <div className="flex-1 w-full">
          <h3 className="text-lg font-bold mb-1 text-[#1b190d] dark:text-white">Deck Details</h3>
          <p className="text-[#9a8d4c] dark:text-[#b9b49d] text-sm mb-4">Provide a title and description for your new Korean study set.</p>
          
          <div className="flex flex-wrap gap-4">
            <label className="flex-1 min-w-[300px]">
              <p className="text-sm font-medium text-[#9a8d4c] dark:text-[#b9b49d] mb-1.5 ml-1">Title</p>
              <input 
                type="text"
                value={info.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full rounded-lg border border-[#e7e3cf] dark:border-[#544f3b] bg-white dark:bg-[#181711] text-[#1b190d] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4 placeholder:text-gray-400" 
                placeholder="e.g. Essential Verbs Part 1" 
              />
            </label>
            <label className="w-full">
              <p className="text-sm font-medium text-[#9a8d4c] dark:text-[#b9b49d] mb-1.5 ml-1">Description</p>
              <textarea 
                value={info.description}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full rounded-lg border border-[#e7e3cf] dark:border-[#544f3b] bg-white dark:bg-[#181711] text-[#1b190d] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary min-h-[80px] p-4 placeholder:text-gray-400 resize-none" 
                placeholder="What will you learn in this deck?"
              ></textarea>
            </label>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <label>
          <p className="text-sm font-medium text-[#9a8d4c] dark:text-[#b9b49d] mb-1.5 ml-1">Category</p>
          <select 
            value={info.category}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full rounded-lg border border-[#e7e3cf] dark:border-[#544f3b] bg-white dark:bg-[#181711] text-[#1b190d] dark:text-white focus:border-primary focus:ring-1 focus:ring-primary h-12 px-4"
          >
            <option>Vocabulary</option>
            <option>Grammar</option>
            <option>Common Phrases</option>
            <option>Slang</option>
          </select>
        </label>
        
        <div>
          <p className="text-sm font-medium text-[#9a8d4c] dark:text-[#b9b49d] mb-1.5 ml-1">Cover Icon</p>
          <div className="flex gap-3">
            {ICONS.map((item) => {
              const Icon = item.icon;
              const isSelected = info.iconId === item.id;
              return (
                <button 
                  key={item.id}
                  onClick={() => handleChange('iconId', item.id)}
                  className={`size-10 rounded-full flex items-center justify-center transition-all ${
                    isSelected 
                      ? 'border-2 border-primary bg-white dark:bg-[#181711] text-primary' 
                      : 'border border-[#e7e3cf] dark:border-[#544f3b] bg-white dark:bg-[#181711] text-gray-400 hover:border-gray-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeckSettings;