import { signupSchema } from "@/lib/validation_schemas/signup";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";
import { ZodError } from "zod";
import { connectDB } from "@/lib/db/db";
import { ApiResponse } from "@/app/types";

export async function POST(
    request: NextRequest
): Promise<NextResponse<ApiResponse>> {
    await connectDB();
    try {
        const data = await request.json();
        const validatedData = signupSchema.parse(data);

        const userAlreadyExists = await User.findOne({
            username: validatedData.username,
        });

        if (userAlreadyExists) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: "Username already taken",
                    },
                },
                { status: 400 }
            );
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(validatedData.password, salt);

        const newUser = await User.create({
            username: validatedData.username,
            password: hashedPassword,
        });

        await newUser.save();

        const responseUser = newUser.toObject();

        delete (responseUser as any).password;

        return NextResponse.json(
            {
                success: true,
                message: "User signed up successfully",
                data: { user: responseUser },
            },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: {
                        message: "Incorrect request payload",
                    },
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: {
                    message: "Something went wrong",
                },
            },
            { status: 500 }
        );
    }
}
