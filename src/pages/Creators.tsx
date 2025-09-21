
import { useState } from 'react';
import HeroSection from '@/components/creators/HeroSection';
import EditionInfo from '@/components/creators/EditionInfo';
import CreatorsList from '@/components/creators/CreatorsList';
import CreatorsGallery from '@/components/creators/CreatorsGallery';
import FutureEditions from '@/components/creators/FutureEditions';
import ContactSection from '@/components/creators/ContactSection';
import CreatorImageModals from '@/components/creators/CreatorImageModals';
import CreatorGallery from '@/components/creators/CreatorGallery';
import { creators2024 } from '@/components/creators/CreatorsData';

type Creator = {
  name: string;
  country: string;
  images: string[];
  id?: string;
};

const Creators = () => {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCreatorGallery, setShowCreatorGallery] = useState(false);

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
    setShowCreatorGallery(true);
  };

  const handleCloseGallery = () => {
    setShowCreatorGallery(false);
    setSelectedCreator(null);
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Current Edition */}
      <section className="py-20 px-4 fade-in-section">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="md:w-1/2">
              <EditionInfo />
            </div>
            
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold">Stylistes invités</h3>
                <div className="text-sm text-gray-600">
                  Cliquez sur "Voir" pour explorer la galerie de chaque créateur
                </div>
              </div>
              <CreatorsList 
                creators={creators2024} 
                onCreatorClick={handleCreatorClick} 
              />
            </div>
          </div>
          
          {/* Creators Gallery - Now shown separately below the info section */}
          <div className="mt-12">
            <CreatorsGallery />
          </div>
        </div>
      </section>

      {/* Future Editions */}
      <FutureEditions />

      {/* Contact Information */}
      <ContactSection />

      {/* Creator Gallery Modal */}
      {showCreatorGallery && selectedCreator && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-clofas-dark">
                  Galerie de {selectedCreator.name}
                </h2>
                <button
                  onClick={handleCloseGallery}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <CreatorGallery 
                creatorId={selectedCreator.id || selectedCreator.name.toLowerCase().replace(/\s+/g, '-')}
                creatorName={selectedCreator.name}
              />
            </div>
          </div>
        </div>
      )}

      {/* Creator Image Modals */}
      <CreatorImageModals 
        selectedCreator={selectedCreator}
        setSelectedCreator={setSelectedCreator}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        showImageDialog={showImageDialog}
        setShowImageDialog={setShowImageDialog}
      />
    </div>
  );
};

export default Creators;
