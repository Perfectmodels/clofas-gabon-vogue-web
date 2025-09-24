import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/backgrounds.css';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - Pleine hauteur */}
      <section className="relative min-h-screen flex items-center justify-center hero-section">
        <div className="background-overlay"></div>
        
        <div className="background-content text-center text-white z-10 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Logo principal */}
            <div className="mb-8">
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/30">
                <div className="text-6xl font-bold text-white">C</div>
              </div>
            </div>

            {/* Titre principal */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight">
              <span className="block bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent">
                CLOFAS 241
              </span>
            </h1>

            {/* Sous-titre */}
            <p className="text-2xl md:text-3xl mb-8 opacity-90 font-light">
              Mode Gabonaise Authentique & Responsable
            </p>

            {/* Description */}
            <p className="text-lg md:text-xl mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed">
              Découvrez les créateurs les plus talentueux du Gabon dans un événement unique 
              qui célèbre l'authenticité culturelle et l'innovation contemporaine.
            </p>

            {/* Boutons CTA */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/creators"
                className="group bg-white text-purple-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-2xl"
              >
                <span className="flex items-center gap-3">
                  <span>Découvrir les Créateurs</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group bg-transparent border-2 border-white text-white px-10 py-4 rounded-full font-bold text-xl hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
              >
                <span className="flex items-center gap-3">
                  <span>Notre Histoire</span>
                </span>
              </Link>
            </div>

            {/* Statistiques */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">8+</div>
                <div className="text-lg opacity-80">Créateurs</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">200+</div>
                <div className="text-lg opacity-80">Créations</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">2024</div>
                <div className="text-lg opacity-80">Édition</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center">
            <span className="text-sm opacity-70 mb-2">Découvrir</span>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Section Créateurs en vedette */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Créateurs en <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Vedette</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rencontrez les talents exceptionnels qui façonnent l'avenir de la mode gabonaise
            </p>
          </div>

          {/* Grille des créateurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Angèle Epouta */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-80 font-bold text-white">A</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-purple-600">
                  Maître
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Angèle Epouta</h3>
                <p className="text-purple-600 font-medium mb-3">Maître Créatrice</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Figure emblématique de la mode gabonaise, reconnue pour son excellence artistique et son savoir-faire artisanal exceptionnel.
                </p>
                <Link
                  to="/creators"
                  className="inline-flex items-center gap-2 text-purple-600 font-medium hover:text-purple-700 transition-colors"
                >
                  Voir les créations
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Beitch Faro */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-pink-400 via-red-400 to-pink-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-80 font-bold text-white">B</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-pink-600">
                  Fondatrice
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Beitch Faro</h3>
                <p className="text-pink-600 font-medium mb-3">Promotrice de l'événement</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Visionnaire et fondatrice du CLOFAS 241, dédiée à la promotion de la mode locale gabonaise.
                </p>
                <Link
                  to="/creators"
                  className="inline-flex items-center gap-2 text-pink-600 font-medium hover:text-pink-700 transition-colors"
                >
                  Voir les créations
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Angelina Creations */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-indigo-400 via-purple-400 to-indigo-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-80 font-bold text-white">A</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-indigo-600">
                  Maison
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Angelina Creations</h3>
                <p className="text-indigo-600 font-medium mb-3">Maison de couture</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Atelier réputé pour ses pièces uniques mêlant tradition et modernité avec raffinement.
                </p>
                <Link
                  to="/creators"
                  className="inline-flex items-center gap-2 text-indigo-600 font-medium hover:text-indigo-700 transition-colors"
                >
                  Voir les créations
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Bouton Voir tous */}
          <div className="text-center">
            <Link
              to="/creators"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Découvrir tous les créateurs</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Notre Mission
            </h2>
            <p className="text-xl md:text-2xl leading-relaxed mb-12 opacity-90">
              Promouvoir la consommation locale dans le secteur de la mode au Gabon en mettant 
              en lumière les talents exceptionnels qui façonnent l'avenir de la mode gabonaise.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-white">P</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Promotion Locale</h3>
                <p className="opacity-80">Soutenir les créateurs gabonais</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-white">I</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p className="opacity-80">Allier tradition et modernité</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-2xl font-bold text-white">G</div>
                </div>
                <h3 className="text-xl font-bold mb-2">Impact Global</h3>
                <p className="opacity-80">Exporter la mode gabonaise</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA Final */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à découvrir la mode gabonaise ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Explorez les créations exceptionnelles de nos stylistes et découvrez 
              l'authenticité de la mode locale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/creators"
                className="bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-purple-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explorer les Créations
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                En Savoir Plus
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;