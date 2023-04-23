import { Schema, model } from "mongoose";
const GoldSilverSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
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
