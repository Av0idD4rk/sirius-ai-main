import React from "react";
import BookDetails from "@/components/book/BookDetails";

export async function generateStaticParams() {
    const books = await fetch(process.env.BACKEND_IP_ADDRESS + "/api/v1/books/", {
        method: "GET",
    }).then((res) => res.json());

    return books.map((book: { id: { toString: () => any; }; }) => ({
        bookId: book.id.toString(),
    }));
}


interface BookIdPageProps {
    params: Promise<{
        bookId: number;
    }>;
}


async function BookIdPage({params}: BookIdPageProps) {
    const {bookId} = await params;

    return (
        <div className="flex h-full">
            <BookDetails bookId={bookId}/>
        </div>

    )
}

export default BookIdPage;
