import { Schema, model } from "mongoose";
import dayjs from "dayjs";
const GoldSilverSchema = new Schema({
  createdAt: {
    type: Number,
    default: dayjs().valueOf(),
    required: true,
  },
  goldHallmarkGram: {
    type: String,
    required: true,
  },
  goldTejabiGram: {
    type: String,
    required: true,
  },
  silverGram: {
    type: String,
    required: true,
  },
  goldHallmarkTola: {
    type: String,
    required: true,
  },
  goldTejabitola: {
    type: String,
    required: true,
  },
  silvertola: {
    type: String,
    required: true,
  },
});

const GoldSilver = model("GoldSilver", GoldSilverSchema);

export default GoldSilver;
