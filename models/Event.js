import { Schema, model } from "mongoose";
const eventSchema = new Schema({
  title: String,
  description: String,
  date: String,
});

const Event = model("Event", eventSchema);
export default Event;
