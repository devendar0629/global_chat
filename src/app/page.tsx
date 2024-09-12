import ChatPage from "@/components/custom/client/ChatPage";
import { cookies } from "next/headers";

export default async function Home() {
    const cookie = cookies();
    const _a_Ck =
        cookie.get(
            process.env.NEXT_PUBLIC__A_CK_NAME! || "next-auth.session-token"
        )?.value || "";

    return (
        <>
            <main className="flex flex-col flex-nowrap min-h-screen rounded-md">
                <ChatPage _a_Ck={_a_Ck} />
            </main>
        </>
    );
}
