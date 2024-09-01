"use client";

import { useToast } from "@/hooks/use-toast";
import { TMessage } from "@/models/message.model";
import { useEffect, useState } from "react";
import Message from "../Message";
import { Loader2Icon } from "lucide-react";

interface MessagesAreaProps {}

const MessagesArea: React.FC<MessagesAreaProps> = function () {
    const [messages, setMessages] = useState<
        (TMessage & {
            createdBy: {
                username: string;
            };
        })[]
    >([]);

    const [currentUser, setCurrentUser] = useState<{
        _id: string;
        username: string;
    } | null>();
    const modifiedMessages = messages.map((message) => {
        if (message.createdBy?._id.toString() === currentUser?._id) {
            const msg = message;
            msg.createdBy.username = "You";
            return msg;
        } else return message;
    });

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

    const fetchCurrentUser = async () => {
        try {
            setFetching(true);
            const response = await fetch("/api/v1/users/current-user");
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

            const user = await fetchCurrentUser();
            if (!user) {
                toast({
                    title: "Error",
                    description: "Something went wrong",
                    variant: "destructive",
                });
            } else {
                setCurrentUser(user);
            }
        })();
    }, []);

    return (
        <>
            <section className="grow bg-sky-950/45 p-6 relative">
                {fetching ? (
                    <p className="font-medium absolute text-xl translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
                        <Loader2Icon className="animate-spin mr-1.5 mb-0.5 inline-block" />{" "}
                        Loading messages
                    </p>
                ) : (
                    <div className="flex flex-col gap-2 w-full flex-nowrap">
                        {modifiedMessages?.map((message) => {
                            const isSentByCurrentUser =
                                currentUser?._id ===
                                message.createdBy?._id.toString();

                            if (isSentByCurrentUser) {
                                message.createdBy.username = "You";
                            }

                            return (
                                <Message
                                    message={message}
                                    key={message._id}
                                    containerClassName={`${
                                        isSentByCurrentUser
                                            ? "chat-end"
                                            : "chat-start"
                                    }`}
                                    contentClassName={`chat-bubble ${
                                        isSentByCurrentUser
                                            ? "chat-bubble-primary"
                                            : "chat-bubble-secondary"
                                    }`}
                                />
                            );
                        })}
                    </div>
                )}
            </section>
        </>
    );
};

export default MessagesArea;
