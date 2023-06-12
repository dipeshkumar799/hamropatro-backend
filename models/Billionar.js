import { Schema, model } from "mongoose";
const billionariesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  countryOfCitizenship: {
    type: String,
    required: true,
  },
});
const Billion = model("Billiondata", billionariesSchema);
export default Billion;
