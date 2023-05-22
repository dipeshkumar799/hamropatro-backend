import { Schema, model } from "mongoose";
const chatSchema = new Schema({
  senderId: {
    type: String,
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
  createdAt: {
    type: String,
    required: true,
  },
});
const Chat = model("chatData", chatSchema);
export default Chat;
