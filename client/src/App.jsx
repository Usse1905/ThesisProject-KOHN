import React,{useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
//import "./App.css";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import SignupCompany from "./Components/SignupCompany";
import MainPage from "./Components/User/MainPage";
import OneCar from "./Components/User/OneCar";
import AddCar from "./Components/Company/AddCar";
import ProfilePage from "./Components/Company/ProfilePage";
import AdminDashboard from "./Components/AdminDashborard";
import ProtectedAdminRoute from "./Components/ProtectAdmineRoute";
import AdminLogin from "./Components/AdminLogin";

const App = () => {
  const token = localStorage.getItem('token');
  const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).role === 'admin' : false;  
  return (
    <BrowserRouter>

  <div >
  <Routes>
    <Route path="/SignupCompany" element={<SignupCompany/>}/>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/allcars" element={<MainPage/>}/>
    <Route path="/one" element={<OneCar/>}/>
    <Route path="/Company/AddCar" element={<AddCar/>}/>
    <Route path="/Company/Profile" element={<ProfilePage/>}/>
    <Route path="/admin" element={<ProtectedAdminRoute element={<AdminDashboard />} isAdmin={isAdmin} />} />
    <Route path="/adminlogin" element={<AdminLogin/>}/>
  </Routes>
  </div>
  </BrowserRouter>
  )
}

export default App;
