import { Schema, model } from 'mongoose';
import { UserInterface, UserTypes } from './models-types';

const userSchema = new Schema<UserInterface>({
  type: { type: String, default: UserTypes.User },
  email: { type: String, trim: true, required: true },
  password: { type: String, required: true },
});

export default model<UserInterface>('user', userSchema);
