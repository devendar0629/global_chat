"use client";

import { TMessage } from "@/models/message.model";
import Message from "../Message";
import { Loader2Icon } from "lucide-react";
import { useCurrentUser } from "@/custom-hooks/useCurrentUser";
import { useToast } from "@/hooks/use-toast";

interface CreatedBy {
    createdBy: {
        username: string;
        _id: string;
    };
}

interface MessagesAreaProps {
    messages: (TMessage & CreatedBy)[];
}

const MessagesArea: React.FC<MessagesAreaProps> = function ({ messages }) {
    const { currentUser, error, fetching } = useCurrentUser();
    const { toast } = useToast();
    if (error) {
        toast({
            title: "error",
            variant: "destructive",
        });
    }

    return (
        <>
            <section className="grow h-[768px] overflow-auto bg-sky-950/45 p-6 relative">
                {fetching ? (
                    <p className="font-medium absolute text-xl translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
                        <Loader2Icon className="animate-spin mr-1.5 mb-0.5 inline-block" />{" "}
                        Loading messages
                    </p>
                ) : (
                    <div className="flex flex-col gap-2 w-full flex-nowrap">
                        {messages?.map((message) => {
                            return (
                                <Message
                                    message={message}
                                    key={message._id}
                                    isSentByCurrentUser={
                                        currentUser?._id ===
                                        message.createdBy._id
                                    }
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
