
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Instagram } from 'lucide-react';

const ContactSection = () => {
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
      className="py-20 px-4 fade-in-section"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="section-title text-center mx-auto">Contact & Réseaux Sociaux</h2>
        <p className="text-lg mb-10 max-w-3xl mx-auto">
          Pour toute information complémentaire, n'hésitez pas à nous contacter
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-clofas-coral/10 rounded-full flex items-center justify-center">
              <Phone className="w-5 h-5 text-clofas-coral" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Téléphone</p>
              <p className="font-bold">+241 66668900</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-clofas-gold/10 rounded-full flex items-center justify-center">
              <MapPin className="w-5 h-5 text-clofas-gold" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Lieu de l'événement</p>
              <p className="font-bold">Ministère de la Culture et des Arts - Gabon</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-clofas-lavender/10 rounded-full flex items-center justify-center">
              <Instagram className="w-5 h-5 text-clofas-lavender" />
            </div>
            <div className="text-left">
              <p className="text-sm text-gray-500">Réseaux sociaux</p>
              <p className="font-bold">Facebook & Instagram: CLOFAS 241</p>
            </div>
          </div>
        </div>
        
        <Link to="/contact" className="btn-primary">
          Nous contacter
        </Link>
      </div>
    </section>
  );
};

export default ContactSection;
