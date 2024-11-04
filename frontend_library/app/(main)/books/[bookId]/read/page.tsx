import React from "react";
import BookViewer from "@/components/book/read/BookViewer1";

export async function generateStaticParams() {
    const books = await fetch(process.env.BACKEND_IP_ADDRESS + "/api/v1/books/", {
        method: "GET",
    }).then((res) => res.json());

    return books.map((book: any ) => ({
        bookId: book.id.toString(),
    }));
}

interface ReadPageProps {
    params: Promise<{
        bookId: number;
    }>;
}

export default async function ReadPage({params}: ReadPageProps) {
    const {bookId} = await params;

    return (
        <>
            <BookViewer bookId={bookId}/>
        </>

    )
}