import React from 'react';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';

const About: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden about-section section-gabonese">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gabonese-font animate-golden-shimmer">
              À Propos de CLOFAS 241
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto modern-font">
              <strong>Découvrez notre mission et notre vision</strong> pour transformer la mode gabonaise 
              et promouvoir l'excellence créative de notre pays sur la scène internationale.
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="card-gabonese p-8 mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
              <span className="text-gabon-green">Notre Mission</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6 modern-font">
              <strong>CLOFAS 241 (Consommation Locale Fashion Show 241)</strong> est un événement majeur dédié à la promotion 
              de la consommation locale dans le secteur de la mode au Gabon. Notre mission est de mettre en 
              lumière les talents exceptionnels de la mode gabonaise et de promouvoir l'authenticité culturelle 
              à travers des créations contemporaines qui honorent notre héritage.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed modern-font">
              <strong>Nous croyons en la force de la mode locale</strong> pour stimuler l'économie gabonaise, 
              préserver l'héritage culturel et créer des opportunités d'emploi tout en s'adaptant aux tendances 
              modernes de la mode internationale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="card-gabonese p-8">
              <div className="w-12 h-12 bg-gabon-gradient rounded-full flex items-center justify-center mb-6 animate-african-pulse">
                <span className="text-white text-xl font-bold">O</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 gabonese-font">
                <span className="text-gabon-green">Nos Objectifs</span>
              </h3>
              <ul className="text-gray-600 space-y-3 modern-font">
                <li className="flex items-center gap-2">
                  <span className="text-gabon-green">•</span>
                  <span>Promouvoir la mode gabonaise authentique</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gabon-yellow">•</span>
                  <span>Soutenir les créateurs locaux</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gabon-blue">•</span>
                  <span>Stimuler la consommation locale</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gabon-green">•</span>
                  <span>Préserver l'héritage culturel</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gabon-yellow">•</span>
                  <span>Créer des opportunités d'affaires</span>
                </li>
              </ul>
            </div>

            <div className="card-gabonese p-8">
              <div className="w-12 h-12 bg-gradient-to-r from-gabon-yellow to-gabon-blue rounded-full flex items-center justify-center mb-6 animate-gentle-sway">
                <span className="text-white text-xl font-bold">V</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 gabonese-font">
                <span className="text-gabon-yellow">Nos Valeurs</span>
              </h3>
              <ul className="text-gray-600 space-y-3 modern-font">
                <li className="flex items-center gap-2">
                  <span className="text-gabon-green">•</span>
                  <span>Authenticité et originalité</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gabon-yellow">•</span>
                  <span>Excellence et qualité</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gabon-blue">•</span>
                  <span>Innovation et créativité</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gabon-green">•</span>
                  <span>Respect de l'environnement</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gabon-yellow">•</span>
                  <span>Inclusion et diversité</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Portrait de Beitch Faro */}
          <div className="card-gabonese p-8 mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
                  <span className="text-gabon-green">Beitch Faro</span>
                </h2>
                <h3 className="text-2xl text-gabon-yellow font-semibold mb-4 modern-font">
                  Fondatrice & Promotrice de CLOFAS 241
                </h3>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 modern-font">
                  <strong>Visionnaire passionnée</strong> par la mode gabonaise et l'innovation créative, 
                  Beitch Faro est la force motrice derrière CLOFAS 241. Son engagement inébranlable 
                  pour promouvoir la mode locale gabonaise a transformé l'industrie de la mode au Gabon.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed mb-6 modern-font">
                  <strong>Son parcours exceptionnel</strong> dans le domaine de la mode et son dévouement 
                  à l'authenticité culturelle font d'elle une figure emblématique de l'entrepreneuriat 
                  féminin au Gabon et un modèle d'inspiration pour les jeunes créateurs.
                </p>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <div className="bg-gabon-green text-white px-4 py-2 rounded-lg font-semibold">
                    Entrepreneure
                  </div>
                  <div className="bg-gabon-yellow text-gray-800 px-4 py-2 rounded-lg font-semibold">
                    Visionnaire
                  </div>
                  <div className="bg-gabon-blue text-white px-4 py-2 rounded-lg font-semibold">
                    Innovatrice
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-80 h-80 bg-gradient-to-br from-gabon-green to-gabon-blue rounded-full flex items-center justify-center shadow-2xl">
                    <div className="w-72 h-72 bg-white rounded-full flex items-center justify-center">
                      <div className="w-64 h-64 bg-gradient-to-br from-gabon-yellow to-gabon-green rounded-full flex items-center justify-center">
                        <span className="text-white text-6xl font-bold gabonese-font">BF</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-gabon-yellow text-gray-800 px-4 py-2 rounded-lg font-bold text-sm">
                    Fondatrice
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-gabonese p-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center gabonese-font">
              <span className="text-gabon-green">L'Équipe</span> 
              <span className="text-gabon-yellow mx-3">•</span>
              <span className="text-gabon-blue">CLOFAS 241</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center card-gabonese p-6">
                <div className="w-20 h-20 bg-gabon-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-african-pulse">
                  <span className="text-white text-2xl font-bold">B</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 gabonese-font">Beitch Faro</h3>
                <p className="text-gabon-green font-semibold modern-font">Fondatrice & Promotrice</p>
                <p className="text-gray-600 text-sm mt-2 modern-font">
                  Visionnaire passionnée par la mode gabonaise
                </p>
              </div>

              <div className="text-center card-gabonese p-6">
                <div className="w-20 h-20 bg-gradient-to-r from-gabon-yellow to-gabon-blue rounded-full flex items-center justify-center mx-auto mb-4 animate-gentle-sway">
                  <span className="text-white text-2xl font-bold">C</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 gabonese-font">Équipe Créative</h3>
                <p className="text-gabon-yellow font-semibold modern-font">Designers & Stylistes</p>
                <p className="text-gray-600 text-sm mt-2 modern-font">
                  Talents créatifs exceptionnels du Gabon
                </p>
              </div>

              <div className="text-center card-gabonese p-6">
                <div className="w-20 h-20 bg-gradient-to-r from-gabon-blue to-gabon-green rounded-full flex items-center justify-center mx-auto mb-4 animate-african-pulse">
                  <span className="text-white text-2xl font-bold">P</span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 gabonese-font">Partenaires</h3>
                <p className="text-gabon-blue font-semibold modern-font">Support & Collaboration</p>
                <p className="text-gray-600 text-sm mt-2 modern-font">
                  Organisations soutenant la mode locale gabonaise
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
