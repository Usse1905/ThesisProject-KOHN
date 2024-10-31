// src/components/LogoutAdmin.js
import React from 'react';
import { useHistory } from 'react-router-dom'; // Ensure you have react-router-dom installed

const LogoutAdmin = () => {
  const history = useHistory();

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');

    // Redirect to the AdminLogin page
    history.push('/adminlogin'); // Change this to your AdminLogin path
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutAdmin;
