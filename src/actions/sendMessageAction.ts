"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import Message from "@/models/message.model";
import { getServerSession } from "next-auth";

export const sendMessage = async (formData: FormData) => {
    const message = formData.get("message");
    const session = await getServerSession(authOptions);

    if (!session) throw new Error("Unauthenticated request");
    if (!message) throw new Error("Message cannot be empty.");

    try {
        const result = await Message.create({
            content: message,
            createdBy: session.user._id,
        });

        const resultResponse = result.toJSON();

        return JSON.stringify({
            data: resultResponse,
            message: "Message created successfully",
        });
    } catch (error: any) {
        return JSON.stringify({
            error: error.message,
        });
    }
};
