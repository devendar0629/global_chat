import { ApiResponse } from "@/app/types";
import { connectDB } from "@/lib/db/db";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    await connectDB();

    try {
        const messages = await Message.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "createdBy",
                    foreignField: "_id",
                    as: "createdBy",
                    pipeline: [
                        {
                            $project: {
                                _id: 0,
                                username: 1,
                            },
                        },
                    ],
                },
            },
            {
                $sort: {
                    createdAt: -1,
                },
            },
            {
                $limit: 100,
            },
        ]);

        if (!messages) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message:
                            "Something went wrong while fetching the messages",
                    },
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: messages,
                message: "Messages fetched successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    message: "Something went wrong while fetching the messages",
                },
            },
            { status: 500 }
        );
    }
}
