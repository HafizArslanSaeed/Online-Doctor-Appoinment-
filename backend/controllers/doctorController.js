
import doctorModel from "../models/doctorModel.js";



const changeAvailability = async (req , res)=>{
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available : !docData.available})
        res.json({success:true ,message:'Availibity Changed'})


    } catch (error) {
        console.log(error)
        res.json({success:false ,message: error.message })
    }
}
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({});
        if (doctors.length > 0) {
            res.json({ success: true, message: doctors });
        } else {
            res.json({ success: false, message: "No doctors found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {changeAvailability , doctorList}