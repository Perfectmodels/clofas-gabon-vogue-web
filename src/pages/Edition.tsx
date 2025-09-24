import React from 'react';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';

const Edition: React.FC = () => {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden edition-section section-gabonese">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gabonese-font animate-golden-shimmer">
              🇬🇦 Édition 2025
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto modern-font">
              🌟 <strong>"Consommer local, porter notre identité"</strong> - 
              Une édition exceptionnelle qui célèbre l'excellence de la mode gabonaise
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gabon-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📅</span>
                <span className="font-semibold">16 Novembre 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-sunset-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📍</span>
                <span className="font-semibold">Casino Croisette, Libreville</span>
              </div>
              <div className="flex items-center gap-2 bg-earth-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>👑</span>
                <span className="font-semibold">Édition Exceptionnelle</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Thème de l'édition */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="card-gabonese p-8 mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font text-center">
              <span className="text-gabon-green">🎯 Thème 2025</span>
            </h2>
            <p className="text-xl text-gray-600 text-center mb-8 modern-font">
              <strong>"Consommer local, porter notre identité"</strong>
            </p>
            <p className="text-gray-600 text-lg leading-relaxed modern-font">
              🌍 Cette édition met l'accent sur l'importance de la consommation locale dans le secteur de la mode. 
              Nous célébrons les créateurs gabonais qui transforment notre héritage culturel en créations contemporaines 
              exceptionnelles, tout en sensibilisant le public à l'impact économique et culturel de nos choix vestimentaires.
            </p>
          </div>
        </div>
      </div>

      {/* Programme détaillé */}
      <div className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
              <span className="text-gabon-green">📅 Programme</span> 
              <span className="text-african-gold mx-3">•</span>
              <span className="text-sunset-orange">Détaillé</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg modern-font">
              🎭 <strong>Découvrez le déroulé complet de cette soirée exceptionnelle</strong> qui mettra en lumière 
              les talents de la mode gabonaise dans un cadre prestigieux.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {/* Timeline */}
              <div className="relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gabon-green"></div>
                
                {/* Étape 1 */}
                <div className="relative flex items-start mb-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-gabon-gradient rounded-full flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold">1</span>
                  </div>
                  <div className="ml-6 card-gabonese p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 gabonese-font">
                      <span className="text-gabon-green">🌟 Accueil & Tapis Rouge</span>
                    </h3>
                    <p className="text-gray-600 mb-2 modern-font">
                      <strong>18h00 - 19h00</strong>
                    </p>
                    <p className="text-gray-600 modern-font">
                      Arrivée des invités, photos sur le tapis rouge, cocktail de bienvenue avec 
                      spécialités gabonaises et musique traditionnelle.
                    </p>
                  </div>
                </div>

                {/* Étape 2 */}
                <div className="relative flex items-start mb-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-sunset-gradient rounded-full flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold">2</span>
                  </div>
                  <div className="ml-6 card-gabonese p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 gabonese-font">
                      <span className="text-sunset-orange">👑 1er Passage Stylistes</span>
                    </h3>
                    <p className="text-gray-600 mb-2 modern-font">
                      <strong>19h00 - 19h30</strong>
                    </p>
                    <p className="text-gray-600 modern-font">
                      Défilé des créations d'Angèle Epouta et Angelina Creations, 
                      mettant en valeur l'excellence de la haute couture gabonaise.
                    </p>
                  </div>
                </div>

                {/* Étape 3 */}
                <div className="relative flex items-start mb-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-earth-gradient rounded-full flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold">3</span>
                  </div>
                  <div className="ml-6 card-gabonese p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 gabonese-font">
                      <span className="text-earth-brown">🎵 Prestation Artistique</span>
                    </h3>
                    <p className="text-gray-600 mb-2 modern-font">
                      <strong>19h30 - 19h45</strong>
                    </p>
                    <p className="text-gray-600 modern-font">
                      Spectacle musical mettant en scène la culture gabonaise avec des artistes 
                      locaux et des performances traditionnelles.
                    </p>
                  </div>
                </div>

                {/* Étape 4 */}
                <div className="relative flex items-start mb-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-gabon-gradient rounded-full flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold">4</span>
                  </div>
                  <div className="ml-6 card-gabonese p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 gabonese-font">
                      <span className="text-gabon-green">✨ 2ème Passage Stylistes</span>
                    </h3>
                    <p className="text-gray-600 mb-2 modern-font">
                      <strong>19h45 - 20h15</strong>
                    </p>
                    <p className="text-gray-600 modern-font">
                      Défilé de Beitch Faro et L'atelier Issé By Lita, 
                      présentant des créations innovantes alliant tradition et modernité.
                    </p>
                  </div>
                </div>

                {/* Étape 5 */}
                <div className="relative flex items-start mb-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-sunset-gradient rounded-full flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold">5</span>
                  </div>
                  <div className="ml-6 card-gabonese p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 gabonese-font">
                      <span className="text-sunset-orange">🎬 Vidéo & Interlude</span>
                    </h3>
                    <p className="text-gray-600 mb-2 modern-font">
                      <strong>20h15 - 20h30</strong>
                    </p>
                    <p className="text-gray-600 modern-font">
                      Projection d'un documentaire sur l'impact de la mode locale au Gabon 
                      et présentation des enjeux de la consommation responsable.
                    </p>
                  </div>
                </div>

                {/* Étape 6 */}
                <div className="relative flex items-start mb-8">
                  <div className="flex-shrink-0 w-16 h-16 bg-earth-gradient rounded-full flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold">6</span>
                  </div>
                  <div className="ml-6 card-gabonese p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 gabonese-font">
                      <span className="text-earth-brown">👑 3ème Passage Stylistes</span>
                    </h3>
                    <p className="text-gray-600 mb-2 modern-font">
                      <strong>20h30 - 21h00</strong>
                    </p>
                    <p className="text-gray-600 modern-font">
                      Grand final avec toutes les créations exceptionnelles, 
                      mettant en valeur la diversité et l'excellence de la mode gabonaise.
                    </p>
                  </div>
                </div>

                {/* Étape 7 */}
                <div className="relative flex items-start">
                  <div className="flex-shrink-0 w-16 h-16 bg-gabon-gradient rounded-full flex items-center justify-center z-10">
                    <span className="text-white text-xl font-bold">7</span>
                  </div>
                  <div className="ml-6 card-gabonese p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 gabonese-font">
                      <span className="text-gabon-green">🏆 Remise des Attestations</span>
                    </h3>
                    <p className="text-gray-600 mb-2 modern-font">
                      <strong>21h00 - 21h30</strong>
                    </p>
                    <p className="text-gray-600 modern-font">
                      Cérémonie de remise des attestations aux stylistes participants, 
                      aux mannequins et aux invités d'honneur, suivie d'un cocktail de clôture.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vidéo teaser et galerie */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
              <span className="text-gabon-green">🎬 Vidéo</span> 
              <span className="text-african-gold mx-3">•</span>
              <span className="text-sunset-orange">Teaser</span>
            </h2>
          </div>

          <div className="card-gabonese p-8 text-center">
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center mb-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gabon-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">▶️</span>
                </div>
                <p className="text-gray-600 modern-font">Vidéo teaser bientôt disponible</p>
              </div>
            </div>
            <p className="text-gray-600 modern-font">
              Découvrez prochainement notre vidéo teaser qui vous donnera un aperçu 
              des créations exceptionnelles de cette édition 2025.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Final */}
      <div className="bg-gradient-to-r from-gabon-green to-sunset-orange py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Prêt à vivre cette expérience unique ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez-nous le 16 novembre 2025 pour célébrer l'excellence de la mode gabonaise 
              et soutenir la consommation locale.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-gabon-green px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Acheter son ticket
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-gabon-green transition-all duration-300 transform hover:scale-105">
                Voir le programme
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edition;
