import React, { createContext, useEffect ,useState } from 'react';
import axios from 'axios'

// Create a context
export const AppContext = createContext(); 


// Create a provider component
export const AppContextProvider = (props) => {
  const [doctors, setDoctors] = useState([]); 
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');


  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const getAllDoctor = async () => {
    try {
      const {data} = await axios.get(`${backendUrl}/api/doctor/list`);
      console.log(data.message)
      setDoctors(data.message)
    } catch (error) {
      console.log("Error fetching doctors:", error);
    }
  };
useEffect(()=>{
getAllDoctor()
},[backendUrl])

  // Context value
  const value = {
    doctors,
    backendUrl,
    token,setToken
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider; // Default export (optional)