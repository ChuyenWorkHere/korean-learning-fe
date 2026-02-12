// src/components/library/FilterBar.jsx
import React from 'react';
import { Search } from 'lucide-react';

const FILTERS = ["All", "TOPIK I", "TOPIK II", "Daily Life", "Travel", "Food", "Business"];

const FilterBar = ({ activeFilter, onFilterChange }) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#c9c092] group-focus-within:text-primary transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input 
          className="block w-full bg-[#484223]/20 border-2 border-transparent focus:border-primary/50 focus:ring-0 focus:outline-none rounded-xl py-4 pl-12 pr-4 text-background-dark dark:text-white placeholder-[#a5a581] transition-all" 
          placeholder="Search for a deck (e.g., travel, food, business...)" 
          type="text" 
        />
      </div>

      {/* Filter Chips */}
      <div className="flex justify-center gap-3 flex-wrap">
        {FILTERS.map((filter) => (
          <button 
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-5 py-2 rounded-full font-bold text-sm whitespace-nowrap transition-colors ${
              activeFilter === filter
                ? 'bg-primary text-background-dark'
                : 'bg-[#484223]/30 text-[#c9c092] hover:bg-[#484223]/50'
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;