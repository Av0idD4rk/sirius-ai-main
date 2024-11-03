"use client"

import React from 'react';
import {useRouter} from "next/navigation";
import BookHeader from '@/components/book/BookHeader';
import BookDescription from '@/components/book/BookDescription';
import BookActions from '@/components/book/BookActions';
import useSWR from "swr";
import {fetcher} from "@/lib/auth/fetcher";

import withAuth from "@/components/auth/withAuth";


interface BookDetailsProps {
    bookId: number;
}

const BookDetails: React.FC<BookDetailsProps> = ({bookId}) => {
    const navigate = useRouter();
    const {data: book, isLoading} = useSWR("/api/v1/books/" + bookId + "/", fetcher);
    const handleGoBack = () => {
        navigate.back()
    };
    if (isLoading) return <p>Loading...</p>;
    return (

        <div
            className="h-full flex overflow-hidden flex-col items-center px-6 pb-6 mx-auto w-full bg-neutral-100 max-w-[480px] rounded-[30px]">
            <BookHeader coverImage={book.cover_image}  category={book.categories[0]} onGoBack={handleGoBack}/>
            <BookDescription title={book.title} author={book.author} rating={book.average_rating}
                             description={book.description} bookId={bookId}/>
            <BookActions bookId={bookId}/>
        </div>
    );
};

export default withAuth(BookDetails);


