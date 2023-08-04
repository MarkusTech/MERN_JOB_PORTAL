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

  // if not existed, USER SAVE!
  const user = await userModel.create({ name, email, password });
  //   token
  const token = user.createJWT();
  res.status(201).send({
    success: true,
    message: "User Registered Successfully",
    user: {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  //   validation
  if (!email || !password) {
    next("Please provide all fields");
  }
  // find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Username or Password");
  }
  //compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    next("Invalid Username or Password");
  }
  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successfully",
    user,
    token,
  });
};

export { register, login };
