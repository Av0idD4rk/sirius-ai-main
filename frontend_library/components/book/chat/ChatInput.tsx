import React, { useState } from 'react';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
    const [inputText, setInputText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputText.trim()) {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 p-6 bg-white">
            <input
                disabled={disabled}
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Написать Диназаврусу"
                className="grow shrink-0 px-4 py-3 rounded-[30px] border border-pink-400 focus:border-pink-500"
                aria-label="Type your message"
            />
            <button
                type="submit"
                className="flex relative flex-col justify-center items-center px-3 py-7 rounded-full aspect-square bg-pink-400 text-white"
                aria-label="Send message"
            >
                <ChatIcon className="object-contain aspect-square w-[5px]"/>
            </button>
        </form>
    );
};

export default ChatInput;

const ChatIcon = ({props}: any) => {
    return (
        <svg width={20} height={20} viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M3.6522 2.98321L8.91017 1.23093C11.2697 0.444576 12.5517 1.73247 11.7714 4.09154L10.0187 9.34837C8.84204 12.8839 6.90979 12.8839 5.73309 9.34837L5.21287 7.78804L3.6522 7.26793C0.115932 6.09149 0.115932 4.16584 3.6522 2.98321Z"
                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5 8L8 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}