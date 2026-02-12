// src/components/lookup/SearchBar.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <section className="mb-12">
      <h1 className="text-[#1b190d] dark:text-white tracking-tight text-[32px] md:text-[40px] font-bold leading-tight text-center pb-6">
        Word Usage Lookup
      </h1>
      
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-primary">
            <Search className="w-5 h-5" />
          </div>
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full p-4 pl-12 text-lg text-[#1b190d] dark:text-white border-2 border-[#f3f1e7] dark:border-[#3a351d] rounded-xl bg-white dark:bg-[#2d2915] focus:ring-primary focus:border-primary transition-all shadow-sm group-hover:shadow-md" 
            placeholder="Search for a Korean word (e.g., '나무')..." 
          />
          <button 
            type="submit"
            className="absolute right-3 top-2.5 bg-primary hover:bg-primary/90 text-[#1b190d] px-6 py-2 rounded-lg font-bold transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex gap-2 mt-4 justify-center text-sm text-gray-500 dark:text-gray-400">
          <span>Recent:</span>
          {['바다', '하늘', '친구'].map(word => (
            <button key={word} onClick={() => setQuery(word)} className="underline hover:text-primary">
              {word},
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SearchBar;