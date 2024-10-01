import { Schema, Model, model } from "mongoose"
import { IUser } from "./types.ts"

const userSchema = new Schema<IUser, Model<IUser>>({
    name: { type: String },
    email: {
        type: String, required: [true, "Email is required"],
        trim: true,
        unique: true,
        match: [/(.+)@(.+){2,}\.(.+){2,}/, "{VALUE} is not a valid email."]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        unique: true,
        trim: true,
    },
    role: { type: String, default: "user" },
    resetToken: { type: String, default: "" },
})


export const User = model<IUser>("User", userSchema)