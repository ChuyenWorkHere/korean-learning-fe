// src/pages/VocabularyLibraryPage.jsx
import React, { use, useState } from 'react';
import { History, Plus, Book, Utensils, Plane, MessageCircle, Clapperboard, Briefcase } from 'lucide-react';

// Import Components
import DeckCard from '../../components/vocabulary/DeckCard';
import FilterBar from '../../components/vocabulary/FilterBar';
import { Link, useNavigate } from 'react-router';

const VocabularyLibraryPage = () => {

  const navigate = useNavigate();

  const [activeFilter, setActiveFilter] = useState("All");

  // Mock Data (Dữ liệu giả lập)
  const decks = [
    { id: 1, title: "Essential Verbs", description: "Master the 50 most common verbs used in daily conversation.", level: "Beginner", total: 50, learned: 15, icon: Book, color: "bg-primary/20 text-primary" },
    { id: 2, title: "Street Food 101", description: "Learn to order like a local at Gwangjang Market.", level: "Intermediate", total: 45, learned: 42, icon: Utensils, color: "bg-orange-400/20 text-orange-400" },
    { id: 3, title: "Travel Phrases", description: "Everything you need for your first trip to Seoul.", level: "Beginner", total: 30, learned: 5, icon: Plane, color: "bg-blue-400/20 text-blue-400" },
    { id: 4, title: "Daily Greetings", description: "Master honorifics and polite greetings for all occasions.", level: "Beginner", total: 20, learned: 20, icon: MessageCircle, color: "bg-green-400/20 text-green-400" },
    { id: 5, title: "K-Drama Slang", description: "Understand the trendy expressions from your favorite shows.", level: "Intermediate", total: 40, learned: 8, icon: Clapperboard, color: "bg-purple-400/20 text-purple-400" },
    { id: 6, title: "Office Terms", description: "Professional vocabulary for working in a Korean company.", level: "Advanced", total: 60, learned: 0, icon: Briefcase, color: "bg-slate-400/20 text-slate-400" },
  ];

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-[#1b190d] dark:text-white">
      {/* Main Content */}
      <main className="flex-1 relative scroll-smooth">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <header className="flex flex-col gap-6 mb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-black text-text-main dark:text-white tracking-wide mb-2">Vocabulary Library</h2>
                <p className="text-text-muted tracking-wide text-md">Continue where you left off, Honeybee.</p>
              </div>
              <button className="bg-[#484223] hover:bg-[#5a522d] flex min-w-[140px] cursor-pointer items-center justify-center rounded-xl h-12 px-6 text-[#ededeb] text-base font-bold transition-transform hover:scale-105 shadow-md">
                <History className="w-4 h-4 me-2" />
                <span>History</span>
              </button>
            </div>

            {/* Filter Bar */}
            <FilterBar
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </header>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
            {decks.map((deck) => (
              <DeckCard
                key={deck.id}
                title={deck.title}
                description={deck.description}
                level={deck.level}
                totalWords={deck.total}
                learnedWords={deck.learned}
                icon={deck.icon}
                iconColorClass={deck.color}
                onStudy={() => navigate(`/vocabulary/study/${deck.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Floating Action Button (FAB) */}
        <Link to="/vocabulary/create">
          <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-background-dark rounded-full shadow-2xl shadow-primary/40 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group">
            <Plus className="w-8 h-8 group-hover:rotate-90 transition-transform duration-300" strokeWidth={3} />
          </button>
        </Link>
      </main>
    </div>
  );
};

export default VocabularyLibraryPage;