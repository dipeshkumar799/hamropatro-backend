import { Schema, model } from "mongoose";
const noteSchema = new Schema({
  title: String,
  content: String,
  attachements: [String],
  timestamp: Number,
  status: {
    enum: ["pending", "completed"],
    type: String,
  },
  colorPallets: {
    enum: ["red", "green", "blue"],
    type: String,
  },
});

const Note = model("Note", noteSchema);
export default Note;
