import { Schema, model } from "mongoose";
const chatSchema = new Schema({
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
  conversation: {
    type: Schema.Types.ObjectId,
    ref: "Conversation",
  },
});
const Chat = model("chatData", chatSchema);
export default Chat;
