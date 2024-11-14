import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import { useCompany } from '../CompanyProvider';
import { useSocket } from '../SocketProvider';  
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../src/index.css";

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const { setUser } = useUser();
  const {setCompany } = useCompany()
  const { updateToken } = useSocket(); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/login', {
        userName,
        password,
        role,
      },{
        timeout:5000,
      });
      if(role === "User"){
      console.log('Login response:', response)
      const token = response.data.token;
      localStorage.setItem('token', token);
      updateToken(token);  
      console.log(response.data);
      alert(response.data.message);
      setUser(response.data.user);
      navigate("/allcars");
    } if (role === "Company"){
      console.log('Login response:', response)
      const token = response.data.token;
      localStorage.setItem('token', token);
      updateToken(token);  
      console.log(response.data);
      alert(response.data.message);
      setCompany(response.data.company);
      navigate("/allcars");
    }
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response);
        alert(`Error: ${error.response.data.message || 'Unknown error occurred'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('No response received from the server.');
      } else {
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div className='login-body'>
      <form className="login-form" onSubmit={handleLogin}>
        <label className='login-label'>Username:</label>
        <input
          className="login-input"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />

        <label className='login-label'>Password:</label>
        <input
          className="login-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label className='login-label'>Role:</label>
        <select
          className="login-input"
          value={role}   
          onChange={(e) => setRole(e.target.value)} 
          required
        >
          <option value="">Select a role</option>  {/* Optional default option */}
          <option value="User">User</option>
          <option value="Company">Company</option>
        </select>

        <div className='login-submit-div'>
          <button type="submit" className='login-submit-button'>Login</button>

          <p className='login-altlink'>
            Don't have an account? <Link to="/signup" style={{ color: "white" }}>Sign Up as a User</Link> or
            <Link to="/signupCompany" style={{ color: "white" }}> Sign Up as a Company</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
