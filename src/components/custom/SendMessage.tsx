import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import SendMessageForm from "./client/SendMessageForm";

interface SendMessageProps {}

const SendMessage: React.FC<SendMessageProps> = async function () {
    const currentUser = await getServerSession(authOptions);

    return (
        <>
            <div className={`h-[5.75rem] w-full bg-sky-950/85 grid`}>
                <SendMessageForm />
            </div>
        </>
    );
};

export default SendMessage;
