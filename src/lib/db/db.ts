import mongoose, { Mongoose } from "mongoose";

if (!process.env.DATABASE_URI) {
    throw new Error("Please define the DATABASE_URI environment variable");
}

declare global {
    var __connection: {
        connection: null | Mongoose;
    };
}

let cachedConnection = global.__connection;

if (!cachedConnection) {
    cachedConnection = global.__connection = {
        connection: null,
    };
}

export const connectDB = async () => {
    if (cachedConnection.connection) {
        return;
    }

    try {
        const uri = process.env.DATABASE_URI;

        await mongoose
            .connect(uri!, {
                dbName: process.env.DATABASE_NAME,
            })
            .then((connection) => {
                cachedConnection.connection = connection;
                console.log("✅ Database connection succeeded.");
            })
            .catch((err) => {
                cachedConnection.connection = null;
                console.error("❌ Error connecting to DB.", err);

                process.exit(1);
            });
    } catch (error) {
        console.error("❌ Error connecting to DB.", error);

        process.exit(1);
    }
};
