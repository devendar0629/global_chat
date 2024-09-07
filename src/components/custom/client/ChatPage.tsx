"use client";

import SendMessage from "./SendMessage";
import MessagesArea from "./MessagesArea";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
    Dialog,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

interface ChatPageProps {}
interface HeaderProps {}

const Header: React.FC<HeaderProps> = function () {
    return (
        <>
            <nav className="w-full flex flex-row flex-nowrap justify-end px-4 h-16 bg-slate-700">
                <Dialog>
                    <DialogTrigger>
                        <div className="flex text-[0.95rem] font-medium bg-secondary pl-[1.15rem] pr-[1rem] py-2.5 rounded-md hover:bg-secondary/70 duration-100 flex-row gap-1.5 items-center flex-nowrap">
                            Logout <LogOutIcon className="h-[1rem] mb-px" />
                        </div>
                    </DialogTrigger>

                    <DialogContent className="max-w-[22rem] gap-7">
                        <DialogHeader>
                            <DialogTitle className="text-xl mt-0">
                                Are you absolutely sure ?
                            </DialogTitle>
                        </DialogHeader>

                        <DialogDescription className="flex flex-row flex-nowrap gap-24 px-1">
                            <DialogClose asChild>
                                <Button
                                    variant={"secondary"}
                                    className="h-fit text-[0.9rem] w-fit py-2 px-5"
                                >
                                    No
                                </Button>
                            </DialogClose>

                            <Button
                                onClick={() => signOut()}
                                variant={"secondary"}
                                className="h-fit text-[0.9rem] w-fit py-2 px-5"
                            >
                                Yes
                            </Button>
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </nav>
        </>
    );
};

const ChatPage: React.FC<ChatPageProps> = function () {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [initialMessages, setInitialMessages] = useState<any[]>([]);

    useEffect(() => {
        const s = io(process.env.NEXT_PUBLIC_SOCKET_SERVER_URL!, {
            withCredentials: true,
        });

        s.on("connect", () => {
            setSocket(s);

            s.once("initial-messages", (messages) => {
                setInitialMessages(messages);
            });

            s.on("server-message", (message) => {
                if (initialMessages.length >= 100) {
                    setInitialMessages((prev) => [
                        ...prev.slice(100 - prev.length, prev.length - 1),
                        message,
                    ]);
                } else setInitialMessages((prev) => [...prev, message]);
            });
        });

        return () => {
            s.disconnect();
        };
    }, []);

    return (
        <>
            <Header />
            <MessagesArea messages={initialMessages} />
            <SendMessage socket={socket} />
        </>
    );
};

export default ChatPage;

export const dynamic = "force-dynamic";
