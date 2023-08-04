import userModel from "../models/userModel.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validate
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "please provide name" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "please provide email" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ success: false, message: "please provide password" });
    }

    // validate if the user is existing
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email Already Registered Please login",
      });
    }

    // if not existed user save!
    const user = await userModel.create({ name, email, password });
    res
      .status(201)
      .send({ success: true, message: "User Registered Successfully", user });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: "Error in register Controller", success: false, error });
  }
};

const login = async (req, res) => {
  res.send("Login");
};

export { register, login };
