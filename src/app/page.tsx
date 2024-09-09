"use client";

import ChatPage from "@/components/custom/client/ChatPage";

export default function Home() {
    return (
        <>
            <main className="flex flex-col flex-nowrap min-h-screen rounded-md">
                <ChatPage />
            </main>
        </>
    );
}
