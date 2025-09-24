
import React from 'react';
import { Link } from 'react-router-dom';
import Countdown from '../components/Countdown';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-white text-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video autoPlay loop muted className="w-full h-full object-cover">
            {/* Remplacez par une URL de vidéo pertinente */}
            <source src="https://videos.pexels.com/video-files/3254013/3254013-hd_1920_1080_25fps.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 tracking-wide">
            Consommer local, c’est valoriser notre culture
          </h1>
          <p className="text-xl md:text-2xl font-light mb-6">
            16 novembre 2025 – Casino Croisette, Libreville
          </p>
          
          <Countdown />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tickets"
              className="px-8 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-xl transform hover:scale-105"
            >
              🎟️ Acheter son ticket
            </Link>
            <Link
              to="/edition"
              className="px-8 py-3.5 rounded-full font-bold bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
            >
              📅 Voir le programme
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Présentation de CLOFAS 241 */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">Qu’est-ce que CLOFAS 241 ?</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            CLOFAS 241 est le rendez-vous incontournable de la mode au Gabon. Notre mission est de valoriser la richesse de la consommation locale en propulsant les stylistes et créateurs gabonais sur le devant de la scène nationale et internationale. Chaque édition est une célébration de la créativité, de l'authenticité et du savoir-faire artisanal.
          </p>
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-purple-600 font-bold hover:text-purple-800 transition-colors duration-300"
          >
            Découvrir l’histoire →
          </Link>
        </div>
      </section>

      {/* 3. Édition 2025 – Aperçu */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Édition 2025</h2>
              <p className="text-xl text-gray-600 mb-8">Le thème de cette année met en lumière la fusion entre tradition et innovation.</p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xl">1</div>
                  <div>
                    <h3 className="text-xl font-bold">Tapis Rouge & Accueil</h3>
                    <p className="text-gray-600">Networking et présentation des partenaires.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold text-xl">2</div>
                  <div>
                    <h3 className="text-xl font-bold">Défilés des Stylistes</h3>
                    <p className="text-gray-600">Présentation des collections exclusives.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-purple-800 text-white flex items-center justify-center font-bold text-xl">3</div>
                  <div>
                    <h3 className="text-xl font-bold">Remise des Attestations</h3>
                    <p className="text-gray-600">Célébration des talents de l'édition.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                 <Link
                    to="/edition"
                    className="inline-flex items-center gap-2 bg-gray-800 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-900 transition-all duration-300 shadow-lg"
                  >
                    Voir l’édition complète
                  </Link>
              </div>
            </div>
            <div className="flex justify-center">
               {/* Remplacez par une image ou un visuel de l'édition */}
              <img src="https://via.placeholder.com/600x700/E9D5FF/8B5CF6?text=Affiche+2025" alt="Affiche Édition 2025" className="rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* 5. Actualités récentes */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Nos dernières actualités</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">Suivez les dernières nouvelles et annonces de l'équipe CLOFAS 241.</p>
            </div>
            {/* Placeholder pour les articles - à remplacer par des données dynamiques */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {/* Article 1 */}
                 <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
                   <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://via.placeholder.com/400x250/A78BFA/FFFFFF?text=Coulisses')"}}></div>
                   <div className="p-6">
                     <h3 className="text-xl font-bold mb-2">Les coulisses de la préparation</h3>
                     <p className="text-gray-600 mb-4 text-sm">Découvrez comment notre équipe prépare l'événement de l'année...</p>
                     <Link to="/news" className="font-bold text-purple-600 hover:underline">Lire plus</Link>
                   </div>
                 </div>
                 {/* Article 2 */}
                 <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
                   <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://via.placeholder.com/400x250/F472B6/FFFFFF?text=Interview')"}}></div>
                   <div className="p-6">
                     <h3 className="text-xl font-bold mb-2">Interview avec un créateur</h3>
                     <p className="text-gray-600 mb-4 text-sm">Entretien exclusif avec l'un des talents de l'édition 2025...</p>
                     <Link to="/news" className="font-bold text-purple-600 hover:underline">Lire plus</Link>
                   </div>
                 </div>
                 {/* Article 3 */}
                 <div className="bg-gray-50 rounded-lg shadow-md overflow-hidden group">
                   <div className="h-48 bg-cover bg-center" style={{backgroundImage: "url('https://via.placeholder.com/400x250/8B5CF6/FFFFFF?text=Annonce')"}}></div>
                   <div className="p-6">
                     <h3 className="text-xl font-bold mb-2">Annonce des partenaires</h3>
                     <p className="text-gray-600 mb-4 text-sm">Nos partenaires officiels pour l'édition 2025...</p>
                     <Link to="/news" className="font-bold text-purple-600 hover:underline">Lire plus</Link>
                   </div>
                 </div>
            </div>
            <div className="text-center mt-16">
              <Link
                to="/news"
                className="inline-flex items-center gap-2 bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Lire toutes les actualités
              </Link>
          </div>
        </div>
      </section>

      {/* 6. Tickets – Appel à l’action */}
      <section className="py-20 bg-gradient-to-r from-purple-800 to-pink-700 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ne manquez pas l’événement !</h2>
            <p className="text-xl max-w-2xl mx-auto mb-8">Réservez votre place dès maintenant pour une expérience inoubliable.</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-10">
              <div className="bg-white/10 backdrop-blur-md p-8 rounded-lg border border-white/20 w-full md:w-80">
                <h3 className="text-2xl font-bold mb-2">Ticket Standard</h3>
                <p className="text-4xl font-bold mb-4">50€</p>
                <ul className="text-left space-y-2 opacity-80">
                  <li>✓ Accès au défilé</li>
                  <li>✓ Place assise standard</li>
                </ul>
              </div>
              <div className="bg-white/20 backdrop-blur-md p-8 rounded-lg border-2 border-pink-400 w-full md:w-96 transform scale-105 shadow-2xl">
                <p className="absolute -top-4 left-1/2 -translate-x-1/2 bg-pink-500 px-4 py-1 rounded-full text-sm font-bold">POPULAIRE</p>
                <h3 className="text-3xl font-bold mb-2">Ticket VIP</h3>
                <p className="text-5xl font-bold mb-4">120€</p>
                <ul className="text-left space-y-2 opacity-90">
                  <li>✓ Accès au défilé</li>
                  <li>✓ Place au premier rang</li>
                  <li>✓ Cocktail & Networking</li>
                  <li>✓ Sac cadeau exclusif</li>
                </ul>
              </div>
            </div>

            <Link
              to="/tickets"
              className="px-10 py-4 rounded-full font-bold text-purple-800 bg-white hover:bg-gray-200 transition-all duration-300 shadow-2xl transform hover:scale-105 text-lg"
            >
              Acheter un ticket
            </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
