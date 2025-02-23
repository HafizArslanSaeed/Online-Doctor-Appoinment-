import 'dotenv/config'; // Load .env first
import express from "express";
import cors from "cors";
import connectDb from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from './routes/adminRoute.js';

// App config
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to database
connectDb();
connectCloudinary();
//api Endpoints
app.use('/api/admin',adminRouter)

// Test endpoint
app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
