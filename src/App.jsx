import { useState } from 'react'
import Register from './auth';
import './navbar.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home';
import Login from './login';
import AddTask from './AddTask';
import ProtectedRoute from './ProtectedRoutes';
import Oauth from './oauth';
import Info from './info';
import Hero from './Hero';
import Qr from './GenerateQR';
import ViewAttendence from './view-attendence';
import AttendencePercent from './AttendencePercent';
import UserPage from './user';
import Scan from './scan';
import About from './About';
import Myattendence from './my-attendence';
import UserDetails from './userDetails';
function App() {

  return (
    <>
    
     <BrowserRouter>
      <Routes>
        
        <Route path="/signup" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
        <Route path="/login" element={<Login/>} />
        <Route path='/addtask' element={<ProtectedRoute><AddTask/></ProtectedRoute>}/>
        <Route path='about' element={<About/>}/>
        <Route path='/my-attendence' element={<Myattendence/>}/>
        <Route path='/' element={
          <>
          <Info/>
         <Hero/>
          </> }/>

          <Route path='/QR' element={<Qr/>}/>
        

        <Route path='/oauth' element={<Oauth/>}/>

        <Route path='view-attendence/:sessionId' element={<ViewAttendence/>}/>       

        <Route path='/AP' element={<AttendencePercent/>}/> 

        <Route path='/userDetails' element={<UserDetails/>}/>

        <Route path='/Users' element={<UserPage/>}/>

        <Route path='/scan' element={<Scan/>}/>

      </Routes>
    </BrowserRouter>

    

      
    </>
  )
}

export default App
