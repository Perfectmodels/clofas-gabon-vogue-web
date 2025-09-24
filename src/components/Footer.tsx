import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-32 right-20 w-16 h-16 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-indigo-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm border-y border-white/10">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="text-3xl">✨</span>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Restez Connectés
                </h3>
                <span className="text-3xl">✨</span>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Recevez les dernières actualités et événements du CLOFAS 241
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Votre adresse email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
                  📧 S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            
            {/* Logo et Description */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl font-bold">👑</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">CLOFAS 241</h2>
                  <p className="text-sm text-gray-400">Mode Gabonaise</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Consommation Locale Fashion Show 241 - Promouvoir la mode gabonaise authentique et responsable à travers des créateurs talentueux.
              </p>

              {/* Statistiques */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">👑</div>
                  <div className="text-2xl font-bold text-white">8+</div>
                  <div className="text-xs text-gray-400">Créateurs</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">📸</div>
                  <div className="text-2xl font-bold text-white">200+</div>
                  <div className="text-xs text-gray-400">Photos</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">🏆</div>
                  <div className="text-2xl font-bold text-white">2024</div>
                  <div className="text-xs text-gray-400">Éditions</div>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-2xl mb-1">👥</div>
                  <div className="text-2xl font-bold text-white">5K+</div>
                  <div className="text-xs text-gray-400">Visiteurs</div>
                </div>
              </div>
            </div>

            {/* Liens Rapides */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-purple-400">⚡</span>
                Liens Rapides
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="/" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">🏠</span>
                    <span className="group-hover:translate-x-1 transition-transform">Accueil</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
                <li>
                  <a href="/about" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">👥</span>
                    <span className="group-hover:translate-x-1 transition-transform">À Propos</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
                <li>
                  <a href="/creators" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">👑</span>
                    <span className="group-hover:translate-x-1 transition-transform">Créateurs</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
                <li>
                  <a href="/program" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">📅</span>
                    <span className="group-hover:translate-x-1 transition-transform">Programme</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
                <li>
                  <a href="/gallery" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">📸</span>
                    <span className="group-hover:translate-x-1 transition-transform">Galerie</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
                <li>
                  <a href="/partners" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">🤝</span>
                    <span className="group-hover:translate-x-1 transition-transform">Partenaires</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
                <li>
                  <a href="/contact" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">💬</span>
                    <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
                <li>
                  <a href="/admin" className="flex items-center gap-3 text-gray-300 hover:text-purple-400 transition-colors group">
                    <span className="group-hover:scale-110 transition-transform">⚙️</span>
                    <span className="group-hover:translate-x-1 transition-transform">Admin</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Créateurs */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-pink-400">💎</span>
                Nos Créateurs
              </h3>
              <ul className="space-y-3">
                <li className="group">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                        Angèle Epouta
                      </div>
                      <div className="text-xs text-gray-400">
                        Maître Créatrice
                      </div>
                    </div>
                  </div>
                </li>
                <li className="group">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      B
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                        Beitch Faro
                      </div>
                      <div className="text-xs text-gray-400">
                        Promotrice
                      </div>
                    </div>
                  </div>
                </li>
                <li className="group">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      A
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                        Angelina Creations
                      </div>
                      <div className="text-xs text-gray-400">
                        Maison de couture
                      </div>
                    </div>
                  </div>
                </li>
                <li className="group">
                  <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      L
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white group-hover:text-purple-400 transition-colors">
                        L'atelier Issé By Lita
                      </div>
                      <div className="text-xs text-gray-400">
                        Créatrice
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact & Social */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="text-indigo-400">💬</span>
                Contact
              </h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-400">📧</span>
                  <span className="text-sm">Beitchfaro@yahoo.fr</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-400">📱</span>
                  <span className="text-sm">+241 66 66 89 00</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-400">📍</span>
                  <span className="text-sm">Libreville, Gabon</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <span className="text-purple-400">🕒</span>
                  <span className="text-sm">Lun - Ven: 9h - 18h</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-300 mb-3">Suivez-nous</h4>
                <div className="flex gap-3">
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-pink-500 transition-all hover:bg-white/20 hover:scale-110">
                    📷
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600 transition-all hover:bg-white/20 hover:scale-110">
                    📘
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all hover:bg-white/20 hover:scale-110">
                    🐦
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 transition-all hover:bg-white/20 hover:scale-110">
                    📺
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-700 transition-all hover:bg-white/20 hover:scale-110">
                    💼
                  </a>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">🛡️</span>
                  <span className="text-sm font-medium text-white">Site Sécurisé</span>
                </div>
                <p className="text-xs text-gray-400">
                  Vos données sont protégées avec les dernières technologies de sécurité.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 my-8"></div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                © {currentYear} CLOFAS 241. Tous droits réservés.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Fait avec <span className="text-red-400">❤️</span> au Gabon
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-green-400">✅</span>
                <span>Version 2.0</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <span className="text-blue-400">🌍</span>
                <span>Français</span>
              </div>
            </div>

            <button
              onClick={scrollToTop}
              className="bg-white/10 border border-white/20 text-white px-4 py-2 rounded-lg hover:bg-white/20 hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">⬆️</span>
              Retour en haut
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;