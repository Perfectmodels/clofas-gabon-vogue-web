import React, { useState } from 'react';
import BackgroundManager from '@/components/admin/BackgroundManager';

const Admin: React.FC = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe simple pour la démo
    if (password === 'clofas2024') {
      setIsAuthenticated(true);
    } else {
      alert('Mot de passe incorrect');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">👑</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Panel Admin CLOFAS</h1>
            <p className="text-gray-600 mt-2">Accès administrateur</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Entrez le mot de passe"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-medium"
            >
              Se connecter
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Mot de passe de démo : <code className="bg-gray-100 px-2 py-1 rounded">clofas2024</code></p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white text-sm font-bold">👑</span>
              </div>
              <h1 className="text-xl font-bold text-gray-800">Panel Admin CLOFAS 241</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                Déconnexion
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                currentView === 'dashboard'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Tableau de bord
            </button>
            <button
              onClick={() => setCurrentView('backgrounds')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                currentView === 'backgrounds'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🖼️ Gestion des arrière-plans
            </button>
          </nav>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto">
        {currentView === 'dashboard' && (
          <div className="p-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Tableau de bord</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-6 text-white">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">👥</span>
                    <div>
                      <p className="text-purple-100">Créateurs</p>
                      <p className="text-2xl font-bold">8</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg p-6 text-white">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">📸</span>
                    <div>
                      <p className="text-blue-100">Images</p>
                      <p className="text-2xl font-bold">48</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg p-6 text-white">
                  <div className="flex items-center">
                    <span className="text-3xl mr-3">🎨</span>
                    <div>
                      <p className="text-green-100">Arrière-plans</p>
                      <p className="text-2xl font-bold">4</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions rapides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setCurrentView('backgrounds')}
                    className="p-4 bg-white border-2 border-purple-200 rounded-lg hover:border-purple-300 transition-colors text-left"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">🖼️</span>
                      <div>
                        <h4 className="font-medium text-gray-800">Gérer les arrière-plans</h4>
                        <p className="text-sm text-gray-600">Choisir des images pour les sections</p>
                      </div>
                    </div>
                  </button>
                  
                  <button className="p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-gray-300 transition-colors text-left">
                    <div className="flex items-center">
                      <span className="text-2xl mr-3">⚙️</span>
                      <div>
                        <h4 className="font-medium text-gray-800">Paramètres</h4>
                        <p className="text-sm text-gray-600">Configuration du site</p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {currentView === 'backgrounds' && <BackgroundManager />}
      </div>
    </div>
  );
};

export default Admin;
