import User from "../model/user.js";
import { hashedpassword, checkPassword } from "../utils/password.js";
import createtoken from "../utils/token.js";
export const register = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User already exist" });
    }
    const hashpassword = await hashedpassword(password);
    const user = await User.create({
      username,
      email,
      password: hashpassword,
      isAdmin,
    });
    if (user) {
      return res.status(201).json({ message: "Registration successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Incorrect email" });
    }
    const status = await checkPassword(password, user.password);
    if (!status) {
      return res.json({ message: "Incorrect password" });
    } else {
      const token = createtoken(user._id);

      return res
        .status(200)
        .json({ message: "Lonin successful", token: token });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
