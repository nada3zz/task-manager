import mongoose, { Schema } from "mongoose";
import { ITask } from "../interface/task.interface";

const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    completed: { type: Boolean, default: false },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITask>("Task", TaskSchema);
