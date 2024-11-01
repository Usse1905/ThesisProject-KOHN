import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../src/index.css"


const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const[phoneNumber,setPhoneNumber]=useState('')

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        userName,
        password,
        email,
        phoneNumber,
        });
        setPassword("");
        setUserName("");
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='signup-body'>
    <form className="signup-form" onSubmit={handleSignup}>
      <div className='signup-user-div'>
        <label className='signup-label'>Username:</label>
        <input className="signup-input" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      </div>
      <div className='signup-psw-div'> 
        <label  className='signup-label'>Password:</label>
        <input className="signup-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label className='signup-label'>Email:</label>
        <input className="signup-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

      </div>
      <div className='signup-select-div'>
        <label className='signup-label'>Role:</label>
        <select className="signup-select-input" value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="company">Company</option>
        </select>

      </div>
      <button className="signup-submit" type="submit">Sign Up</button>
      <p className='signup-altlink'>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
    </div>
  );
};

export default SignUp;