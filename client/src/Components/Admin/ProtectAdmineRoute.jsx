
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedAdminRoute = ({ element, isAdmin }) => {
  return isAdmin ? element : <Navigate to="/adminlogin" />;
};

export default ProtectedAdminRoute;
