"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2Icon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface SendMessageProps {
    socket: Socket | null;
}

const SendMessage: React.FC<SendMessageProps> = function ({ socket }) {
    const messageRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const [isEmitting, setIsEmitting] = useState<boolean>(false);
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (socket) {
            setIsEmitting(true);
            socket.emit("client-message", messageRef.current?.value);
            setIsEmitting(false);
        } else {
            toast({
                title: "Error",
                description: "Chat server is not connected.",
                variant: "destructive",
            });
        }

        formRef.current?.reset();
    };

    return (
        <>
            <div className={`h-[5.75rem] w-full bg-sky-950/85 grid`}>
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-row my-auto flex-nowrap gap-4 items-center px-6"
                >
                    <Input
                        disabled={!socket || !socket.connected || isEmitting}
                        ref={messageRef}
                        placeholder="Type a message ..."
                        className="h-14 rounded-full pl-6 text-[1.025rem] pb-2.5 font-medium"
                        type="text"
                        name="message"
                        required
                    />

                    <Button
                        disabled={!socket || !socket.connected || isEmitting}
                        type="submit"
                        className="h-[3.4rem] w-fit font-semibold rounded-full px-6 text-[1.025rem] disabled:cursor-not-allowed disabled:pointer-events-auto"
                    >
                        {isEmitting ? (
                            <>
                                <Loader2Icon className="animate-spin h-5 mr-1.5 mb-0.5" />{" "}
                                Sending
                            </>
                        ) : (
                            <>
                                Send &nbsp;
                                <span className="font-bold mb-0.5">&rarr;</span>
                            </>
                        )}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default SendMessage;
