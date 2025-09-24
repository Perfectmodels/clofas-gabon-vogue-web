import React from 'react';
import { Link } from 'react-router-dom';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section - Pleine hauteur */}
      <section className="relative min-h-screen flex items-center justify-center hero-section section-gabonese">
        <div className="background-overlay"></div>
        
        <div className="background-content text-center text-white z-10 px-4">
          <div className="max-w-5xl mx-auto">
            {/* Logo principal avec style gabonais */}
            <div className="mb-8">
              <div className="w-32 h-32 bg-gabon-gradient rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-gabon-yellow shadow-2xl animate-african-pulse">
                <div className="text-6xl font-bold text-white gabonese-font">CLOFAS</div>
              </div>
            </div>

            {/* Titre principal avec style africain */}
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-tight gabonese-font">
              <span className="block animate-golden-shimmer">
                CLOFAS 241
              </span>
            </h1>

            {/* Sous-titre avec couleurs gabonaises */}
            <p className="text-2xl md:text-3xl mb-8 opacity-90 font-light modern-font">
              <span className="text-gabon-green font-semibold">Mode Gabonaise</span> 
              <span className="text-gabon-yellow mx-2">•</span>
              <span className="text-gabon-yellow font-semibold">Authentique</span>
              <span className="text-gabon-yellow mx-2">•</span>
              <span className="text-gabon-blue font-semibold">Responsable</span>
            </p>

            {/* Description enrichie */}
            <p className="text-lg md:text-xl mb-12 opacity-90 max-w-4xl mx-auto leading-relaxed modern-font">
              <strong>Célébrez l'excellence de la mode gabonaise</strong> à travers nos créateurs d'exception. 
              Un événement unique qui met en lumière l'authenticité culturelle, l'innovation contemporaine 
              et le savoir-faire artisanal du Gabon sur la scène internationale.
            </p>

            {/* Boutons CTA avec style gabonais */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                to="/creators"
                className="btn-african px-10 py-4 rounded-full font-bold text-xl modern-font"
              >
                <span className="flex items-center gap-3">
                  <span>Découvrir les Créateurs</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </Link>
              
              <Link
                to="/about"
                className="group bg-transparent border-2 border-gabon-yellow text-gabon-yellow px-10 py-4 rounded-full font-bold text-xl hover:bg-gabon-yellow hover:text-white transition-all duration-300 transform hover:scale-105 backdrop-blur-sm modern-font"
              >
                <span className="flex items-center gap-3">
                  <span>Notre Histoire</span>
                </span>
              </Link>
            </div>

            {/* Statistiques avec style gabonais */}
            <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center card-gabonese p-6">
                <div className="text-4xl font-bold mb-2 text-gabon-green">8+</div>
                <div className="text-lg text-gabon-yellow font-semibold">Créateurs</div>
                <div className="text-sm text-gray-600">Talents d'exception</div>
              </div>
              <div className="text-center card-gabonese p-6">
                <div className="text-4xl font-bold mb-2 text-gabon-yellow">200+</div>
                <div className="text-lg text-gabon-yellow font-semibold">Créations</div>
                <div className="text-sm text-gray-600">Pièces uniques</div>
              </div>
              <div className="text-center card-gabonese p-6">
                <div className="text-4xl font-bold mb-2 text-gabon-blue">2024</div>
                <div className="text-lg text-gabon-yellow font-semibold">Édition</div>
                <div className="text-sm text-gray-600">Année exceptionnelle</div>
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
              Créateurs en <span className="bg-gradient-to-r from-gabon-green to-gabon-blue bg-clip-text text-transparent">Vedette</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rencontrez les talents exceptionnels qui façonnent l'avenir de la mode gabonaise
            </p>
          </div>

          {/* Grille des créateurs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* Angèle Epouta */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-gabon-green to-gabon-blue relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-80 font-bold text-white">A</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-gabon-green">
                  Maître
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Angèle Epouta</h3>
                <p className="text-gabon-green font-medium mb-3">Maître Créatrice</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Figure emblématique de la mode gabonaise, reconnue pour son excellence artistique et son savoir-faire artisanal exceptionnel.
                </p>
                <Link
                  to="/creators"
                  className="inline-flex items-center gap-2 text-gabon-green font-medium hover:text-gabon-blue transition-colors"
                >
                  Voir les créations
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Beitch Faro */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-gabon-yellow to-gabon-green relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-80 font-bold text-white">B</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-gabon-yellow">
                  Fondatrice
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Beitch Faro</h3>
                <p className="text-gabon-yellow font-medium mb-3">Promotrice de l'événement</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Visionnaire et fondatrice du CLOFAS 241, dédiée à la promotion de la mode locale gabonaise.
                </p>
                <Link
                  to="/creators"
                  className="inline-flex items-center gap-2 text-gabon-yellow font-medium hover:text-gabon-green transition-colors"
                >
                  Voir les créations
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Angelina Creations */}
            <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-64 bg-gradient-to-br from-gabon-blue to-gabon-green relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-80 font-bold text-white">A</div>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-bold text-gabon-blue">
                  Maison
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Angelina Creations</h3>
                <p className="text-gabon-blue font-medium mb-3">Maison de couture</p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Atelier réputé pour ses pièces uniques mêlant tradition et modernité avec raffinement.
                </p>
                <Link
                  to="/creators"
                  className="inline-flex items-center gap-2 text-gabon-blue font-medium hover:text-gabon-green transition-colors"
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
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gabon-green to-gabon-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:from-gabon-blue hover:to-gabon-yellow transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span>Découvrir tous les créateurs</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Section Mission */}
      <section className="py-20 bg-gradient-to-r from-gabon-green to-gabon-blue">
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
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gabon-blue">
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
                className="bg-white text-gabon-green px-8 py-4 rounded-full font-bold text-lg hover:bg-gabon-yellow hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Explorer les Créations
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gabon-blue transition-all duration-300 transform hover:scale-105"
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