import React from 'react';
import { Message } from '@/lib/types';

interface MessageBubbleProps {
    message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
    const isAI = message.role === 'assistant';
    const bubbleClass = isAI
        ? "px-5 py-4 max-w-full bg-pink-200 rounded-[30px_30px_30px_0px]"
        : "self-end px-3.5 py-3 mt-3.5 max-w-full bg-zinc-100 rounded-[30px_30px_0px_30px]";

    return (
        <div className={`${bubbleClass} text-xs text-black mb-3.5`}>
            {message.text}
        </div>
    );
};

export default MessageBubble;