// src/pages/ReadingPage.jsx
import React from 'react';
import { Clock } from 'lucide-react';
import ReadingHeader from '../../components/reading/ReadingHeader';
import ReadingPassage from '../../components/reading/ReadingPassage';
import QuizSidebar from '../../components/reading/QuizSidebar';


const ReadingPage = () => {

    const headerTags = [
        { label: "Intermediate", highlight: true },
        { label: "Cultural" },
        { label: "15 min read", icon: <Clock className="w-3.5 h-3.5" /> }
    ];

    return (

        <main className="flex-1 flex flex-col min-w-0">

            {/* 1. Header (Consistent Style) */}
            <ReadingHeader
                title="Reading: Gwangjang Market History"
                courseTitle="Intermediate Courses"
                unitTitle="Unit 4"
                tags={headerTags}
            />

            {/* 2. Content Body (Split View) */}
            <div className="flex flex-1 overflow-hidden max-w-7xl mx-auto w-full">
                <ReadingPassage
                    title="광장시장의 역사"
                    image="https://lh3.googleusercontent.com/aida-public/AB6AXuCdAwwdT70qSQ3ffO04X05fZllY1AfgNfB83ABKxXVS3ptrtSdz7RqNzjdGyJAggT9eaMV3C-YN-qkDPExn3A59DQyDbUDe6db5p_lTdIJ7ZgdNKpcaoP7JwAojrxqnneH1b3pBhur4HnQcWwI6CP6lWeD5aCsivdQf92W6gSVWonqhZF6aZFapn9pTF7uwZzUFN01wXjrg1U0MwzjokqrPiwkidshBdYDZXbIoBR7ZEQYj0n9er30mIwb3wozSdJGaV53ySUwrfvHa"
                />
                <QuizSidebar />
            </div>

        </main>
    );
};

export default ReadingPage;