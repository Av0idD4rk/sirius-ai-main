import React from 'react';
import { useRouter } from 'next/navigation';
import { Book } from '@/lib/types';

interface BookCoverProps {
    book: Book;
}

const BookCover: React.FC<BookCoverProps> = ({ book }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/books/${book.id}`);
    };

    return (
        <img
            loading="lazy"
            src={book.cover_image}
            alt={`Cover of ${book.title} by ${book.author}`}
            className="object-contain shrink-0 max-w-full rounded-md aspect-[0.67] w-[110px] cursor-pointer transition-transform hover:scale-105"
            onClick={handleClick}
            tabIndex={0}
            role="button"
            aria-label={`View details for ${book.title} by ${book.author}`}
        />
    );
};

export default BookCover;