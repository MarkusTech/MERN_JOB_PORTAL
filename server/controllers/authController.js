import userModel from "../models/userModel.js";

const register = async (req, res, next) => {
  const { name, email, password } = req.body;
  // validate
  if (!name) {
    next("name is required");
  }
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required and greater than 6 character");
  }

  // validate if the user is existing
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    next("Email Already Exist Please Login");
  }

  // if not existed user save!
  const user = await userModel.create({ name, email, password });
  res
    .status(201)
    .send({ success: true, message: "User Registered Successfully", user });
};

const login = async (req, res) => {
  res.send("Login");
};

export { register, login };
