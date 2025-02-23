import React, { createContext } from 'react';

// Create a context
export const DoctorContext = createContext(); // Named export

// Create a provider component
export const DoctorContextProvider = (props) => {
  // Context value
  const value = {
   
  };

  return <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>;
};

export default DoctorContextProvider; // Default export (optional)