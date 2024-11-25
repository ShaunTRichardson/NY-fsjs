   import mongoose from "mongoose";
   
   export interface IUser extends mongoose.Document{
    username: string;
    password: string;
    introduction: string
   }

   const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: String,
    introductio: String
   });

   export const UserModel = mongoose.model<IUser>("User", userSchema)
   