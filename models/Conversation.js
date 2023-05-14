import { Schema, model } from "mongoose";
const conversationSchema = new Schema({
  participants: {
    type: [String],
  },
  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
  ],
});
const Conversation = model("conversation", conversationSchema);
export default Conversation;
