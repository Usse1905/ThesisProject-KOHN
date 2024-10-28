import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('user');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signup', {
        userName,
        password,
        email,
        role
        });
        setPassword("");
        setUserName("");
      alert(response.data.message);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <div>
        <label>Username:</label>
        <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div>
        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
          <option value="company">Company</option>
        </select>
      </div>
      <button type="submit">Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default SignUp;