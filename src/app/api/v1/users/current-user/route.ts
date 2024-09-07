import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { ApiResponse } from "@/app/types";
import { connectDB } from "@/lib/db/db";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    await connectDB();
    try {
        const response = await getToken({
            req: request,
        });

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
                    _id: response._id,
                    username: response.username,
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
