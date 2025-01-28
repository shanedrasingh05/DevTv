import httpStatus from "http-status";
import bcrypt, { hash } from "bcrypt";
import { User } from "../models/user.model.js";
import crypto from "crypto";

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Please Provide" });
  }

  try {
    const user = await User.findOne({ username });
    console.log(user);
    if (!user) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "User Not Found" });
    }

      let isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (isPasswordCorrect) {
      
      let token = crypto.randomBytes(20).toString("hex");

      user.token = token;
      await user.save();
      return res.status(httpStatus.OK).json({ token: token });
    }
    else{
      return res.status(httpStatus.UNAUTHORIZED).json({message: "Invalid Username or Password"})
    }



  } catch (e) {
    return res.status(500).json({ message: `Something went wrong ${e}` });
  }
};

const register = async (req, res) => {
  console.log("Register");
  const { name, username, password } = req.body;
  console.log(name);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(httpStatus.FOUND)
        .json({ message: "User allready exists" }); 
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword : " + hashedPassword);

    const newUser = new User({
      name: name,
      username: username,
      password: hashedPassword,
    });

    await newUser.save();

    res
      .status(httpStatus.CREATED)
      .json({ message: "User has been ragistered!" });
  } catch (e) {
    res.json({ message: `Something went wrong ${e} ` });
  }
};

export { login, register };
