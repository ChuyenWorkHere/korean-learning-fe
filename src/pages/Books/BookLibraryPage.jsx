// src/pages/BookLibraryPage.jsx
import React, { useState } from 'react';
import { Search } from 'lucide-react';

// Import Components
import BookCard from '../../components/books/BookCard';
import FolkTaleCard from '../../components/books/FolkTaleCard';
import { useNavigate } from 'react-router';

const BookLibraryPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');

    // --- MOCK DATA: Books ---
    const allBooks = [
        {
            id: 1,
            title: "서울의 아침",
            subtitle: "Morning in Seoul",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxaDC7QbNQqILK8AmPG_F45cgFDh8n-hvYJTXmthxdgiDzs4UnpWUavug-htHfuqLxS5-G0-eQbOnMKpZgbC2Q2FUJ948dFmQSybZybTEl987y_cmdMu_Qm91biK6A3z4TxE2y-VhtffhiuGkiu7uWV-EikrHrEwfndXN7WNoh97WvCAzA_Kc9ofTGFEyu8SqoK3uPbw9Rrbc2-XfbzdnxQqr8ZwhnCfGWWgZn3tJJJHSQcnUUPtAvr9afC2KETIXOh60fPC8-APov",
            level: "A1 Beginner",
            levelCode: "A1",
            duration: "15 min read"
        },
        {
            id: 2,
            title: "한옥의 비밀",
            subtitle: "Secret of the Hanok",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCvvDQaKgEajcuZGVUQmiwTebNDZ2efSeRMry3bJsyObGcpYzcBY1lmaglm-hZWS1qgCc1-U7Y1mCyJGifG0hghlGM7_nHwPOFmSM5Hv_wTcytGeWahhK0ddnoi8Clo0sqNYLo4EPpgpDJbocEUy-DXBdQo8RAZJt5yo2jZ1SK-XDOF74k9s3cNwHJNfOBqk22WY_j4AESAs21G5y7YbENa8YoHMC8TtXIUjYHkxnwgVWJZFuIa9S30nec_8JNe_Ue21T4f1EEY7qRF",
            level: "B1 Intermediate",
            levelCode: "B1",
            duration: "25 min read"
        },
        {
            id: 3,
            title: "맛있는 비빔밥",
            subtitle: "Delicious Bibimbap",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDRnrZFGLkSk-KCOa72s3SHxueMcaePcvHBQo3ksIkV2xcTstpqFBh_c0eRyfChNQatXcw_iV7Y3vYbBzrjw0ry4l1-ArGXBLDiEOd5lZwWBPJOKzDKrPrapgHamj_CjCh3IPzt6tU4Eg_d0_rpTZiKuLFbsnX_wxmVq2RIAV-3K1JQQwmnFnN1sUxg5HHaN3YYrkdchudCkBW_MnC-1RSZclyoJu0yjV8ep70E89sIEBJnFalB5Qa-LJdWi05U8XlJaPQFKJMRYceO",
            level: "A2 Elementary",
            levelCode: "A2",
            duration: "10 min read"
        },
        {
            id: 4,
            title: "현대 사회의 그림자",
            subtitle: "Shadows of Modern Society",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBddOhBTGr44Lr6mEq4rjdUoYsKlTVIZnjY-2UBKPIxeE_y0Gw3P3JD3I0AbCP5o7FIuMywVjzh45QU5Xpybq0WntDSG0BdJP0SA6Orulia1wEg7sSqHe6oQtprDWB2ZRi7OcAA4SW5GCilL9GAndM4qZ8lt6sVQPPdnyd6dfquvzUhczJBQFt1Zd6F2xAoSmopR4Nmpn_JeoQeuTPDkTOeav2Gtt1Sw7Zl5B9dFBPbHYwWpTOnWEqECLhvuokT7h7Bybi52Ea-3JK5",
            level: "C1 Advanced",
            levelCode: "C1",
            duration: "45 min read"
        },
    ];

    // --- MOCK DATA: Folk Tales ---
    const folkTales = [
        {
            id: 1,
            title: "해와 달이 된 오누이",
            subtitle: "The Sun and Moon",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB19CDlOTx0c_UXCCmmOVRUPO8j78S_99aSQS76lAuK5mTulwtK9Ad1H5DRo6r6uqoA7aJikjSNjH6v-FPxufS5fmAkBLIBH2SXFXV2HgtXreyW2Y7bNfCEGEl2TbI3FUm2i78kXQR6b43Ah6cE2_EvIa284KulRPG_bfmxpy1vLjZ28akgE5RNzM8cg9_pB3TcC76v_OHHXacynrMnL8H_Z_Efdyx8ThuD1ypAMiNQ9qwMz8RV0WaKqvwzqWmG_RenA1ImSx0iyP9o"
        },
        {
            id: 2,
            title: "토끼와 자라",
            subtitle: "The Rabbit and Turtle",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTJzC1GXvpzc0HixXdduy2xOewZfbvGumQ9DblRc7vdIbJv31Q7RXOvIyHg-38A3ZdN-TdtLQUeBxTwtuqOOAWRDgGzdjG0OwDDnOa0uXDz1O9WPhYaDNLF4PiPa3BBz3OptVD35Cua7-yU8iAoR1n3I2MjxP6BE3_NYaYtxA2WxdnPI5FPPdQFBDJYSLCzuRu1B95q5a4sfQFE1E4SUuiuNNQA_et8UYbjE0cNq_nfD-OXKWabBERZTdqvVo3kmlnWy2fYz53AIEM"
        },
        {
            id: 3,
            title: "콩쥐 팥쥐",
            subtitle: "Kongji and Patji",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAggpvfz2g6oHnUpoLt9ykGv2BmIWJYAgZ40S-NuI2klOTmh5HyB-qw0WQm4QKivvTyY6avZE495sw77xl2f69-Nv4RCncTuRJi2vazhI8jWivfV0zyu5WEZ8bPcCHpFhf8MCZum5kpbBs6n0DTPkefAaZ_fWnTq_rIBEh1fmagU05X9Nk0rIdZPTibkjlHa_wjtn9_SYbtbSSjDgiJ2LHwQ4BTMN2-it9BNF1kQzSEZsAWlxXywMXpJJULqx7DwRCQfPiKgR5qMlQ9"
        }
    ];

    // Logic lọc sách
    const filteredBooks = activeTab === 'All'
        ? allBooks
        : allBooks.filter(book => book.level.includes(activeTab.split(' ')[0])); // Lọc theo A1, B1...

    return (
        <div className="flex h-screen bg-background-light dark:bg-background-dark font-display text-[#1b190d] dark:text-[#f3f1e7]">

            {/* Main Content Area */}
            <main className="flex-1 relative scroll-smooth">
                <div className="mx-auto w-full px-4 py-10">

                    {/* 1. Hero Title */}
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-[#1b190d] dark:text-[#f3f1e7] tracking-tight text-[32px] md:text-[42px] font-bold leading-tight text-center pb-2">
                            Korean Graded Readers <span className="text-primary">Library</span>
                        </h1>
                        <p className="text-[#9a8d4c] dark:text-[#b0a575] text-lg text-center max-w-2xl">
                            Improve your fluency through beautifully illustrated stories designed for your specific proficiency level.
                        </p>
                    </div>

                    {/* 2. Search & Filter Controls */}
                    <div className="flex flex-col gap-6 mb-12">
                        {/* SearchBar */}
                        <div className="max-w-[800px] mx-auto w-full">
                            <div className="relative group w-full">
                                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none text-[#9a8d4c]">
                                    <Search className="w-5 h-5" />
                                </div>
                                <input
                                    className="block w-full bg-[#f3f1e7] dark:bg-[#3a351a] border-none rounded-xl py-4 pl-12 pr-4 text-[#1b190d] dark:text-[#f3f1e7] placeholder-[#9a8d4c] focus:ring-2 focus:ring-primary/50 transition-all text-base"
                                    placeholder="Search for stories, folk tales, or daily topics..."
                                    type="text"
                                />
                            </div>
                        </div>

                        {/* Filter Chips */}
                        <div className="flex justify-center gap-3 flex-wrap">
                            {['All', 'A1-A2 (Beginner)', 'B1-B2 (Intermediate)', 'C1 (Advanced)'].map((label) => {
                                // Logic đơn giản để match với state activeTab
                                const value = label === 'All' ? 'All' : label.split(' ')[0];
                                const isActive = activeTab === (label === 'All' ? 'All' : label.split(' ')[0]);

                                return (
                                    <button
                                        key={label}
                                        onClick={() => setActiveTab(label === 'All' ? 'All' : label.split(' ')[0])}
                                        className={`flex h-10 items-center justify-center rounded-full px-6 transition-all ${isActive
                                                ? 'bg-primary text-white font-bold shadow-md transform scale-105'
                                                : 'bg-[#f3f1e7] dark:bg-[#3a351a] text-[#1b190d] dark:text-[#f3f1e7] hover:bg-primary/20'
                                            }`}
                                    >
                                        <span className="text-sm">{label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 3. Book Grid Section */}
                    <div className="flex items-center justify-between px-2 pb-6">
                        <h2 className="text-[#1b190d] dark:text-[#f3f1e7] text-2xl font-bold leading-tight tracking-tight">
                            {activeTab === 'All' ? 'Recently Added' : `${activeTab} Books`}
                        </h2>
                        <button className="text-primary text-sm font-bold hover:underline">View All</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
                        {filteredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                title={book.title}
                                subtitle={book.subtitle}
                                image={book.image}
                                level={book.level}
                                levelCode={book.levelCode}
                                duration={book.duration}
                                onRead={() => navigate(`/book-library/${book.id}`)}
                            />
                        ))}
                    </div>

                    {/* 4. Folk Tales Section (Horizontal Scroll) */}
                    <div className="flex items-center justify-between px-2 pb-6 pt-16">
                        <h2 className="text-[#1b190d] dark:text-[#f3f1e7] text-2xl font-bold leading-tight tracking-tight">
                            Classic Folktales
                        </h2>
                        <button className="text-primary text-sm font-bold hover:underline">Explore Folk</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
                        {folkTales.map((tale) => (
                            <FolkTaleCard
                                key={tale.id}
                                title={tale.title}
                                subtitle={tale.subtitle}
                                image={tale.image}
                                onClick={() => console.log('Open tale:', tale.id)}
                            />
                        ))}
                    </div>

                </div>
            </main>
        </div>
    );
};

export default BookLibraryPage;