"use client";

import { TMessage } from "@/models/message.model";
import { formatTimeAgo } from "@/utils/formatTime";
import { Key } from "react";

interface MessageProps {
    message: TMessage & {
        createdBy: {
            username: string;
        };
    };
    className?: string;
    key?: Key | null;
}

const Message: React.FC<MessageProps> = function ({ message, className, key }) {
    return (
        <>
            <div key={key} className={`chat ${className}`}>
                <div className="chat-header">
                    {message.createdBy.username}
                    <time className="text-xs opacity-50">
                        {formatTimeAgo(new Date(message.createdAt))}
                    </time>
                </div>

                <div className="chat-bubble">{message.content}</div>
            </div>
        </>
    );
};

export default Message;
