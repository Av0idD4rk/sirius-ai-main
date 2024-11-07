"use client"

import React, {useEffect, useState} from 'react';
import SearchBar from '@/components/book/shelf/SearchBar';
import BookGrid from '@/components/book/shelf/BookGrid';
import { Book } from '@/lib/types';
import {useRouter} from "next/navigation";
import withAuth from "@/components/auth/withAuth";
import useSWR from "swr";
import {fetcher} from "@/lib/auth/fetcher";

const BookShelf: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [books, setBooks] = useState<Book[]>([]);
    const {data, isLoading} = useSWR('/api/v1/books',fetcher);
    setBooks(data);
    const navigate = useRouter()
    const onGoBack = () => {
        navigate.back()
    };
    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (isLoading) return <p>Loading...</p>;
    return (
        <main className="flex flex-col items-center px-9 pt-14 pb-24 mx-auto w-full bg-white max-w-[480px] rounded-[30px] max-sm:pt-8 max-sm:px-3.5 max-sm:mt-0">
            <header className="flex gap-10 text-2xl font-bold text-center text-black w-full">
                <button
                    onClick={onGoBack}
                    aria-label="Go back"
                    className="object-contain shrink-0 aspect-square w-[45px] -ml-10"
                >
                    <BackMark/>
                </button>
                <h1 className="my-auto basis-auto max-sm:ml-5">Книжная полка</h1>
            </header>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <div className="overflow-y-auto w-full max-h-[calc(100vh-200px)] flex justify-center">
                <BookGrid books={filteredBooks}/>
            </div>
        </main>
    );
};

export default withAuth(BookShelf);

const BackMark = ({props}: any) => {
    return (
        <svg width={80} height={78} viewBox="0 0 74 72" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <circle cx="37.5" cy="35.5" r="22.5" fill="#F4F4F4"/>
            <path d="M38.9689 42.92L31.8618 36.4C31.0225 35.63 31.0225 34.37 31.8618 33.6L38.9689 27.08" stroke="black"
                  strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

    )

}