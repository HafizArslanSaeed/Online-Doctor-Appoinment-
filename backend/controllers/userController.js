import userModel from "../models/userModel.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import { v2 as cloudinary } from "cloudinary";
import appointmentModel from "../models/appointmentModel.js";
import doctorModel from "../models/doctorModel.js";


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
    res.json({ success: false, message:error.message });
  }
};

// Api for getProfile Data 
 const getProfile = async (req, res) => {
  try {
    const {userId} = req.body;
    const userData =await userModel.findById(userId).select("-password");
    res.json({success:true, userData});
  } catch (error) {
    console.log(error);
    res.json({ success: false, message:error.message });
  }
 }
 const updateProfile = async (req, res) => {
  try {
    const { userId, name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Please fill all the fields" });
    }

    let updateData = { name, phone, dob, gender };

    if (address) {
      try {
        updateData.address = JSON.parse(address);
      } catch (err) {
        return res.json({ success: false, message: "Invalid address format" });
      }
    }

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
      updateData.image = imageUpload.secure_url;
    }

    await userModel.findByIdAndUpdate(userId, updateData);
    res.json({ success: true, message: "Profile updated successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const bookAppointment = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body); // 🔍 Debug line

    const { docId, slotDate, slotTime, userData, docData, amount, date } = req.body;
    const userId = req.body.userId;

    // Check if docData or available is missing
    if (!docData || docData.available === undefined) {
      return res.status(400).json({ success: false, message: "Doctor availability data is missing." });
    }

    if (!docData.available) {
      return res.status(400).json({ success: false, message: "Doctor is not available for booking." });
    }

    const existingAppointment = await appointmentModel.findOne({
      docId,
      slotDate,
      slotTime,
      cancelled: false,
    });

    if (existingAppointment) {
      return res.status(400).json({ success: false, message: "This slot is already booked. Please choose another slot." });
    }

    const newAppointment = await appointmentModel.create({
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount,
      date,
    });

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully!",
      appointment: newAppointment,
    });

  } catch (error) {
    console.error("❌ Error in booking appointment:", error); // ✅ log the error
    return res.status(500).json({ success: false, message: "Failed to book appointment" });
  }
};



export { loginUser, registerUser  , getProfile ,updateProfile , bookAppointment};
