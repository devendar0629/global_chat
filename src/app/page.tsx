import SendMessage from "@/components/custom/SendMessage";
import MessagesArea from "@/components/custom/client/MessagesArea";

export default function Home() {
    return (
        <>
            <main className="flex flex-col flex-nowrap min-h-screen rounded-md">
                <MessagesArea />

                <SendMessage />
            </main>
        </>
    );
}
