import React from "react";
import QuizComponent from "@/components/book/quiz/QuizComponent";

export async function generateStaticParams() {
    const books = await fetch(process.env.BACKEND_IP_ADDRESS + "/api/v1/books/", {
        method: "GET",
    }).then((res) => res.json());

    return books.map((book: any ) => ({
        bookId: book.id.toString(),
    }));
}

interface QuizPageProps {
    params: Promise<{
        bookId: number;
    }>;
}

export default async function QuizPage({params}: QuizPageProps) {
    const {bookId} = await params;

    return (
        <>
            <QuizComponent bookId={bookId}/>
        </>

    )
}