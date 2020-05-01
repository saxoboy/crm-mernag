import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

let Schema = mongoose.Schema;

let clientSchema = new Schema({
  name: {
    type: String,
    required: [true, "The name is necessary"],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, "The lastname is necessary"],
    trim: true,
  },
  empresa: {
    type: String,
    required: [true, "The empresa is necessary"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "The email is necessary"],
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
  },
  status: {
    type: Boolean,
    default: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

clientSchema.plugin(uniqueValidator, { message: "{PATH} it must be unique" });
export default mongoose.model("Client", clientSchema);
