import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

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
      select: true,
    },
    location: {
      type: String,
      default: "Philippines",
    },
  },
  { timestamps: true }
);

//** middlewares Password hashing */
userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//** JWT TOKEN */
userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("users", userSchema);
