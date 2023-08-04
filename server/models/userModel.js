import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    lastname: {
      type: String,
      //   required: [true, "Lastname is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
      minlength: [6, "Password lenght should be greater than 6 character"],
    },
    location: {
      type: String,
      default: "Philippines",
    },
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
