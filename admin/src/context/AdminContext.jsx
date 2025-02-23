import  { createContext ,useState } from 'react';

// Create a context
export const AdminContext = createContext(); // Named export


// Create a provider component
export const AdminContextProvider = (props) => {
    const [aToken, setAToken] = useState('');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
  // Context value
  const value = {
   aToken,
   setAToken,
    backendUrl   
  };

  return <AdminContext.Provider value={value}>
          {props.children}
        </AdminContext.Provider>;
};

export default AdminContextProvider; // Default export (optional)