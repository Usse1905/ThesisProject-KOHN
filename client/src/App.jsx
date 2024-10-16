import React,{useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./App.css";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import MainPageC from "./Components/Company/MainPageC";
import MainPageUser from "./Components/User/MainPageUser";
import CarDetails from "./Components/User/CarDetails";
import AddCar from "./Components/Company/AddCar";
import ProfilePage from "./Components/Company/ProfilePage";
import AdminDashboard from "./Components/AdminDashborard";

const App = () => {
  return (
    <BrowserRouter>
  <Navbar/>
  <div >
  <Routes>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/User/Mainpage" element={<MainPageUser/>}/>
    <Route path="/User/CarDetails" element={<CarDetails/>}/>
    <Route path="/Company/AddCar" element={<AddCar/>}/>
    <Route path="/Company/Mainpage" element={<MainPageC/>}/>
    <Route path="/Company/Profile" element={<ProfilePage/>}/>
    <ProtectedAdminRoute path="/admin" component={AdminDashboard} />
  </Routes>
  </div>
  </BrowserRouter>
  )
}

export default App;
