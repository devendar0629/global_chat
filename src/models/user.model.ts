import mongoose, { InferSchemaType } from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            min: [2, "Username should be atleast 2 characters"],
            required: [true, "Username is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            min: [6, "Password cannot be smaller than 6 characters"],
        },
    },
    {
        timestamps: true,
    }
);

export type TUser = InferSchemaType<typeof userSchema>;

const User =
    (mongoose.models.User as mongoose.Model<TUser>) ||
    mongoose.model<TUser>("User", userSchema);

export default User;
