// src/models/user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, index: 1 })
  name: string;

  @Prop({ required: true, unique: true }) // Ensure email is unique
  email: string;

  @Prop({ required: true })
  password: string;
}
// Create the schema using the factory method
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1, name: 1 });
console.log(UserSchema.indexes());
// Create an index on the email field
