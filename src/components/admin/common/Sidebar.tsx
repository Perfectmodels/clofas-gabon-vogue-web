
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 font-bold text-xl border-b border-gray-700">
        CLOFAS Admin
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        <NavLink to="/admin/dashboard" className={({ isActive }) => 
          `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
        }>
          Tableau de bord
        </NavLink>
        <NavLink to="/admin/creators" className={({ isActive }) => 
          `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
        }>
          Créateurs
        </NavLink>
        <NavLink to="/admin/editions" className={({ isActive }) => 
          `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
        }>
          Éditions
        </NavLink>
        <NavLink to="/admin/appearance" className={({ isActive }) => 
          `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
        }>
          Apparence
        </NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => 
          `block px-4 py-2 rounded-md ${isActive ? 'bg-gray-700' : 'hover:bg-gray-700'}`
        }>
          Paramètres
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
