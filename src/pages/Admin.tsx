import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Panel Administrateur</h1>
          <button 
            onClick={handleLogout} 
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors"
          >
            Déconnexion
          </button>
        </div>
        <p className="text-gray-700">
          Bienvenue dans votre panel d'administration. D'ici, vous pourrez bientôt gérer les stylistes, les actualités et d'autres contenus du site.
        </p>
      </div>
    </div>
  );
};

export default Admin;
