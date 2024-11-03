import React from "react";
import PdfReactPdf from "@/components/book/read/BookViewer";

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
            <PdfReactPdf bookId={bookId}/>
        </>

    )
}