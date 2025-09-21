
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type Partner = {
  id: number;
  name: string;
  description: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver' | 'institutional';
  website?: string;
};

const Partners = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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

  // Mock partner data
 const partners: Partner[] = [
  {
    id: 1,
    name: "Groupes Ceca Gadis",
    description: "Groupe leader dans la distribution au Gabon, partenaire majeur de CLOFAS 241.",
    logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    tier: "platinum",
    website: "https://cecagadis.ga"
  },
  {
    id: 2,
    name: "Perfect Models Management",
    description: "Agence de mannequins et organisation de référence au Gabon et en Afrique centrale.",
    logo: "https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    tier: "gold",
    website: "https://perfectmodels.ga"
  },
  {
    id: 3,
    name: "Ecole de Mode Nzeng-Ayong",
    description: "Centre de formation de référence pour la mode et le stylisme à Libreville.",
    logo: "https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    tier: "gold",
    website: "https://nzeng-ayong.ga"
  },
  {
    id: 4,
    name: "Hotel Le Cristal",
    description: "Hôtel haut de gamme, hébergement officiel des invités de CLOFAS 241.",
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    tier: "silver",
    website: "https://lecristal.ga"
  },
  {
    id: 5,
    name: "Ministère de la Culture et des Arts",
    description: "Institution officielle soutenant le rayonnement culturel et artistique du Gabon.",
    logo: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3",
    tier: "institutional",
    website: "https://culture.gouv.ga"
  }
];

  const platinumPartners = partners.filter(p => p.tier === 'platinum');
  const goldPartners = partners.filter(p => p.tier === 'gold');
  const silverPartners = partners.filter(p => p.tier === 'silver');
  const institutionalPartners = partners.filter(p => p.tier === 'institutional');

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-clofas-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Nos <span className="text-clofas-gold">Partenaires</span>
          </h1>
          <p className="text-xl max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Découvrez les organisations qui rendent possible CLOFAS 241 et soutiennent
            la promotion de la mode gabonaise
          </p>
        </div>
      </section>

      {/* Platinum Partners */}
      {platinumPartners.length > 0 && (
        <section 
          ref={(el) => (sectionsRef.current[0] = el)} 
          className="py-20 px-4 fade-in-section"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="section-title text-center mx-auto">Partenaires Platine</h2>
            <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
              Nos partenaires principaux qui font de CLOFAS 241 une réalité
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {platinumPartners.map(partner => (
                <div key={partner.id} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-clofas-gold">
                  <div className="mb-6 flex justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`} 
                      className="h-24 w-auto"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4">{partner.name}</h3>
                  <p className="text-gray-600 text-center mb-6">{partner.description}</p>
                  {partner.website && (
                    <div className="text-center">
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-clofas-coral hover:underline"
                      >
                        Visiter le site web
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gold Partners */}
      {goldPartners.length > 0 && (
        <section 
          ref={(el) => (sectionsRef.current[1] = el)} 
          className="py-20 px-4 bg-gray-50 fade-in-section"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="section-title text-center mx-auto">Partenaires Or</h2>
            <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
              Sponsors majeurs contribuant au succès de notre événement
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {goldPartners.map(partner => (
                <div key={partner.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`} 
                      className="h-16 w-auto"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-3">{partner.name}</h3>
                  <p className="text-gray-600 text-center text-sm mb-4">{partner.description}</p>
                  {partner.website && (
                    <div className="text-center">
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-clofas-coral hover:underline"
                      >
                        Visiter le site web
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Silver Partners */}
      {silverPartners.length > 0 && (
        <section 
          ref={(el) => (sectionsRef.current[2] = el)} 
          className="py-20 px-4 fade-in-section"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="section-title text-center mx-auto">Partenaires Argent</h2>
            <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
              Sponsors contributeurs apportant leur soutien à CLOFAS 241
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {silverPartners.map(partner => (
                <div key={partner.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-3 flex justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`} 
                      className="h-12 w-auto"
                    />
                  </div>
                  <h3 className="text-base font-bold text-center mb-2">{partner.name}</h3>
                  <p className="text-gray-600 text-center text-xs mb-3">{partner.description}</p>
                  {partner.website && (
                    <div className="text-center">
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-clofas-coral hover:underline"
                      >
                        Visiter le site web
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Institutional Partners */}
      {institutionalPartners.length > 0 && (
        <section 
          ref={(el) => (sectionsRef.current[3] = el)} 
          className="py-20 px-4 bg-gray-50 fade-in-section"
        >
          <div className="container mx-auto max-w-6xl">
            <h2 className="section-title text-center mx-auto">Partenaires Institutionnels</h2>
            <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
              Institutions publiques et associations qui soutiennent notre mission
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {institutionalPartners.map(partner => (
                <div key={partner.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="mb-4 flex justify-center">
                    <img 
                      src={partner.logo} 
                      alt={`Logo ${partner.name}`} 
                      className="h-16 w-auto"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-3">{partner.name}</h3>
                  <p className="text-gray-600 text-center text-sm mb-4">{partner.description}</p>
                  {partner.website && (
                    <div className="text-center">
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-clofas-coral hover:underline"
                      >
                        Visiter le site web
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Becoming a Partner */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)} 
        className="py-20 px-4 bg-clofas-dark text-white fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
                Devenez Partenaire de CLOFAS <span className="text-clofas-gold">241</span>
              </h2>
              <p className="text-lg mb-6">
                Rejoignez notre réseau de partenaires et contribuez au développement 
                de la mode gabonaise tout en bénéficiant d'une visibilité auprès d'un 
                public engagé et passionné.
              </p>
              <h3 className="text-xl font-bold mb-4">Avantages</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <span className="text-clofas-gold mr-2">•</span>
                  <span>Visibilité sur tous nos supports de communication</span>
                </li>
                <li className="flex items-start">
                  <span className="text-clofas-gold mr-2">•</span>
                  <span>Accès VIP aux événements CLOFAS 241</span>
                </li>
                <li className="flex items-start">
                  <span className="text-clofas-gold mr-2">•</span>
                  <span>Opportunités de networking avec les acteurs clés du secteur</span>
                </li>
                <li className="flex items-start">
                  <span className="text-clofas-gold mr-2">•</span>
                  <span>Association à un événement culturel majeur au Gabon</span>
                </li>
              </ul>
              <Link to="/contact" className="btn-primary">
                Demander notre dossier de partenariat
              </Link>
            </div>
            <div className="bg-clofas-dark/50 p-8 rounded-xl">
              <h3 className="text-xl font-bold mb-6 text-center">Nos Niveaux de Partenariat</h3>
              <div className="space-y-6">
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-clofas-gold/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-clofas-gold font-bold text-lg">P</span>
                    </div>
                    <h4 className="text-lg font-bold">Partenaire Platine</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Visibilité maximale, présence de votre logo sur tous les supports, 
                    prise de parole lors des événements, et bien plus.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-clofas-gold/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-clofas-gold font-bold text-lg">O</span>
                    </div>
                    <h4 className="text-lg font-bold">Partenaire Or</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Forte présence sur le site et les supports de communication, 
                    invitations VIP aux événements, possibilité de distribuer du matériel promotionnel.
                  </p>
                </div>
                <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-clofas-gold/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-clofas-gold font-bold text-lg">A</span>
                    </div>
                    <h4 className="text-lg font-bold">Partenaire Argent</h4>
                  </div>
                  <p className="text-gray-300 text-sm">
                    Visibilité de votre logo sur le site et certains supports, 
                    invitations aux événements principaux.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;
