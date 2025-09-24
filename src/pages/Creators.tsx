import React from 'react';

const Creators: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'linear-gradient(135deg, rgba(147, 51, 234, 0.8), rgba(236, 72, 153, 0.8)), url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        />
        
        <div className="relative z-10 container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              Nos Créateurs
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Découvrez les talents exceptionnels de la mode gabonaise lors de l'édition 2024 du CLOFAS 241
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span>👥</span>
                <span>8 créateurs</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span>📸</span>
                <span>200+ photos</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <span>📅</span>
                <span>Édition 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Créateurs CLOFAS 241
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos créateurs talentueux qui participent à l'édition 2024 du CLOFAS 241
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Angèle Epouta */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-6xl">👑</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Angèle Epouta</h3>
              <p className="text-purple-600 font-medium mb-3">Maître Créatrice</p>
              <p className="text-gray-600 text-sm mb-4">
                Figure emblématique de la mode gabonaise, reconnue pour son excellence artistique et son savoir-faire artisanal exceptionnel.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📸 8 photos</span>
                <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                  Voir la galerie
                </button>
              </div>
            </div>
          </div>

          {/* Beitch Faro */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-pink-400 to-red-400 flex items-center justify-center">
              <span className="text-6xl">🌟</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Beitch Faro</h3>
              <p className="text-pink-600 font-medium mb-3">Promotrice de l'événement</p>
              <p className="text-gray-600 text-sm mb-4">
                Visionnaire et fondatrice du CLOFAS 241, dédiée à la promotion de la mode locale gabonaise.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📸 24 photos</span>
                <button className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors">
                  Voir la galerie
                </button>
              </div>
            </div>
          </div>

          {/* Angelina Creations */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center">
              <span className="text-6xl">💎</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Angelina Creations</h3>
              <p className="text-indigo-600 font-medium mb-3">Maison de couture</p>
              <p className="text-gray-600 text-sm mb-4">
                Atelier réputé pour ses pièces uniques mêlant tradition et modernité avec raffinement.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📸 8 photos</span>
                <button className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors">
                  Voir la galerie
                </button>
              </div>
            </div>
          </div>

          {/* L'atelier Issé By Lita */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-green-400 to-blue-400 flex items-center justify-center">
              <span className="text-6xl">🎨</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">L'atelier Issé By Lita</h3>
              <p className="text-green-600 font-medium mb-3">Créatrice</p>
              <p className="text-gray-600 text-sm mb-4">
                Espace créatif dédié à la haute couture gabonaise avec une touche d'originalité distincte.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📸 8 photos</span>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                  Voir la galerie
                </button>
              </div>
            </div>
          </div>

          {/* Lady Riaba */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center">
              <span className="text-6xl">✨</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Lady Riaba</h3>
              <p className="text-yellow-600 font-medium mb-3">Créatrice Émergente</p>
              <p className="text-gray-600 text-sm mb-4">
                Incarne la nouvelle génération de créateurs gabonais avec une approche révolutionnaire.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📸 Aucune photo</span>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed" disabled>
                  Bientôt disponible
                </button>
              </div>
            </div>
          </div>

          {/* Madame Luc-Abiale */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div className="h-64 bg-gradient-to-br from-teal-400 to-cyan-400 flex items-center justify-center">
              <span className="text-6xl">🎭</span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Madame Luc-Abiale</h3>
              <p className="text-teal-600 font-medium mb-3">Designer Innovante</p>
              <p className="text-gray-600 text-sm mb-4">
                Se distingue par son approche visionnaire de la mode gabonaise, où chaque création raconte une histoire.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">📸 Aucune photo</span>
                <button className="bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed" disabled>
                  Bientôt disponible
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creators;