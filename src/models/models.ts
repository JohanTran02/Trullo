import { model, Model, Schema } from "mongoose";
import { ITask } from "../resources/Task/types.ts";
import { IUser } from "../resources/User/types.ts";

const taskSchema = new Schema<ITask, Model<ITask>>({
    title: { type: String },
    description: { type: String },
    status: { type: String, default: "to-do" },
    assignedTo: { type: [String] },
    createdAt: { type: Date, default: Date.now },
    finishedBy: { type: String },
    tags: { type: [String] },
})

const userSchema = new Schema<IUser, Model<IUser>>({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String, default: "user" },
})

const User = model<IUser>("User", userSchema)
const Task = model<ITask>("Task", taskSchema)

export { User, Task }