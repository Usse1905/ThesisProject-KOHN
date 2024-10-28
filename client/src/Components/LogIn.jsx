import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserProvider';
import axios from 'axios';

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
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;