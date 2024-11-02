import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const SignupCompany = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    website: '',
    email: '',
    password: '',
    licensesinceWhen: '',
    lei: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/signupCompany', formData);
      alert('Signup successful');
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert('Error during signup');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1> Sign Up Company : </h1>
      <input type="text" name="name" placeholder="Company Name..." onChange={handleChange} required />
      <input type="text" name="address" placeholder="Address..." onChange={handleChange} />
      <input type="text" name="phoneNumber" placeholder="Phone Number..123" onChange={handleChange} required />
      <input type="text" name="website" placeholder="Website...www" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email..." onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password..." onChange={handleChange} required />
      <input type="text" name="licensesinceWhen" placeholder="License Since When..." onChange={handleChange} required />
      <input type="text" name="lei" placeholder="LEI..." onChange={handleChange} required />
      <button type="submit">Sign Up </button> 
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
  );
};

export default SignupCompany;