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
      const response = await axios.post('http://localhost:8080/api/signupcompany', formData);
      alert('Signup successful');
      localStorage.setItem('token', response.data.token);
    } catch (error) {
  
      alert('Error during signup');
    }
  };

  return (
    <div className='signupcompany-body'>
    <form className="signupcompany-form" onSubmit={handleSubmit}>
      <input className="signupcompany-input" type="text" name="name" placeholder="Company Name" onChange={handleChange} required />
      <input className="signupcompany-input" type="text" name="address" placeholder="Address" onChange={handleChange} />
      <input className="signupcompany-input" type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} required />
      <input className="signupcompany-input" type="text" name="website" placeholder="Website" onChange={handleChange} required />
      <input className="signupcompany-input" type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input className="signupcompany-input" type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input className="signupcompany-input" type="text" name="licensesinceWhen" placeholder="License Since When" onChange={handleChange} required />
      <input className="signupcompany-input" type="text" name="lei" placeholder="LEI" onChange={handleChange} required />
      <button className="signupcompany-submit" type="submit">Sign Up Company</button>
      <p className='signupcompany-altlinks'>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </form>
    </div>
  );
};

export default SignupCompany;