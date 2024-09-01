import { connectDB } from "@/lib/db/db";
import User from "@/models/user.model";
import { NextAuthOptions } from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { signinSchema } from "@/lib/validation_schemas/signin";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialProvider({
            name: "credentials-provider",
            type: "credentials",
            credentials: {
                email: {
                    type: "text",
                },
                username: {
                    type: "text",
                },
                password: {
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                const validatedCredentials =
                    signinSchema.safeParse(credentials);

                if (!validatedCredentials.success) {
                    throw new Error("Invalid request payload");
                }

                await connectDB();

                const dbUser = await User.findOne({
                    username: validatedCredentials.data.username,
                });

                if (!dbUser) throw new Error("Incorrect credentials");

                const passwordMatch = await compare(
                    validatedCredentials.data.password,
                    dbUser.password
                );

                if (!passwordMatch) {
                    throw new Error("Incorrect credentials");
                }

                return {
                    _id: dbUser._id,
                    username: dbUser.username,
                };
            },
        }),
    ],
    callbacks: {
        signIn: ({ user }) => {
            return true;
        },
        jwt: async ({ token, user }) => {
            if (user) {
                // happens on authorization succeeds
                token._id = user._id;
                token.username = user.username;
            }

            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                // happens every time a session is checked
                session.user._id = token._id;
                session.user.username = token.username;
            }

            return session;
        },
    },
    session: {
        maxAge: 86400, // 1 day
        strategy: "jwt",
    },
    jwt: {
        maxAge: 2592000, // 30 days,
    },
    pages: {
        signIn: "/signin",
    },
};
