
import { useState } from 'react';
import HeroSection from '@/components/creators/HeroSection';
import EditionInfo from '@/components/creators/EditionInfo';
import CreatorsList from '@/components/creators/CreatorsList';
import CreatorsGallery from '@/components/creators/CreatorsGallery';
import FutureEditions from '@/components/creators/FutureEditions';
import ContactSection from '@/components/creators/ContactSection';
import CreatorImageModals from '@/components/creators/CreatorImageModals';
import { creators2024 } from '@/components/creators/CreatorsData';

type Creator = {
  name: string;
  country: string;
  images: string[];
};

const Creators = () => {
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleCreatorClick = (creator: Creator) => {
    setSelectedCreator(creator);
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
              <h3 className="text-xl font-bold mb-6">Stylistes invités</h3>
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
