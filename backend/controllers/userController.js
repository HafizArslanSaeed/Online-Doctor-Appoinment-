import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// create JWT Token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email " });
    }

    // Compare password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    // Create token and send response
    if(match){
      const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Login failed" });
  }
};

// register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Checking if the user already exists
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate password length (minimum 8 characters)
    if (password.length < 8) {
        return res.json({ success: false, message: "Password must be at least 8 characters long" });
      }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // Create token and send response
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Registration failed" });
  }
};

// Api for getUser Data 


export { loginUser, registerUser };
