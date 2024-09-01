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
    containerClassName?: string;
    contentClassName?: string;
    key?: Key | null;
}

const Message: React.FC<MessageProps> = function ({
    message,
    containerClassName,
    key,
    contentClassName,
}) {
    return (
        <>
            <div key={key} className={`chat ${containerClassName}`}>
                <div className="chat-header">{message.createdBy.username}</div>

                <div className={`chat-bubble ${contentClassName}`}>
                    {message.content}
                </div>

                <div className="chat-footer">
                    <time className="text-xs opacity-50">
                        {formatTimeAgo(new Date(message.createdAt))}
                    </time>
                </div>
            </div>
        </>
    );
};

export default Message;
