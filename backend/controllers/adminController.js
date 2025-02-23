import doctorModel from "../models/doctorModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";




const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        // const imageFile = req.file; 

        // if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address ) {
        //     return res.status(400).json({ success: false, message: "All fields, including image, are required" });
        // }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid Email" });
        }

        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
        }
        // if (!imageFile) {
        //     return res.status(400).json({ success: false, message: "Image file is required" });
        //   }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Upload image to Cloudinary
        // const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        // const imageUrl = imageUpload.secure_url;

        const newDoctor = new doctorModel({
            name,
            email,
            password: hashedPassword,
            // image: imageUrl,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        });

        await newDoctor.save();
        res.status(201).json({ success: true, message: "Doctor added successfully" });

    } catch (error) {
        console.error("Error creating doctor:", error);
        res.status(500).json({ success: false, message: error.message });
    }

};
// Admin Login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign( {email}, process.env.JWT_SECRET);
            res.json({ success: true, token: token });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.error("Error logging in admin:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { addDoctor, adminLogin };
