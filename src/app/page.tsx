import SendMessage from "@/components/custom/SendMessage";

export default function Home() {
    return (
        <>
            <main className="flex flex-col flex-nowrap min-h-screen rounded-md">
                <section className="grow bg-pink-600"></section>
                <SendMessage />
            </main>
        </>
    );
}
