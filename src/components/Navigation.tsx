import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Accueil', path: '/' },
    { name: 'À propos', path: '/about' },
    { name: 'Édition 2025', path: '/edition' },
    { name: 'Styliste & Créateurs', path: '/creators' },
    { name: 'Actualités', path: '/news' },
    { name: 'Tickets', path: '/tickets' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navClass = isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-200'
    : 'bg-transparent';
  
  const linkColor = isScrolled ? 'text-gray-700' : 'text-white/90';
  const activeLinkColor = isScrolled ? 'text-purple-600 bg-purple-50' : 'text-white bg-white/20';
  const hoverLinkColor = isScrolled ? 'hover:text-purple-600 hover:bg-purple-50' : 'hover:text-white hover:bg-white/10';


  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
             <img src="/logo-clofas-241.png" alt="CLOFAS 241 Logo" className="h-12 w-auto group-hover:scale-105 transition-transform duration-300" />
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 rounded-lg font-medium transition-all duration-300 ${isActive(item.path) ? activeLinkColor : `${linkColor} ${hoverLinkColor}`}`}
              >
                <span>{item.name}</span>
                {isActive(item.path) && (
                  <div className={`absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full ${isScrolled ? 'bg-purple-500' : 'bg-white'}`} />
                )}
              </Link>
            ))}
          </div>

          {/* CTAs (Desktop) */}
          <div className="hidden md:flex items-center space-x-4">
             <Link
              to="/tickets"
              className="px-5 py-2.5 rounded-full font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-px"
            >
              Acheter son ticket
            </Link>
            <Link
              to="/admin"
              className={`px-3 py-2 rounded-lg font-medium transition-all duration-300 border ${isScrolled ? 'text-gray-600 border-gray-300 hover:bg-gray-100' : 'text-white/80 border-white/30 hover:bg-white/10'}`}
              title="Admin Panel"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zm-6 9a8 8 0 100-16 8 8 0 000 16zm-3.54-4.46a.75.75 0 00-1.06-1.06l-1.5 1.5a.75.75 0 101.06 1.06l1.5-1.5zm3.54 0a.75.75 0 011.06-1.06l1.5 1.5a.75.75 0 11-1.06 1.06l-1.5-1.5z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>

          {/* Bouton Menu Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'}`}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              )}
            </svg>
          </button>
        </div>

        {/* Menu Mobile */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-purple-200">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${isActive(item.path) ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'}`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-200 my-2" />
              <Link
                  to="/tickets"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center px-4 py-3 rounded-lg font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg"
                >
                  Acheter son ticket
              </Link>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="block text-center px-4 py-3 rounded-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition-colors duration-200 mt-2 border border-gray-200"
              >
                Panel Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;