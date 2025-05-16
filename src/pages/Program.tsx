import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, ImageIcon } from 'lucide-react';

const Program = () => {
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

  const eventDates = {
    conference: { date: "15 Juin 2025", time: "9:00 - 13:00", location: "Ecole de mode de Nzeng-Ayong, Libreville" },
    workshops: { date: "16-17 Juin 2025", time: "10:00 - 16:00", location: "Ministère de la Culture et des Arts, Libreville" },
    fashion: { date: "18 Juin 2025", time: "19:00 - 22:00", location: "Ministère de la Culture et des Arts, Libreville" }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-clofas-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626222628033-d6bc724600bc?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Programme <span className="text-clofas-gold">CLOFAS 241</span>
          </h1>
          <p className="text-xl max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Découvrez en détail les différents temps forts qui animeront cette édition exceptionnelle
          </p>
        </div>
      </section>

      {/* Overview */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-center mx-auto">Aperçu du Programme</h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
            CLOFAS 241 se déroule en trois volets majeurs, chacun conçu pour mettre en valeur 
            différents aspects de la mode gabonaise
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-clofas-coral">
              <div className="w-16 h-16 bg-clofas-coral/20 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-clofas-coral" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Conférence de Presse</h3>
              <p className="text-gray-600 mb-4">
                Une plateforme de dialogue sur les défis et opportunités du secteur de la mode gabonaise,
                avec des intervenants de premier plan.
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p><strong>Date:</strong> {eventDates.conference.date}</p>
                <p><strong>Horaire:</strong> {eventDates.conference.time}</p>
                <p><strong>Lieu:</strong> {eventDates.conference.location}</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-clofas-gold">
              <div className="w-16 h-16 bg-clofas-gold/20 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-clofas-gold" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Ateliers de Dessin</h3>
              <p className="text-gray-600 mb-4">
                Des sessions interactives avec des designers reconnus pour partager leurs techniques
                et inspirer la prochaine génération de créateurs.
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p><strong>Date:</strong> {eventDates.workshops.date}</p>
                <p><strong>Horaire:</strong> {eventDates.workshops.time}</p>
                <p><strong>Lieu:</strong> {eventDates.workshops.location}</p>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-clofas-lavender">
              <div className="w-16 h-16 bg-clofas-lavender/20 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-clofas-lavender" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Défilé de Mode</h3>
              <p className="text-gray-600 mb-4">
                Le point culminant de l'événement où les créations des stylistes gabonais sont 
                sublimées sur le podium dans un spectacle visuel éblouissant.
              </p>
              <div className="text-sm text-gray-500 space-y-1">
                <p><strong>Date:</strong> {eventDates.fashion.date}</p>
                <p><strong>Horaire:</strong> {eventDates.fashion.time}</p>
                <p><strong>Lieu:</strong> {eventDates.fashion.location}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conference Details */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="py-20 px-4 bg-gray-50 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-clofas-coral/20 text-clofas-coral rounded-full text-sm font-medium mb-4">
                15 Juin 2025
              </span>
              <h2 className="section-title">Conférence de Presse</h2>
              <p className="text-lg mb-6">
                La conférence de presse de CLOFAS 241 réunit experts, journalistes et acteurs 
                clés du secteur pour discuter des enjeux actuels et des perspectives d'avenir 
                de la mode gabonaise.
              </p>
              
              <h3 className="text-xl font-bold mb-3">Points abordés</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <span className="text-clofas-coral mr-2">•</span>
                  <span>État des lieux du secteur de la mode au Gabon</span>
                </li>
                <li className="flex items-start">
                  <span className="text-clofas-coral mr-2">•</span>
                  <span>Stratégies pour promouvoir la consommation locale</span>
                </li>
                <li className="flex items-start">
                  <span className="text-clofas-coral mr-2">•</span>
                  <span>Formation et accompagnement des jeunes talents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-clofas-coral mr-2">•</span>
                  <span>Opportunités d'exportation et visibilité internationale</span>
                </li>
              </ul>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <p className="font-semibold">Informations pratiques :</p>
                <p className="text-sm text-gray-600">
                  {eventDates.conference.date} | {eventDates.conference.time} | {eventDates.conference.location}
                </p>
              </div>
              
              <Link to="/contact" className="btn-primary">
                S'inscrire à la conférence
              </Link>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1507878866276-a947ef722fee?q=80&w=2071" 
                alt="Conférence CLOFAS 241" 
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Workshops Details */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=2069" 
                alt="Ateliers CLOFAS 241" 
                className="rounded-xl shadow-xl"
              />
            </div>
            <div className="order-1 md:order-2">
              <span className="inline-block px-3 py-1 bg-clofas-gold/20 text-clofas-gold rounded-full text-sm font-medium mb-4">
                16-17 Juin 2025
              </span>
              <h2 className="section-title">Ateliers de Dessin</h2>
              <p className="text-lg mb-6">
                Nos ateliers de dessin offrent une occasion unique d'apprendre auprès de 
                designers expérimentés et de développer des compétences pratiques dans 
                diverses techniques de création.
              </p>
              
              <h3 className="text-xl font-bold mb-3">Programme des ateliers</h3>
              <div className="space-y-4 mb-6">
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-bold">Jour 1: Fondamentaux du Dessin de Mode</h4>
                  <p className="text-sm text-gray-600">Techniques de base, anatomie, proportions et rendu des tissus.</p>
                </div>
                <div className="p-4 bg-white rounded-lg shadow-sm">
                  <h4 className="font-bold">Jour 2: Intégration des Motifs Traditionnels</h4>
                  <p className="text-sm text-gray-600">Explorer l'incorporation d'éléments culturels gabonais dans des designs contemporains.</p>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <p className="font-semibold">Informations pratiques :</p>
                <p className="text-sm text-gray-600">
                  {eventDates.workshops.date} | {eventDates.workshops.time} | {eventDates.workshops.location}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Matériel fourni. Places limitées à 30 participants par atelier.
                </p>
              </div>
              
              <Link to="/contact" className="btn-primary">
                S'inscrire aux ateliers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fashion Show Details */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)} 
        className="py-20 px-4 bg-gray-50 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-clofas-lavender/20 text-clofas-lavender rounded-full text-sm font-medium mb-4">
                18 Juin 2025
              </span>
              <h2 className="section-title">Défilé de Mode</h2>
              <p className="text-lg mb-6">
                Point culminant de CLOFAS 241, notre défilé de mode est une célébration 
                spectaculaire des créations uniques des stylistes gabonais et internationaux 
                invités, sublimées par des mannequins professionnels.
              </p>
              
              <h3 className="text-xl font-bold mb-3">Déroulement du défilé</h3>
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-clofas-coral/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-clofas-coral">1</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Avant-première</h4>
                    <p className="text-sm text-gray-600">Présentation exclusive des collections émergentes</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-clofas-gold/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-clofas-gold">2</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Défilé Principal</h4>
                    <p className="text-sm text-gray-600">Présentation des collections de 15 designers établis</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-clofas-lavender/20 rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-clofas-lavender">3</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Collection Spéciale</h4>
                    <p className="text-sm text-gray-600">Finale avec la collection exclusive CLOFAS 241</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <p className="font-semibold">Informations pratiques :</p>
                <p className="text-sm text-gray-600">
                  {eventDates.fashion.date} | {eventDates.fashion.time} | {eventDates.fashion.location}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Tenue élégante exigée. Cocktail VIP après le défilé.
                </p>
              </div>
              
              <Link to="/contact" className="btn-primary">
                Réserver votre place
              </Link>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070" 
                alt="Défilé CLOFAS 241" 
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Calendar */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center mx-auto">Calendrier Complet</h2>
          <p className="text-center mb-12 text-lg">
            Ne manquez aucun moment fort de CLOFAS 241
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1 bg-clofas-coral text-white rounded-lg p-4 text-center">
                  <div className="text-sm">JUIN</div>
                  <div className="text-3xl font-bold">15</div>
                  <div className="text-sm">2025</div>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-xl mb-2">Conférence de Presse</h3>
                  <p className="text-gray-600 mb-2">{eventDates.conference.time} | {eventDates.conference.location}</p>
                  <p className="text-sm">
                    Discussion panel sur l'avenir de la mode gabonaise avec la participation 
                    de designers, entrepreneurs et représentants institutionnels.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1 bg-clofas-gold text-white rounded-lg p-4 text-center">
                  <div className="text-sm">JUIN</div>
                  <div className="text-3xl font-bold">16</div>
                  <div className="text-sm">2025</div>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-xl mb-2">Atelier: Fondamentaux du Dessin</h3>
                  <p className="text-gray-600 mb-2">{eventDates.workshops.time} | {eventDates.workshops.location}</p>
                  <p className="text-sm">
                    Formation intensive sur les techniques de base du dessin de mode.
                    Animation par le designer Alain Mbadinga.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1 bg-clofas-gold text-white rounded-lg p-4 text-center">
                  <div className="text-sm">JUIN</div>
                  <div className="text-3xl font-bold">17</div>
                  <div className="text-sm">2025</div>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-xl mb-2">Atelier: Motifs Traditionnels</h3>
                  <p className="text-gray-600 mb-2">{eventDates.workshops.time} | {eventDates.workshops.location}</p>
                  <p className="text-sm">
                    Exploration des motifs traditionnels gabonais et leur intégration 
                    dans le design contemporain. Animé par la styliste Marie Ntsame.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1 bg-clofas-lavender text-white rounded-lg p-4 text-center">
                  <div className="text-sm">JUIN</div>
                  <div className="text-3xl font-bold">18</div>
                  <div className="text-sm">2025</div>
                </div>
                <div className="md:col-span-3">
                  <h3 className="font-bold text-xl mb-2">Grand Défilé CLOFAS 241</h3>
                  <p className="text-gray-600 mb-2">{eventDates.fashion.time} | {eventDates.fashion.location}</p>
                  <p className="text-sm">
                    Événement principal présentant les collections de 15 designers gabonais 
                    et invités internationaux. Suivi d'un cocktail VIP et d'une vente privée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={(el) => (sectionsRef.current[5] = el)} 
        className="py-20 px-4 bg-clofas-dark text-white fade-in-section"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Réservez Votre Place Dès Maintenant
          </h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Les places pour les ateliers sont limitées et le défilé est l'un des événements 
            les plus attendus de l'année. Assurez-vous de réserver votre place pour ne manquer 
            aucun moment de cette expérience unique.
          </p>
          <Link to="/contact" className="btn-primary">
            S'inscrire aux événements
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Program;
