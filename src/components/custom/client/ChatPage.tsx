"use client";

import SendMessage from "./SendMessage";
import MessagesArea from "./MessagesArea";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface ChatPageProps {}

const ChatPage: React.FC<ChatPageProps> = function () {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [initialMessages, setInitialMessages] = useState<any[]>([]);

    useEffect(() => {
        const s = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
            withCredentials: true,
        });

        s.on("connect", () => {
            console.log("Connected !");
            setSocket(s);

            s.once("initial-messages", (messages) => {
                console.log("Init mss: ", messages);
                setInitialMessages(messages);
            });

            s.on("server-message", (message) => {
                setInitialMessages((prev) => [...prev, message]);
            });
        });

        return () => {
            s.disconnect();
        };
    }, []);

    return (
        <>
            <MessagesArea messages={initialMessages} />
            <SendMessage socket={socket} />
        </>
    );
};

export default ChatPage;
