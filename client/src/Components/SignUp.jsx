import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import "../../src/index.css"


const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [cin, setCin] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(0);
  const [dateOfLicense, setDateOfLicense] = useState(0);
  const [role, setRole] = useState('user');

  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        userName,
        password,
        email,
        cin,
        dateOfBirth,
        dateOfLicense,
        role
        });
      alert(response.data.message);
      console.log(response.data);
      navigate("/login")
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className='signup-body'>
    <form className="signup-form" onSubmit={handleSignup}>
      
        <label className='signup-label'>Username:</label>
        <input className="signup-input" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      
       
        <label  className='signup-label'>Password:</label>
        <input className="signup-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      
      
        <label className='signup-label'>Email:</label>
        <input className="signup-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label className='signup-label'>CIN:</label>
        <input className="signup-input" type='number' value={cin} onChange={(e) => setCin(e.target.value)} required />

        <label className='signup-label'>What year were you born in :</label>
        <input className="signup-input" type='number' value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />

        <label className='signup-label'>What year did you obtain your Driver's license :</label>
        <input className="signup-input" type='number' value={dateOfLicense} onChange={(e) => setDateOfLicense(e.target.value)} required />
      
      <div className='signup-select-div'>
        <label className='signup-label'>Role:</label>
        <select className="signup-select-input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="company">Company</option>
        </select>
      </div>
      <div className="signup-submit-div">
      <button  type="submit"className='signup-submit-button'>Sign Up</button>
      <p className='signup-altlink'>
        Already have an account? <Link to="/login">Login</Link>
      </p>
      </div>
    </form>
    </div>
  );
};

export default SignUp;