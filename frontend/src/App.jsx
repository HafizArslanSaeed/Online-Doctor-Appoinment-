import React from 'react'
import {  Route ,Routes} from 'react-router-dom';
import { Home, About, Contact, Login, Doctors, MyProfile, MyAppointment ,Appointment} from './Pages';
import Navbar from './Compenents/Navbar';
import Footer from './Compenents/Footer';


function App() {
  return (
     <div className='mx-8 '>
      <Navbar/>
      

      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="contact" element={<Contact/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/doctor" element={<Doctors/>}/>
        <Route path="/doctor/:speciality" element={<Doctors/>}/>
        <Route path="/profile" element={<MyProfile/>}/>
        <Route path='/myAppointment' element={<MyAppointment/>}></Route>
         <Route path="/appointment/:docId" element={<Appointment />} />
        
      </Routes>
      <Footer/>
      
     </div>
  )
}

export default App
