import React from "react";
import ChatComponent from "@/components/book/chat/ChatComponent";

export async function generateStaticParams() {
    const books = await fetch(process.env.NEXT_PUBLIC_API_URL+ "/books/", {
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


async function ChatPage({params}: ChatPageProps) {
    const {bookId} = await params;

    return (
        <>
            <ChatComponent bookId={bookId}/>
        </>

    )
}

export default ChatPage;
