import { Schema, model } from "mongoose";
import dayjs from "dayjs";
const noteSchema = new Schema({
  title: String,
  content: String,
  // attachements: [String],
  timestamp: {
    type: Number,
    default: dayjs().valueOf(),
  },
  status: {
    enum: ["pending", "completed"],
    type: String,
  },
  colorPalatte: {
    enum: ["red", "green", "blue"],
    type: String,
  },
});

const Note = model("Note", noteSchema);
export default Note;
