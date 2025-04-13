import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';




// Create a context
export const AdminContext = createContext(); 

export const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') || '');
  const [doctorData, setDoctorData] = useState([]); 
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const getAllDoctor = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/admin/all-doctor`);
      setDoctorData(response.data.message); // Update state
      console.log("Fetched Doctors:", response.data.message);
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };
  const changeAvailability = async (docId) => {
    try {
      const {data}= await axios.post(`${backendUrl}/api/admin/change-availability`, {docId})
      console.log(data);
     if(data.success){
      toast.success(data.message)
      getAllDoctor()
    }
    else{
      toast.error(data.message)
    }
     
    } catch (error) {
      toast.error(error.message)
      console.log(error);

    }
  };


 

  // Context value
  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctorData, 
    getAllDoctor, 
    changeAvailability,
  };

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export default AdminContextProvider;
