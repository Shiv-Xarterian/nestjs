import mongoose, { Schema } from 'mongoose';

export const NoteSchema = new Schema({
  title: String,
  message: String,
  owner: mongoose.Schema.Types.ObjectId,
});
