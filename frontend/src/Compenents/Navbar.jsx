import React, { useEffect ,useContext} from 'react'
import { assets } from "../assets/assets"
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from "react";
import { AppContext } from '../context/AppContext';


function Navbar() {
  const navigate = useNavigate()
  const {token, setToken } = useContext(AppContext); 

const logOut = ()=>{
  setToken('')
  localStorage.removeItem('token')
}

  return (
    <div className=' flex  justify-between items-center py-4 mb-5 border-b border-b-gray-400 '>
      <img className="w-44 cursor-pointer" src={assets.logo} alt="" />

      <ul className='hidden sm:flex items-center gap-5 font-medium '>
        <NavLink to='/'>
          <li className='py-1'>Home</li>
          <hr className='border-none h-0.5 outline-none bg-primary w-3/5 m-auto hidden' />
        </NavLink>
        <NavLink to="/doctor">
          <li className='py-1'>All Doctors</li>
          <hr className='border-none h-0.5 outline-none bg-primary w-3/5 m-auto  hidden' />
        </NavLink>
        <NavLink to="/about">
          <li className='py-1'>About</li>
          <hr className='border-none h-0.5 outline-none bg-primary w-3/5 m-auto  hidden' />
        </NavLink>
        <NavLink to="/contact">
          <li className='py-1'>Contact</li>
          <hr className='border-none h-0.5 outline-none bg-primary w-3/5 m-auto  hidden ' />
        </NavLink>
      </ul>
      {
        token ? (
          <div className="flex gap-2 items-center cursor-pointer group relative">
            {/* Profile Picture */}
            <img className="w-8 rounded-full" src={assets.profile_pic} alt="Profile" />

            {/* Dropdown Icon */}
            <img className="w-3.5 h-2" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown Menu */}
            <div className="absolute top-full pt-6 right-0 z-20 text-gray-600 text-base font-normal hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 flex flex-col gap-2 py-3  rounded">
                <p onClick={() => navigate("/profile")} className="hover:text-black px-4   cursor-pointer">My Profile</p>
                <p onClick={() => navigate("/myAppointment")} className="hover:text-black px-4  cursor-pointer">My Appointment</p>
                <p onClick={logOut} className="hover:text-black px-4  cursor-pointer">Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <button onClick={() => navigate("/login")} className="text-white bg-primary rounded-full font-normal py-3 px-8" >
              Create Account
            </button>
          </div>
        )
      }


    </div>
  )
}

export default Navbar
