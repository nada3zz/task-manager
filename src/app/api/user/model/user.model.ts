import mongoose, { Schema} from "mongoose";
import { IUser } from "../interface/user.interface";

const UserSchema: Schema = new Schema(
    {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: false },

    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);

