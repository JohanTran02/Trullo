import { model, Model, Schema } from "mongoose";
import { ITask } from "../resources/Task/types";
import { IUser } from "../resources/User/types";

const taskSchema = new Schema<ITask, Model<ITask>>({
    title: { type: String },
    description: { type: String },
    status: { type: String },
    assignedTo: { type: [String] },
    createdAt: { type: Date },
    finishedBy: { type: String },
    tags: { type: [String] },
})

const userSchema = new Schema<IUser, Model<IUser>>({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
})

const User = model<IUser>("User", userSchema)
const Task = model<ITask>("Task", taskSchema)

export { User, Task }