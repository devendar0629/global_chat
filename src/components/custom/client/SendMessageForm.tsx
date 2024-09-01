"use client";

import { sendMessage } from "@/actions/sendMessageAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { useFormStatus } from "react-dom";

interface SendMessageFormProps {}

const SendMessageFormButton = function () {
    const { pending } = useFormStatus();

    return (
        <>
            <Button
                type="submit"
                className="h-[3.4rem] w-fit font-semibold rounded-full px-6 text-[1.025rem]"
            >
                {pending ? (
                    <>
                        <Loader2Icon className="animate-spin h-[1.35rem] mr-2 mb-0.5" />{" "}
                        Sending
                    </>
                ) : (
                    <>
                        Send &nbsp;
                        <span className="font-bold mb-0.5">&rarr;</span>
                    </>
                )}
            </Button>
        </>
    );
};

const SendMessageForm: React.FC<SendMessageFormProps> = function () {
    return (
        <>
            <form
                action={(formData) => sendMessage(formData)}
                className="w-full flex flex-row my-auto flex-nowrap gap-4 items-center px-6"
            >
                <Input
                    placeholder="Type a message ..."
                    className="h-14 rounded-full pl-6 text-[1.025rem] pb-2.5 font-medium"
                    type="text"
                    name="message"
                    required
                />

                <SendMessageFormButton />
            </form>
        </>
    );
};

export default SendMessageForm;
