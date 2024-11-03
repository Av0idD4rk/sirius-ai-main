import React from 'react';
import RecommendationCard from './RecommendationCard';

interface Book {
    id: number;
    title: string;
    cover_image: string;
    rating: number;
}

interface RecommendationSectionProps {
    books: Book[];
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ books }) => {
    return (
        <section className="mt-5 w-full">
            <h2 className="text-xl font-bold text-center text-black mt-7 max-sm:ml-0">
                Рекомендации дня
            </h2>
            <div className="flex justify-center gap-4 mt-2">
                {books.map((book, index) => (
                    <RecommendationCard key={book.id} book={book} isFirst={index === 0} />
                ))}
            </div>
        </section>
    );
};

export default RecommendationSection;