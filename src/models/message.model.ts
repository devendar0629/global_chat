import mongoose, { InferSchemaType } from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, "Message is required"],
            validate: (value: string) => value.trim().length > 0,
        },
    },
    {
        timestamps: true,
    }
);

export type TMessage = InferSchemaType<typeof messageSchema>;

const Message =
    (mongoose.models.Message as mongoose.Model<TMessage>) ||
    mongoose.model<TMessage>("Message", messageSchema);

export default Message;
