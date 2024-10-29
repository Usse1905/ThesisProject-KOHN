import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../src/index.css"

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const {setUser} = useUser()

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login',{
        userName,
        password,
      } );
      console.log(response.data);
      alert(response.data.message);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user)
      navigate("/allcars")
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");

      
      } 
    }

  return (
    <div className='login-body'>
    <form className="login-form" onSubmit={handleLogin}>
      
        <label className='login-label'>Username:</label>
        <input className="login-input" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      
      
        <label className='login-label'>Password:</label>
        <input className="login-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      
      <div className='login-submit-div'>
        <button type="submit" className='login-submit-button'>Login</button>
      <p className='login-altlink'>
        Don't have an account? <Link to="/signup" style={{color:"white"}}>Sign Up as a User</Link> or
           <Link to="/signupCompany" style={{color:"white"}}> Sign Up as a Company</Link>
      </p>
      </div>
    </form>
    </div>
  );
};

export default Login;