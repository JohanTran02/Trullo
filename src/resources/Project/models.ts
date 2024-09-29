import { Schema, model } from "mongoose";
import { IProject } from "./types.ts";

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

export const Project = model<IProject>('Project', projectSchema);