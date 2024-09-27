import * as mongoose from "mongoose";

export const ApkSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
    },
    apk: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    photo:[ {
        type: String,
        required: true,
    }],
    client: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
    developeur: {
        type: String,
        required: true,
    },
  
    });
    export interface IApk extends mongoose.Document {
        title: string;
        content: string;
    }
      
    