// src/pages/CreateDeckPage.jsx
import React, { useState, useRef } from 'react';
import { PlusCircle, Plus, Save } from 'lucide-react';
import { useNavigate } from 'react-router';


// Import Components
import DeckSettings from '../../components/vocabulary/deck-builder/DeckSettings';
import CardRow from '../../components/vocabulary/deck-builder/CardRow';

const CreateDeckPage = () => {
  const navigate = useNavigate();
  const bottomRef = useRef(null); // Ref để auto-scroll

  // --- STATE ---
  const [deckInfo, setDeckInfo] = useState({
    title: '',
    description: '',
    category: 'Vocabulary',
    iconId: 'book'
  });

  const [cards, setCards] = useState([
    { id: 1, front: '', back: '', example: '' },
    { id: 2, front: '', back: '', example: '' },
    { id: 3, front: '', back: '', example: '' },
  ]);

  // --- FUNCTIONS ---

  // 1. Thêm dòng mới
  const handleAddCard = () => {
    const newId = cards.length > 0 ? Math.max(...cards.map(c => c.id)) + 1 : 1;
    setCards([...cards, { id: newId, front: '', back: '', example: '' }]);
    
    // Tự động cuộn xuống dưới cùng sau khi thêm
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // 2. Xóa dòng
  const handleRemoveCard = (id) => {
    // Không cho xóa nếu chỉ còn 1 dòng (UX optional)
    if (cards.length === 1) return; 
    setCards(cards.filter(c => c.id !== id));
  };

  // 3. Cập nhật nội dung thẻ
  const handleCardChange = (id, field, value) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  // 4. Lưu bộ thẻ
  const handleSave = () => {
    if (!deckInfo.title.trim()) {
      alert("Please enter a deck title!");
      return;
    }
    // Gửi dữ liệu lên API hoặc lưu vào LocalStorage
    const payload = { ...deckInfo, cards };
    console.log("Saving Deck:", payload);
    
    // Chuyển hướng sau khi lưu
    navigate('/vocabulary'); 
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark font-display text-[#1b190d] dark:text-white">
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full relative">
        
        {/* Sticky Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e7e3cf] dark:border-[#393628] bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-8 py-4">
          <div className="flex items-center gap-3">
            <PlusCircle className="text-primary w-6 h-6" />
            <h2 className="text-xl font-bold tracking-tight">Create New Deck</h2>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => navigate(-1)}
              className="min-w-[100px] rounded-lg h-10 px-4 bg-gray-200 dark:bg-[#393628] text-[#1b190d] dark:text-white text-sm font-bold hover:bg-gray-300 dark:hover:bg-[#4a4735] transition-colors"
            >
              Cancel
            </button>
            <button 
              onClick={handleSave}
              className="min-w-[120px] rounded-lg h-10 px-4 bg-primary text-[#181711] text-sm font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:brightness-105 active:scale-95 transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save Deck</span>
            </button>
          </div>
        </header>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-[1000px] w-full mx-auto flex flex-col gap-8 pb-20">
            
            {/* Deck Settings */}
            <DeckSettings 
              info={deckInfo} 
              onChange={setDeckInfo} 
            />

            {/* Flashcard List */}
            <section className="flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2 px-1">
                <h3 className="text-lg font-bold">Cards ({cards.length})</h3>
                <p className="text-[#9a8d4c] dark:text-[#b9b49d] text-sm">Fill in the Korean word and its meaning below.</p>
              </div>

              {cards.map((card, index) => (
                <CardRow 
                  key={card.id}
                  index={index}
                  card={card}
                  onChange={handleCardChange}
                  onRemove={handleRemoveCard}
                />
              ))}

              {/* Add Button */}
              <button 
                onClick={handleAddCard}
                className="w-full flex items-center justify-center gap-2 border-2 border-dashed border-[#9a8d4c] dark:border-[#544f3b] rounded-xl py-6 text-[#9a8d4c] dark:text-[#b9b49d] hover:bg-primary/10 hover:border-primary/50 hover:text-primary transition-all group mt-4"
              >
                <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="font-bold">Add New Card</span>
              </button>

              {/* Dummy element for auto-scroll */}
              <div ref={bottomRef} />
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateDeckPage;