import * as mongoose from "mongoose";
export const UsersSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
       type: String,
       required: true,
    },
    fonction: {
      type: String,
      required: true,
   },
   password: {
    type: String,
    required: true,
 },
    });
    export interface IUsers extends mongoose.Document {
        name: string;
        email: string;
        fonction: string;
        password: string;
        }