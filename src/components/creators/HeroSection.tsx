
import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative py-20 md:py-32 bg-clofas-dark text-white">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=1974')] bg-cover bg-center opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Créateurs <span className="text-clofas-gold">CLOFAS 241</span>
        </h1>
        <p className="text-xl max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
          Découvrez les talentueux stylistes qui participent à cette célébration de la mode gabonaise et africaine
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
