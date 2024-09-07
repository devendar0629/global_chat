"use client";

import { TMessage } from "@/models/message.model";
import { formatTimeAgo } from "@/utils/formatTime";

interface MessageProps {
    message:
        | (TMessage & {
              createdBy: {
                  username: string;
              };
          })
        | any;
    isSentByCurrentUser: boolean;
}

const Message: React.FC<MessageProps> = function ({
    message,
    isSentByCurrentUser,
}) {
    return (
        <>
            <div
                className={`chat ${
                    isSentByCurrentUser ? "chat-end" : "chat-start"
                }`}
            >
                <div className="chat-header">
                    {isSentByCurrentUser ? "You" : message.createdBy.username}
                </div>

                <div
                    className={`chat-bubble ${
                        isSentByCurrentUser
                            ? "chat-bubble-primary"
                            : "chat-bubble-secondary"
                    }`}
                >
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
