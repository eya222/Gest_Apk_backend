import { Schema, Document } from 'mongoose';
import * as mongoose from "mongoose";
export interface Application extends Document {
  name: string;
  client: string;
  description: string;
  updates: Update[];
}

export interface Update extends Document {
  consultantTechnique?: string;
  consultantFonctionnel?: string;
  apk?: string;
  document?: string;
  demo?: string;
  photos?: string[];
  date: string;
}



export const UpdateSchema = new Schema({
  consultantTechnique: { type: String, required: true },
  consultantFonctionnel: { type: String, required: true },
  apk: { type: String, required: false },
  document: { type: String, required: false },
  demo: { type: String, required: false },
  photos: { type: [String], required: false }, 
  date: { type: Date, default: Date.now }
});

export const ApplicationSchema = new Schema<Application>({
  client: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  updates: { type: [UpdateSchema], default: [] }
});

export const ApplicationModel = mongoose.model<Application>('Application', ApplicationSchema);
