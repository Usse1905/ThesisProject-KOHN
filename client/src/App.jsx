import React,{useState} from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom";
import "./App.css";
import LogIn from "./Components/LogIn";
import SignUp from "./Components/SignUp";


const App = () => {
  return (
    <BrowserRouter>

  <div >
  
  <Routes>
    <Route path="/login" element={<LogIn/>}/>
    <Route path="/signup" element={<SignUp/>}/>
  
  </Routes>
  </div>
  </BrowserRouter>
  )
}

export default App;
