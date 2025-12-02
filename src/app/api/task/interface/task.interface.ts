import mongoose from "mongoose";
import { IUser } from "../../user/interface/user.interface";

export interface ITask {
  _id: string | mongoose.Types.ObjectId;
  title: string;
  description?: string;
  completed: boolean;
  user: string | mongoose.Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}