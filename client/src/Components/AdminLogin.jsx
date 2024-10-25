import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AdminLogin.css"; 

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleLogin = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('/Admin/signin', { email, password });
        localStorage.setItem('token', response.data.token);
        navigate('/admin'); 
      } catch (error) {
        console.error('Login failed', error);
      }
    };
  
    return (
      <div className="admin-login-container">
        <form onSubmit={handleLogin} className="admin-login-form">
          <h2 className="admin-login-title">Admin Sign In</h2>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Admin Email" 
            required 
            className="admin-input-field"
          />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
            className="admin-input-field"
          />
          <button type="submit" className="admin-login-button">Login</button>
        </form>
      </div>
    );
  };
  
  export default AdminLogin;