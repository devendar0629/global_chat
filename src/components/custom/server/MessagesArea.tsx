"use client";

import { useToast } from "@/hooks/use-toast";
import { TMessage } from "@/models/message.model";
import { useEffect, useState } from "react";
import Message from "../Message";

interface MessagesAreaProps {}

const MessagesArea = function () {
    const [messages, setMessages] = useState<
        (TMessage & {
            createdBy: {
                username: string;
            };
        })[]
    >([]);
    const [fetching, setFetching] = useState<boolean>(false);
    const { toast } = useToast();

    const fetchInitialMessages = async () => {
        try {
            setFetching(true);

            const response = await fetch("/api/v1/messages", {
                cache: "no-store",
            });
            const data = await response.json();

            if (!response.ok || response.status !== 200) {
                return null;
            } else {
                return data.data;
            }
        } catch (error) {
            return null;
        } finally {
            setFetching(false);
        }
    };

    useEffect(() => {
        (async () => {
            const messages = await fetchInitialMessages();

            if (!messages) {
                toast({
                    title: "Error",
                    description: "Something went wrong while fetching messages",
                    variant: "destructive",
                });
            } else {
                setMessages(messages);
            }
        })();
    }, []);

    return (
        <>
            <section className="grow bg-sky-950/45 p-4">
                <div className="flex flex-col gap-2 w-full flex-nowrap">
                    {messages?.map((message) => (
                        <Message
                            message={message}
                            key={message._id}
                            className="chat-start bg-zinc-700"
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default MessagesArea;
