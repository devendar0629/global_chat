import type { Types } from "mongoose";
import type { User, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

interface AuthUser {
    _id: string | Types.ObjectId;
    username: string;
}

declare module "next-auth" {
    interface User extends AuthUser {
        id?: string;
    }

    interface Session {
        user: User;
    }
}

declare module "next-auth/jwt" {
    interface JWT extends User {}
}
