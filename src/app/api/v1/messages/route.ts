import { connectDB } from "@/lib/db/db";
import Message from "@/models/message.model";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
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
                                username: 1,
                            },
                        },
                    ],
                },
            },
            {
                $unwind: {
                    path: "$createdBy",
                    preserveNullAndEmptyArrays: true,
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

        return NextResponse.json(messages, { status: 200 });
    } catch (error) {
        return NextResponse.json({}, { status: 500 });
    }
}
