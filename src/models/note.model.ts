// src/models/user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Note extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true, unique: true })
  message: string;

  @Prop({ ref: 'User' })
  owner: mongoose.Schema.Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(Note);
