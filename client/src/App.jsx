import React,{useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./App.css";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";
import MainPage from "./Components/User/MainPage";
import CarDetails from "./Components/User/CarDetails";
import AddCar from "./Components/Company/AddCar";
import ProfilePage from "./Components/Company/ProfilePage";

const App = () => {
  return (
    <BrowserRouter>
  <div >
  <Routes>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/allcars" element={<MainPage/>}/>
    <Route path="/one/:id" element={<CarDetails/>}/>
    <Route path="/Company/AddCar" element={<AddCar/>}/>
    <Route path="/Company/Profile" element={<ProfilePage/>}/>
  </Routes>
  </div>
  </BrowserRouter>
  )
}

export default App;
