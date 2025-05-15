
import { useEffect, useRef, useState } from 'react';

type Creator = {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  featured: boolean;
  social: {
    instagram?: string;
    twitter?: string;
    website?: string;
  }
};

const Creators = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [filter, setFilter] = useState('all');
  const [creators, setCreators] = useState<Creator[]>([]);
  const [featuredCreator, setFeaturedCreator] = useState<Creator | null>(null);

  useEffect(() => {
    // This would typically be an API call in a real application
    const mockCreators: Creator[] = [
      {
        id: 1,
        name: "Beitch Faro",
        role: "Fondatrice & Designer",
        bio: "Visionnaire et créatrice de CLOFAS 241, Beitch Faro est une styliste de renom qui a révolutionné la mode gabonaise en intégrant des éléments traditionnels dans des designs contemporains.",
        image: "https://images.unsplash.com/photo-1565104781149-affb0067734e?q=80&w=2070",
        featured: true,
        social: {
          instagram: "https://instagram.com",
          twitter: "https://twitter.com",
          website: "https://example.com"
        }
      },
      {
        id: 2,
        name: "Paul Mezui",
        role: "Designer de Mode",
        bio: "Spécialiste des tissus durables, Paul crée des collections qui allient éco-responsabilité et élégance intemporelle.",
        image: "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=1974",
        featured: false,
        social: {
          instagram: "https://instagram.com",
          website: "https://example.com"
        }
      },
      {
        id: 3,
        name: "Marie Ntsame",
        role: "Styliste",
        bio: "Créatrice audacieuse, Marie puise son inspiration dans l'art gabonais traditionnel pour créer des pièces contemporaines remarquables.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964",
        featured: false,
        social: {
          instagram: "https://instagram.com",
          twitter: "https://twitter.com"
        }
      },
      {
        id: 4,
        name: "Jean Moubamba",
        role: "Designer de Accessoires",
        bio: "Artisan spécialisé dans la création d'accessoires de mode qui racontent l'histoire du Gabon à travers des designs innovants.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974",
        featured: false,
        social: {
          instagram: "https://instagram.com",
          website: "https://example.com"
        }
      },
      {
        id: 5,
        name: "Sarah Odzala",
        role: "Designer Textile",
        bio: "Experte en impression sur tissu, Sarah mélange techniques ancestrales et procédés modernes pour créer des motifs uniques.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964",
        featured: false,
        social: {
          instagram: "https://instagram.com",
          twitter: "https://twitter.com"
        }
      },
      {
        id: 6,
        name: "Thomas Ndong",
        role: "Designer de Mode",
        bio: "Designer avant-gardiste connu pour ses silhouettes innovantes et son approche non conventionnelle de la mode masculine.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974",
        featured: false,
        social: {
          instagram: "https://instagram.com",
          website: "https://example.com"
        }
      },
      {
        id: 7,
        name: "Carine Mboulé",
        role: "Illustratrice de Mode",
        bio: "Illustratrice talentueuse qui transforme des concepts abstraits en dessins détaillés qui guident les créations des designers.",
        image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=1974",
        featured: false,
        social: {
          instagram: "https://instagram.com"
        }
      },
      {
        id: 8,
        name: "Antoine Koumba",
        role: "Designer de Mode Masculine",
        bio: "Spécialiste de la mode masculine, Antoine est connu pour son souci du détail et son approche minimaliste des coupes classiques.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974",
        featured: false,
        social: {
          instagram: "https://instagram.com",
          twitter: "https://twitter.com"
        }
      },
    ];

    setCreators(mockCreators);
    const featured = mockCreators.find(creator => creator.featured);
    if (featured) {
      setFeaturedCreator(featured);
    }
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

  const filteredCreators = filter === 'all' 
    ? creators 
    : creators.filter(creator => creator.role.toLowerCase().includes(filter));

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-clofas-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=2013')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Les <span className="text-clofas-coral">Créateurs</span>
          </h1>
          <p className="text-xl max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Découvrez les talents exceptionnels qui façonnent l'avenir de la mode gabonaise
          </p>
        </div>
      </section>

      {/* Featured Creator */}
      {featuredCreator && (
        <section 
          ref={(el) => (sectionsRef.current[0] = el)} 
          className="py-20 px-4 fade-in-section bg-gray-50"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <span className="inline-block px-3 py-1 bg-clofas-coral/20 text-clofas-coral rounded-full text-sm font-medium mb-4">
                  Créatrice à l'honneur
                </span>
                <h2 className="section-title">{featuredCreator.name}</h2>
                <p className="text-gray-600 text-lg font-medium mb-4">{featuredCreator.role}</p>
                <p className="text-lg mb-6">
                  {featuredCreator.bio}
                </p>
                
                <div className="flex space-x-4 mb-8">
                  {featuredCreator.social.instagram && (
                    <a 
                      href={featuredCreator.social.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-clofas-coral"
                      aria-label="Instagram"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {featuredCreator.social.twitter && (
                    <a 
                      href={featuredCreator.social.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-clofas-coral"
                      aria-label="Twitter"
                    >
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {featuredCreator.social.website && (
                    <a 
                      href={featuredCreator.social.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-clofas-coral"
                      aria-label="Website"
                    >
                      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </a>
                  )}
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-clofas-gold">
                  <p className="text-sm font-playfair italic">
                    "La mode gabonaise est un trésor à partager avec le monde. Notre créativité, 
                    nos traditions et notre vision unique méritent d'être célébrées et reconnues."
                    <span className="block mt-2 font-normal text-gray-600">— {featuredCreator.name}</span>
                  </p>
                </div>
              </div>
              <div className="relative">
                <img 
                  src={featuredCreator.image} 
                  alt={featuredCreator.name} 
                  className="rounded-xl shadow-xl relative z-10 w-full h-[500px] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 w-full h-full bg-clofas-coral/20 rounded-xl -z-0"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Creator Gallery */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-center mx-auto">Nos Créateurs</h2>
          <p className="text-center max-w-3xl mx-auto mb-8 text-lg">
            Explorez les talents variés qui participent à CLOFAS 241
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === 'all' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Tous
            </button>
            <button 
              onClick={() => setFilter('designer')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === 'designer' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Designers
            </button>
            <button 
              onClick={() => setFilter('styliste')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === 'styliste' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Stylistes
            </button>
            <button 
              onClick={() => setFilter('accessoire')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === 'accessoire' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Accessoires
            </button>
            <button 
              onClick={() => setFilter('textile')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === 'textile' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Textile
            </button>
            <button 
              onClick={() => setFilter('illustra')} 
              className={`px-4 py-2 rounded-full transition-colors ${
                filter === 'illustra' 
                  ? 'bg-clofas-dark text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Illustrateurs
            </button>
          </div>
          
          {/* Creator Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCreators
              .filter(creator => !creator.featured) // Don't show featured creator again
              .map(creator => (
                <div key={creator.id} className="group bg-white rounded-xl shadow-md overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-w-3 aspect-h-4 relative overflow-hidden">
                    <img 
                      src={creator.image} 
                      alt={creator.name} 
                      className="w-full h-[300px] object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{creator.name}</h3>
                    <p className="text-clofas-coral mb-3">{creator.role}</p>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {creator.bio}
                    </p>
                    <div className="flex space-x-3">
                      {creator.social.instagram && (
                        <a 
                          href={creator.social.instagram} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-clofas-coral transition-colors"
                          aria-label="Instagram"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      )}
                      {creator.social.twitter && (
                        <a 
                          href={creator.social.twitter} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-clofas-coral transition-colors"
                          aria-label="Twitter"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      )}
                      {creator.social.website && (
                        <a 
                          href={creator.social.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-clofas-coral transition-colors"
                          aria-label="Website"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)} 
        className="py-20 px-4 bg-clofas-dark text-white fade-in-section"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Rejoignez Notre Communauté de Créateurs
          </h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            CLOFAS 241 est toujours à la recherche de nouveaux talents pour enrichir 
            son écosystème créatif. Si vous êtes un designer émergent ou établi, 
            contactez-nous pour explorer les possibilités de collaboration.
          </p>
          <a 
            href="/contact" 
            className="btn-primary"
          >
            Soumettre votre candidature
          </a>
        </div>
      </section>
    </div>
  );
};

export default Creators;
