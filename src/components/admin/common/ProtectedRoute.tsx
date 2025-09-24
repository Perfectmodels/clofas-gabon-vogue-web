import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isLoggedIn } from '../../../services/authService'; // Correction de l'import

const ProtectedRoute: React.FC = () => {
  return isLoggedIn() ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
