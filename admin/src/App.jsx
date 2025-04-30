import React, { useContext, useState } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import { DoctorContext } from './context/DoctorContext';
import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import { Route, Routes } from 'react-router-dom';
import AdminDashboard from './pages/adminPage/AdminDashboard';
import AddDoctor from './pages/adminPage/AddDoctor';
import AllAppointment from './pages/adminPage/AllAppointment';
import DoctorList from './pages/adminPage/DoctorList';
import DoctorDashboard from './pages/doctorPage/DoctorDashboard';
import DoctorAppointments from './pages/doctorPage/DoctorAppointments';
import Profile from './pages/doctorPage/Profile';


function App() {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <SideBar />
        {/* Admin Rountes */}
        <Routes>
          <Route path='/' element={<></>}></Route>
          <Route path='admin-Dashboard' element={<AdminDashboard />}></Route>
          <Route path='add-doctor' element={<AddDoctor />}></Route>
          <Route path='all-Appointment' element={<AllAppointment />}></Route>
          <Route path='doctor-list' element={<DoctorList />}></Route>
        </Routes>
        {/* Doctor Routes */}
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          <Route path="/profile" element={<Profile />} />
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
