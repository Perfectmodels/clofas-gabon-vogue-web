
import { useEffect, useRef, useState } from 'react';

type GalleryItem = {
  id: number;
  type: 'image' | 'video';
  src: string;
  thumbnail: string;
  title: string;
  description: string;
  year: number;
  category: string;
};

const Gallery = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    // Mock data - in a real app, this would come from an API
    const mockGalleryItems: GalleryItem[] = [
      {
        id: 1,
        type: 'image',
        src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976",
        thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1976",
        title: "Défilé CLOFAS 241 2023",
        description: "Collection printemps-été présentée lors du défilé principal.",
        year: 2023,
        category: 'défilé'
      },
      {
        id: 2,
        type: 'image',
        src: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
        thumbnail: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070",
        title: "Backstage CLOFAS 241",
        description: "Préparation des mannequins avant le défilé.",
        year: 2023,
        category: 'backstage'
      },
      {
        id: 3,
        type: 'image',
        src: "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?q=80&w=1964",
        thumbnail: "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?q=80&w=1964",
        title: "Atelier de Design",
        description: "Session créative lors des ateliers de dessin.",
        year: 2023,
        category: 'atelier'
      },
      {
        id: 4,
        type: 'image',
        src: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1974",
        thumbnail: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1974",
        title: "Collection Traditionnelle",
        description: "Mélange de motifs traditionnels gabonais et de coupes modernes.",
        year: 2023,
        category: 'collection'
      },
      {
        id: 5,
        type: 'image',
        src: "https://images.unsplash.com/photo-1517840545241-b951d45103c0?q=80&w=1964",
        thumbnail: "https://images.unsplash.com/photo-1517840545241-b951d45103c0?q=80&w=1964",
        title: "Conférence de Presse",
        description: "Présentation de l'événement aux médias et partenaires.",
        year: 2022,
        category: 'conférence'
      },
      {
        id: 6,
        type: 'image',
        src: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2013",
        thumbnail: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2013",
        title: "Exposition de Mode",
        description: "Présentation des créations dans l'espace d'exposition.",
        year: 2022,
        category: 'exposition'
      },
      {
        id: 7,
        type: 'image',
        src: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974",
        thumbnail: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?q=80&w=1974",
        title: "Accessoires CLOFAS",
        description: "Collection d'accessoires inspirés des traditions gabonaises.",
        year: 2023,
        category: 'accessoires'
      },
      {
        id: 8,
        type: 'image',
        src: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2013",
        thumbnail: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2013",
        title: "Public CLOFAS 241",
        description: "Le public lors de la présentation finale.",
        year: 2023,
        category: 'défilé'
      },
      {
        id: 9,
        type: 'video',
        src: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video URL
        thumbnail: "https://images.unsplash.com/photo-1616422285623-13ff0162193c?q=80&w=2069",
        title: "Teaser CLOFAS 241 2023",
        description: "Aperçu des moments forts de l'édition 2023.",
        year: 2023,
        category: 'video'
      },
    ];

    setGalleryItems(mockGalleryItems);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach(section => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
        
        if (isVisible) {
          section.classList.add('is-visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = (item: GalleryItem) => {
    setSelectedItem(item);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    document.body.style.overflow = 'auto';
  };

  const filteredItems = activeFilter === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-clofas-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579029674294-259cb4ae948d?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Galerie <span className="text-clofas-coral">CLOFAS 241</span>
          </h1>
          <p className="text-xl max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Explorez les moments inoubliables des éditions précédentes en images et en vidéos
          </p>
        </div>
      </section>

      {/* Gallery Filter */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)} 
        className="pt-16 pb-8 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <button 
              onClick={() => setActiveFilter('all')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button 
              onClick={() => setActiveFilter('défilé')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                activeFilter === 'défilé' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Défilés
            </button>
            <button 
              onClick={() => setActiveFilter('backstage')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                activeFilter === 'backstage' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Backstage
            </button>
            <button 
              onClick={() => setActiveFilter('atelier')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                activeFilter === 'atelier' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ateliers
            </button>
            <button 
              onClick={() => setActiveFilter('collection')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                activeFilter === 'collection' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Collections
            </button>
            <button 
              onClick={() => setActiveFilter('video')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                activeFilter === 'video' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Vidéos
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="py-8 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map(item => (
              <div 
                key={item.id} 
                className="group relative overflow-hidden rounded-xl cursor-pointer hover:shadow-lg transition-all"
                onClick={() => handleOpenModal(item)}
              >
                <div className="aspect-w-4 aspect-h-3">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {item.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/80 rounded-full p-3">
                      <svg className="w-8 h-8 text-clofas-coral" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm mb-2">{item.description}</p>
                  <span className="text-clofas-coral text-sm font-medium">{item.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)} 
        className="py-20 px-4 bg-clofas-coral/10 fade-in-section"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6 text-clofas-dark">
            Participez à la Prochaine Édition
          </h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto text-gray-700">
            Soyez au cœur de l'événement mode le plus vibrant du Gabon. 
            CLOFAS 241 revient bientôt avec encore plus de créativité, 
            d'innovation et de célébration de la mode gabonaise.
          </p>
          <a 
            href="/contact" 
            className="btn-primary"
          >
            S'inscrire pour 2025
          </a>
        </div>
      </section>

      {/* Modal for full-size image/video */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-6xl w-full mx-auto">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-clofas-coral z-10"
            >
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="sr-only">Fermer</span>
            </button>
            
            <div className="bg-white rounded-xl overflow-hidden">
              <div className="aspect-w-16 aspect-h-9">
                {selectedItem.type === 'image' ? (
                  <img 
                    src={selectedItem.src} 
                    alt={selectedItem.title} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <iframe 
                    src={selectedItem.src} 
                    title={selectedItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
                <p className="text-gray-600 mb-2">{selectedItem.description}</p>
                <p className="text-sm text-clofas-coral font-medium">CLOFAS 241 - {selectedItem.year}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
