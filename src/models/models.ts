import { model, Model, Schema } from "mongoose";
import { ITask } from "../resources/Task/types.ts";
import { IUser } from "../resources/User/types.ts";

const taskSchema = new Schema<ITask, Model<ITask>>({
    title: { type: String, required: [true, "Title is required"] },
    description: { type: String, required: [true, "Description is required"] },
    status: {
        type: String,
        default: "to-do",
        enum: {
            values: ["to-do", "in-progress", "blocked", "done"],
            message: "{VALUE} is not supported for status"
        },
    },
    assignedTo: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    finishedBy: { type: String },
    tags: { type: [String] },
})

const userSchema = new Schema<IUser, Model<IUser>>({
    name: { type: String },
    email: {
        type: String, required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: /(.+)@(.+){2,}\.(.+){2,}/
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 6,
        maxlength: 20,
        unique: true,
        trim: true,
    },
    role: { type: String, default: "user" },
})

const User = model<IUser>("User", userSchema)
const Task = model<ITask>("Task", taskSchema)

export { User, Task }