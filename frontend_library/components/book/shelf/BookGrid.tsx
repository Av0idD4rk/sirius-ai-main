import React from 'react';
import BookCover from '@/components/book/shelf/BookCover';
import { Book } from '@/lib/types';

interface BookGridProps {
    books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
    const rows = Math.ceil(books.length / 2);

    return (
        <section className="mt-7 w-full max-w-[274px]">
            {[...Array(rows)].map((_, rowIndex) => (
                <div key={rowIndex} className={`flex gap-5 justify-between ${rowIndex > 0 ? 'mt-8' : ''}`}>
                    {books.slice(rowIndex * 2, rowIndex * 2 + 2).map((book) => (
                        <BookCover key={book.id} book={book} />
                    ))}
                </div>
            ))}
        </section>
    );
};

export default BookGrid;