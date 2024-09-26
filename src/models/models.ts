import { model, Model, Schema } from "mongoose";
import { ITask } from "../resources/Task/types";
import { IUser } from "../resources/User/types";

const taskSchema = new Schema<ITask, Model<ITask>>({
    title: String,
    description: String,
    status: String,
    assignedTo: [String],
    createdAt: Date,
    finishedBy: String,
    tags: [String],
})

const userSchema = new Schema<IUser, Model<IUser>>({
    name: String,
    email: String,
    password: String,
    role: String,
})

const User = model<IUser>("User", userSchema)
const Task = model<ITask>("Task", taskSchema)

export { User, Task }