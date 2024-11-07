"use client"
import React, {useEffect, useRef, useState} from 'react';
import MessageBubble from '@/components/book/chat/MessageBubble';
import ChatInput from '@/components/book/chat/ChatInput';
import Header from '@/components/book/chat/Header';
import {Message} from '@/lib/types';
import {AuthActions} from "@/lib/auth/utils";
import {useRouter} from "next/navigation";
import {v4} from "uuid";
import withAuth from "@/components/auth/withAuth";

interface ChatComponentProps {
    bookId: number;
}
//TODO: тут вообще всё, надо подумать
const ChatComponent: React.FC<ChatComponentProps> = ({bookId}) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [threadId, setThreadId] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useRouter()
    const messagesEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        fetchThreadId().then((threadId) =>
            fetchMessages(threadId));

    }, []);
    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    const fetchThreadId = async () => {
        const accessToken = await AuthActions().getToken("access")
        const response = await fetch(process.env.BACKEND_IP_ADDRESS + "/api/v1/ai/threads/", {
            method: "POST",
            headers: {
                "Authorization": "Bearer " + accessToken,
                "Content-Type": "application/json",
            },
            body: `{"book_id": ` +bookId+"}"
        })
        const data = await response.json();
        setThreadId(data.thread_id)
        return data.thread_id;
    }
    const fetchMessages = async (threadId: string) => {
        const accessToken = await AuthActions().getToken("access")
        const response = await fetch(process.env.BACKEND_IP_ADDRESS + "/api/v1/ai/threads/"+threadId+"/messages/", {
            method: "GET",
            headers:{
                "Authorization": "Bearer " + accessToken
            }

        });
        const data = await response.json();
        setMessages(data.data.reverse());
        setIsLoading(false);
    };

    const sendMessage = async (text: string) => {
        const accessToken = await AuthActions().getToken("access")
        // Добавляем сообщение от пользователя в список сообщений
        setMessages([...messages, { id: "msg_user_"+v4(), text, role: "user" }]);
        const assistantuuid=v4()
        // Добавляем временное сообщение от ассистента
        const assistantMessage = { id: "msg_assistant_"+assistantuuid, text: "", role: "assistant" };
        // @ts-ignore
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);

        const apiResponse = await fetch(`${process.env.BACKEND_IP_ADDRESS}/api/v1/ai/threads/${threadId}/messages/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + accessToken
            },
            body: JSON.stringify({ content: text }),
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
    if (isLoading) return <p>Loading...</p>

    return (
        <main className="flex flex-col h-screen w-full mx-auto bg-white rounded-[30px] overflow-hidden">
            <Header onGoBack={handleGoBack}/>
            <section className="flex-grow overflow-y-auto px-6 py-8">
                {messages.map((message) => (
                    <MessageBubble key={message.id} message={message}/>
                ))}
                <div ref={messagesEndRef}/>
            </section>
            <ChatInput onSendMessage={sendMessage} disabled={false}/>
        </main>
    );
};

export default withAuth(ChatComponent);


