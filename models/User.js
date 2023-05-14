import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  isLoggedIn: {
    type: Boolean,
    required: true,
  },
  otp: {
    type: Number,
  },
  senderId: {
    type: Number,
    required: true,
  },
  recipientId: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const User = model("User", UserSchema);

export default User;
