import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ApiResponse } from "@/app/types";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    await connectDB();
    try {
        const response = await getServerSession(authOptions);

        if (!response) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: "Unauthenticated request",
                    },
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                data: {
                    _id: response.user._id,
                    username: response.user.username,
                    message: "Current user fetched successfully",
                },
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: {
                    message:
                        "Something went wrong while fetching the current user",
                },
            },
            { status: 500 }
        );
    }
}
