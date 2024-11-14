import React,{useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./App.css";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import SignupCompany from "./Components/SignupCompany";
import MainPage from "./Components/User/MainPage";
import AddUserRequest from "./Components/User/AddUserRequest";
import OneCar from "./Components/User/OneCar";
import Companies from "./Components/Company/Companies";
import OneCompany from "./Components/Company/OneCompany";
import AddCar from "./Components/Company/AddCar";
import ProfilePage from "./Components/Company/ProfilePage";
import AdminDashboard from "./Components/Admin/AdminDashborard";
import ProtectedAdminRoute from "./Components/Admin/ProtectAdmineRoute";
import AdminLogin from "./Components/Admin/AdminLogin";
import { UserProvider } from "./UserProvider";
import { CompanyProvider } from "./CompanyProvider";
import NavBar from "./OtherComponents/NavBar";
import NotificationPopup from "./Components/User/User Profile/NotificationPopUp";
import RequestSubmitted from "./Components/User/RequestSubmitted";
import UserProfile from "./Components/User/User Profile/UserProfile";
import LandingPage from "./Components/LandingPage";
import 'leaflet/dist/leaflet.css';
import AboutUs from  "../src/OtherComponents/ABoutUs"
import Footer from "./OtherComponents/Footer"



const App = () => {
  const token = localStorage.getItem('token');
  const isAdmin = token ? JSON.parse(atob(token.split('.')[1])).role === 'admin' : false;  
  return (
    <div className="app-container">
    <UserProvider>
      <CompanyProvider>
        <BrowserRouter>
        <NavBar/>
        <NotificationPopup/>
        <div>
          <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/SignupCompany" element={<SignupCompany/>}/>
            <Route path="/login" element={<LogIn/>}/>
            <Route path="/signup" element={<SignUp/>}/>
            <Route path="/allcars" element={<MainPage/>}/>
            <Route path="/one" element={<OneCar/>}/>
            <Route path="/allcompanies" element={<Companies/>}/>
            <Route path="/onecompany" element={<OneCompany/>}/>
            <Route path="/addrequest" element={<AddUserRequest/>}/>
            <Route path="/requestsubmitted" element={<RequestSubmitted/>}/>
            <Route path="/userprofile" element={<UserProfile/>}/>
            <Route path="/Company/AddCar" element={<AddCar/>}/>
            <Route path="/Company/Profile" element={<ProfilePage/>}/>
            <Route path="/admin" element={<ProtectedAdminRoute element={<AdminDashboard />} isAdmin={isAdmin} />} />
            <Route path="/adminlogin" element={<AdminLogin/>}/>
            <Route path="/AboutUs" element={<AboutUs/>}isAdmin={isAdmin} />
          </Routes>
       </div>
       <Footer /> {Footer}
      </BrowserRouter>
    </CompanyProvider>
  </UserProvider>
  </div>
  )
}

export default App;
