import { Schema, Model, model } from "mongoose"
import { ITask } from "./types.ts"

const taskSchema = new Schema<ITask, Model<ITask>>({
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    status: {
        type: String,
        default: "to-do",
        enum: {
            values: ["to-do", "in-progress", "blocked", "done"],
            message: "{VALUE} is not a valid status."
        },
    },
    assignedTo: [{ type: Schema.Types.ObjectId, ref: "User", default: ["Not assigned"] }],
    createdAt: { type: Date, default: Date.now },
    finishedBy: { type: String, default: "Not finished" },
    tags: {
        type: [String], default: [] as string[]
    },
})

export const Task = model<ITask>("Task", taskSchema)