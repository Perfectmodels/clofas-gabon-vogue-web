
import { useGalleryImages } from '@/hooks/use-gallery-images';
import GalleryGrid from '@/components/GalleryGrid';

const Gallery = () => {
  const { images, loading } = useGalleryImages();

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-playfair font-bold text-clofas-dark mb-6">
            Galerie Photo
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les moments inoubliables des éditions passées de CLOFAS 241, 
            capturés en images.
          </p>
        </div>
        
        <div className="mt-12">
          <GalleryGrid images={images} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
