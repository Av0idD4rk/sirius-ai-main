import React from "react";
import SummaryComponent from "@/components/book/chat/SummaryComponent";

export async function generateStaticParams() {
    const books = await fetch(process.env.NEXT_PUBLIC_API_URL + "/api/v1/books/", {
        method: "GET",
    }).then((res) => res.json());

    return books.map((book: any ) => ({
        bookId: book.id.toString(),
    }));
}


interface ChatPageProps {
    params: Promise<{
        bookId: number;
    }>;
}


async function SummaryPage({params}: ChatPageProps) {
    const {bookId} = await params;

    return (
        <>
            <SummaryComponent bookId={bookId}/>
        </>

    )
}

export default SummaryPage;
