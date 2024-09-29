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
        minlength: [6, "Password must be atleast 6 characters long"],
        maxlength: 20,
        unique: true,
        trim: true,
    },
    role: { type: String, default: "user" },
})


export const User = model<IUser>("User", userSchema)