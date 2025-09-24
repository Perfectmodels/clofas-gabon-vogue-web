import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../services/authService';

const ProtectedRoute: React.FC = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
