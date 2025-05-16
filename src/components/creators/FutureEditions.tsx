
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const FutureEditions = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
      
      if (isVisible) {
        sectionRef.current.classList.add('is-visible');
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-20 px-4 bg-gray-50 fade-in-section"
    >
      <div className="container mx-auto max-w-6xl">
        <span className="inline-block px-3 py-1 bg-clofas-lavender/20 text-clofas-lavender rounded-full text-sm font-medium mb-4">
          À venir
        </span>
        <h2 className="section-title">Éditions Futures (2025 et plus)</h2>
        <p className="text-lg max-w-3xl mb-12">
          Restez informés des prochaines éditions de CLOFAS 241 et des opportunités de participation
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-playfair text-xl font-bold mb-4">Annonce des prochaines éditions</h3>
            <p className="text-gray-600 mb-6">
              Soyez les premiers informés des dates et lieux des prochaines éditions de CLOFAS 241
            </p>
            <Link to="/contact" className="text-clofas-coral hover:underline font-medium">
              S'inscrire à la newsletter &rarr;
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-playfair text-xl font-bold mb-4">Inscriptions pour participations</h3>
            <p className="text-gray-600 mb-6">
              Ouverture des inscriptions pour les créateurs, exposants et partenaires souhaitant participer
            </p>
            <Link to="/contact" className="text-clofas-coral hover:underline font-medium">
              Soumettre sa candidature &rarr;
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-playfair text-xl font-bold mb-4">Opportunités de collaboration</h3>
            <p className="text-gray-600 mb-6">
              Découvrez comment devenir partenaire ou sponsor pour les futures éditions
            </p>
            <Link to="/contact" className="text-clofas-coral hover:underline font-medium">
              Devenir partenaire &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureEditions;
