"use client"

import React from 'react';
import Header from './Header';
import StreakCard from './StreakCard';
import BookShelf from './BookShelf';
import RecommendationSection from './RecommendationSection';
import withAuth from "@/components/auth/withAuth";

interface Book {
    id: number;
    title: string;
    cover_image: string;
    rating: number;
}

interface BookAIProps {
    streakDays: number;
    recommendationBooks: Book[];
}

const BookAI: React.FC<BookAIProps> = ({ streakDays, recommendationBooks }) => {
    return (
        <main className="flex overflow-hidden flex-col mx-auto h-full w-full bg-white max-w-[480px] rounded-[30px]">
            <Header />
            <section className="flex flex-col items-center h-full pt-12 pb-5 w-full bg-zinc-100 rounded-[42px_42px_30px_30px] max-sm:ml-0">
                <StreakCard streakDays={streakDays} />
                <BookShelf />
                <RecommendationSection books={recommendationBooks} />
            </section>
        </main>
    );
};

export default withAuth(BookAI);



