import express from "express";
import upload from "../middlewares/multer.js"; 
import { addDoctor, adminLogin, allDoctor } from "../controllers/adminController.js"; 
import { changeAvailability } from "../controllers/doctorController.js";



const adminRouter = express.Router();

adminRouter.post("/add-doctor", upload.single("image"), addDoctor);
adminRouter.get("/all-doctor",  allDoctor);
adminRouter.post("/change-availability" , changeAvailability)
adminRouter.post("/login", adminLogin);

export default adminRouter;
