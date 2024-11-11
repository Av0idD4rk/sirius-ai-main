"use client"
import React, {useEffect, useRef, useState} from 'react';
import MessageBubble from '@/components/book/chat/MessageBubble';
import Header from '@/components/book/chat/Header';
import {Message} from '@/lib/types';
import {AuthActions} from "@/lib/auth/utils";
import {useRouter} from "next/navigation";
import {v4} from "uuid";

interface ChatComponentProps {
    bookId: number;
}

const ChatComponent: React.FC<ChatComponentProps> = ({bookId}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const navigate = useRouter()
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchMessage()
    }, []);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const fetchMessage = async () => {
        const accessToken = await AuthActions().getToken("access")
        // Добавляем сообщение от пользователя в список сообщений
        const assistantuuid=v4()
        // Добавляем временное сообщение от ассистента
        const assistantMessage = { id: "msg_assistant_"+assistantuuid, text: "", role: "assistant" };
        // @ts-ignore
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);

        const apiResponse = await fetch(`/api/v1/ai/books/${bookId}/summarize/`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + accessToken
            },
        });

        if (!apiResponse.body) return;

        const reader = apiResponse.body
            .pipeThrough(new TextDecoderStream())
            .getReader();

        let accumulatedText = ""; // Для накопления текста от ассистента
        while (true) {
            const { value, done } = await reader.read();
            if (done) {
                navigate.refresh();
                break;
            }

            if (value) {
                accumulatedText += value;

                // Обновляем текст сообщения ассистента в состоянии
                setMessages((prevMessages) => {
                    return prevMessages.map((msg) => {
                        if (msg.id === "msg_assistant_" + assistantuuid) {
                            return {...msg, text: accumulatedText};
                        }
                        return msg;
                    });
                });
            }
        }

    };
    const handleGoBack = () => {
        navigate.back()
    };

    return (
        <main className="flex flex-col h-screen w-full mx-auto bg-white rounded-[30px] overflow-hidden">
            <Header onGoBack={handleGoBack}/>
            <section className="flex-grow overflow-y-auto px-6 py-8">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message}/>
                ))}
                <div ref={messagesEndRef}/>
            </section>
        </main>
    );
};

export default ChatComponent;


