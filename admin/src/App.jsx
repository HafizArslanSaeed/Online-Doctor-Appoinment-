import React, { useContext, useState } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/adminPage/AdminDashboard';
import AddDoctor from './pages/adminPage/AddDoctor';
import AllAppointment from './pages/adminPage/AllAppointment';
import DoctorList from './pages/adminPage/DoctorList';


function App() {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <SideBar />
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='admin-Dashboard' element={<AdminDashboard />}></Route>
          <Route path='add-doctor' element={<AddDoctor />}></Route>
          <Route path='all-Appointment' element={<AllAppointment />}></Route>
          <Route path='doctor-list' element={<DoctorList />}></Route>
        </Routes>
      </div>

    </div>
  ) : (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
}

export default App;
