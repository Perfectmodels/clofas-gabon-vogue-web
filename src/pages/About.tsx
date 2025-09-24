import React from 'react';
import '@/styles/backgrounds.css';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden about-section">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent">
              À Propos de CLOFAS 241
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
              Découvrez notre mission et notre vision pour la mode gabonaise
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Notre Mission</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              CLOFAS 241 (Consommation Locale Fashion Show 241) est un événement majeur dédié à la promotion 
              de la consommation locale dans le secteur de la mode au Gabon. Notre mission est de mettre en 
              lumière les talents exceptionnels de la mode gabonaise et de promouvoir l'authenticité culturelle 
              à travers des créations contemporaines.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nous croyons en la force de la mode locale pour stimuler l'économie gabonaise et préserver 
              l'héritage culturel tout en s'adaptant aux tendances modernes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-xl">🎯</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nos Objectifs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Promouvoir la mode gabonaise authentique</li>
                <li>• Soutenir les créateurs locaux</li>
                <li>• Stimuler la consommation locale</li>
                <li>• Préserver l'héritage culturel</li>
                <li>• Créer des opportunités d'affaires</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mb-6">
                <span className="text-white text-xl">🌟</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Nos Valeurs</h3>
              <ul className="text-gray-600 space-y-2">
                <li>• Authenticité et originalité</li>
                <li>• Excellence et qualité</li>
                <li>• Innovation et créativité</li>
                <li>• Respect de l'environnement</li>
                <li>• Inclusion et diversité</li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">L'Équipe CLOFAS 241</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">B</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Beitch Faro</h3>
                <p className="text-purple-600 font-medium">Fondatrice & Promotrice</p>
                <p className="text-gray-600 text-sm mt-2">
                  Visionnaire passionnée par la mode gabonaise
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">C</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Équipe Créative</h3>
                <p className="text-blue-600 font-medium">Designers & Stylistes</p>
                <p className="text-gray-600 text-sm mt-2">
                  Talents créatifs du Gabon
                </p>
              </div>

              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl font-bold">P</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800">Partenaires</h3>
                <p className="text-green-600 font-medium">Support & Collaboration</p>
                <p className="text-gray-600 text-sm mt-2">
                  Organisations soutenant la mode locale
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
