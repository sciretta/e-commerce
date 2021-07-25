import { Schema, model } from 'mongoose';
import { UserInterface, UserRole } from './models-types';

const userSchema = new Schema<UserInterface>({
  role: { type: String, default: UserRole.User },
  email: { type: String, trim: true, required: true },
  firstName: {
    type: String,
    trim: true,
    required: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: true,
  },
  direction: {
    type: String,
  },
  password: { type: String, required: true },
});

export default model<UserInterface>('user', userSchema);
