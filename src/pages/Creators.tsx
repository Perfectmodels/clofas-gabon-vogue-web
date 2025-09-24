import React, { useState } from 'react';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';
import '@/styles/creators.css';
import StylistGallery from '../components/StylistGallery';
import CreatorCard from '../components/CreatorCard';
import creatorsData from '../components/creators/clofas-cms-data.json';

const Creators: React.FC = () => {
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const handleViewGallery = (stylistName: string) => {
    setSelectedStylist(stylistName);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setSelectedStylist(null);
  };

  const selectedCreator = creatorsData.creators.find(c => c.name === selectedStylist);

  return (
    <div className="min-h-screen section-gabonese pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden creators-section">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gabonese-font animate-golden-shimmer">
              Nos Créateurs
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto modern-font">
              Découvrez les talents exceptionnels de la mode gabonaise qui façonnent l'avenir de la création africaine lors de l'édition 2024 du CLOFAS 241.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-gabon-yellow">
                <span className="font-semibold">{creatorsData.creators.length} créateurs d'exception</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-gabon-yellow">
                <span className="font-semibold">{creatorsData.creators.reduce((acc, curr) => acc + curr.images.length, 0)}+ créations uniques</span>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 border border-gabon-yellow">
                <span className="font-semibold">Édition 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
            <span className="text-gabon-green">Créateurs</span> 
            <span className="text-gabon-yellow mx-3">•</span>
            <span className="text-gabon-blue">CLOFAS 241</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg modern-font">
            Rencontrez les artistes qui transforment la mode gabonaise. Chaque créateur apporte sa vision unique, alliant tradition et innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {creatorsData.creators.map((creator) => (
            <CreatorCard key={creator.id} creator={creator} onViewGallery={handleViewGallery} />
          ))}
        </div>
      </div>

      {/* Galerie des stylistes */}
      <StylistGallery
        stylistName={selectedStylist || ''}
        images={selectedCreator ? selectedCreator.images.map((url, index) => ({ id: index, url, title: `Création ${index + 1}`, description: `Création de ${selectedStylist}`, category: '' })) : []}
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
      />
    </div>
  );
};

export default Creators;
