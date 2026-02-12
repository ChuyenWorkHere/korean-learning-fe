// src/pages/WordUsagePage.jsx
import React from 'react';
import { BookOpen } from 'lucide-react';
import { XMLParser } from 'fast-xml-parser';
import SearchBar from '../../components/lookup/SearchBar';
import SenseCard from '../../components/lookup/SenseCard';
import WordHeader from '../../components/lookup/WordHeader';
import WordNotFound from '../../components/lookup/WordNotFound';

const WordUsagePage = () => {

    const [searchResults, setSearchResults] = React.useState(null);
    const [isFirstSearch, setIsFirstSearch] = React.useState(true);
    const [isNotFound, setIsNotFound] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [senseInfo, setSenseInfo] = React.useState([]);

    const apiSearchUrl = import.meta.env.VITE_KRDICT_SEARCH_API_URL;
    const apiViewUrl = import.meta.env.VITE_KRDICT_VIEW_API_URL;
    const apiKey = import.meta.env.VITE_KRDICT_KEY;

    const handleSearch = async (keyword) => {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const parser = new XMLParser();

        try {
            setIsLoading(true);
            setIsNotFound(false);
            setIsFirstSearch(false);
            // BƯỚC 1: Tìm kiếm để lấy target_code
            const searchTarget = `${apiSearchUrl}?key=${apiKey}&q=${keyword}&translated=y&trans_lang=7`;
            const searchRes = await fetch(proxyUrl + searchTarget);
            const searchXml = await searchRes.text();
            const searchJson = parser.parse(searchXml);

            const items = searchJson.channel.item || [];

            if (items.length === 0) {
                setIsNotFound(true);
                return []
            };

            // BƯỚC 2: Lấy chi tiết (câu ví dụ) cho các từ tìm được
            const firstItem = Array.isArray(items) ? items[0] : items;
            const targetCode = firstItem.target_code;

            const viewTarget = `${apiViewUrl}?key=${apiKey}&method=target_code&q=${targetCode}&translated=y&trans_lang=7`;
            const viewRes = await fetch(proxyUrl + viewTarget);
            const viewXml = await viewRes.text();
            const viewJson = parser.parse(viewXml);

            // Trích xuất câu ví dụ từ viewJson
            // Cấu trúc XML của KRDict sau khi parse thường là: channel -> item -> sense -> example
            const detailedItem = viewJson.channel.item;

            console.log("Dữ liệu chi tiết có ví dụ:", detailedItem);
            setSearchResults(detailedItem);
            const senseInfo = Array.isArray(detailedItem.word_info.sense_info)
                ? detailedItem.word_info.sense_info
                : [detailedItem.word_info.sense_info];
            setSenseInfo(senseInfo);

            // Trả về dữ liệu đã gộp (từ vựng + ví dụ)
            return detailedItem;

        } catch (error) {
            console.error("Lỗi khi tra từ điển:", error);
            return [];
        } finally {
            setIsLoading(false);
        }
    };

    return (

        <main className="w-full max-w-[800px] mx-auto px-4 py-10">
            {/* 1. Search Section */}
            <SearchBar onSearch={handleSearch} />

            {isFirstSearch ? (
                <div className="text-center text-gray-500 mt-20 space-y-4">
                    <BookOpen className="w-12 h-12 mx-auto text-gray-300" />
                    <p className="text-lg">Start by searching for a Korean word to see its usage examples.</p>
                </div>
            ) : (
                isLoading ? (
                    <div className="flex justify-center mt-30">
                        <div className="loader"></div>
                    </div>
                ) : (
                    isNotFound ? (
                        <WordNotFound />
                    ) : (
                        <article className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {/* Header Info */}
                            <WordHeader
                                word={searchResults.word_info.word}
                                romaji={searchResults.word_info.pronunciation_info.pronunciation}
                                level={searchResults.word_info.word_grade}
                                type={searchResults.word_info.pos[0]}
                                audio={searchResults.word_info.pronunciation_info.link}
                            />
                            {/* 2. Scrollable Content */}
                            <div className="flex-1 overflow-y-auto px-2 py-4 md:px-10 scroll-smooth">
                                <div className="max-w-4xl mx-auto space-y-6 pb-10">

                                    {senseInfo.map((sense, index) => (
                                        <SenseCard
                                            key={index}
                                            index={index + 1}
                                            data={sense}
                                            highlightWord={searchResults.word_info.word}
                                        />
                                    ))}

                                    {/* Footer */}
                                    <div className="pt-5 text-center text-gray-400 text-sm">
                                        <p>Found an error or missing meaning? <a href="#" className="text-primary hover:underline font-medium">Suggest an edit</a></p>
                                    </div>

                                </div>
                            </div>
                        </article>
                    )
                )
            )}
        </main>
    );
};

export default WordUsagePage;