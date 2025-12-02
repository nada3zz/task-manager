import mongoose, { Document } from "mongoose";

export interface IUser extends Document{
  fullName: string;
  username: string;
  password: string;
}
