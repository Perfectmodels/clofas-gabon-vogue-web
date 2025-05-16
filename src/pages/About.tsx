
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      // Fade-in animation for sections as they enter viewport
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
    
    // Initial check for elements already in viewport
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-clofas-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://i.ibb.co/NdQkZnTt/DSC-0518.jpg')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            À propos de <span className="text-clofas-coral">CLOFAS 241</span>
          </h1>
          <p className="text-xl max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Découvrez l'histoire, la mission et la vision qui animent notre événement dédié à la mode gabonaise.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title">Notre Mission</h2>
              <p className="text-lg mb-6">
                CLOFAS 241 a été fondé avec une mission claire : promouvoir la consommation locale 
                dans le secteur de la mode au Gabon. Nous œuvrons pour valoriser la créativité nationale, 
                encourager le soutien aux créateurs locaux, et éveiller la fierté culturelle à travers la mode.
              </p>
              <p className="text-lg">
                Chaque édition de CLOFAS 241 est une célébration vibrante du talent gabonais et une 
                plateforme pour mettre en lumière le potentiel immense de notre industrie de la mode locale.
              </p>
            </div>
            <div>
              <img 
                src="https://i.ibb.co/Y6hX3Yf/DSC-0414.jpg" 
                alt="CLOFAS 241 Mission" 
                className="rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="py-20 px-4 bg-gray-50 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="relative">
                <img 
                  src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEifRAwNB-vU6CpmHw1NN8uQsRRfz8jU7c887kpR3VYiVUeXtTSBNrP-GUBIwcAgN7UO-ZOLwwxpk_6z1zJj4rzulYjPJ0F1lpcd3Ebc87_RRGXbTZ1aRdu-nZ-GoDH-6sJd2Fc54Yuia6e7/s1600/beitch-faro.jpg" 
                  alt="Beitch Faro - Fondatrice" 
                  className="rounded-xl shadow-xl relative z-10"
                />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-clofas-gold rounded-xl -z-0"></div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="section-title">Notre Fondatrice</h2>
              <h3 className="text-2xl font-playfair font-bold mb-4">Beitch Faro</h3>
              <p className="text-lg mb-6">
                Styliste gabonaise visionnaire, Beitch Faro a créé CLOFAS 241 en réponse à un besoin 
                essentiel de valoriser et promouvoir le talent local dans l'industrie de la mode gabonaise.
              </p>
              <blockquote className="border-l-4 border-clofas-coral pl-4 italic mb-6">
                "CLOFAS 241 est né de la volonté de mettre en lumière les talents extraordinaires 
                qui font vibrer la mode gabonaise et africaine, et d'encourager chaque citoyen à devenir ambassadeur 
                de notre créativité locale."
              </blockquote>
              <p className="text-lg">
                Sa passion pour la mode et son engagement pour le développement économique du Gabon 
                sont les moteurs qui propulsent CLOFAS 241 vers l'excellence et l'innovation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Histoire */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center mx-auto">Notre Histoire</h2>
          <p className="text-center mb-12 text-lg">
            Le parcours de CLOFAS 241 depuis sa création jusqu'à aujourd'hui
          </p>
          
          <div className="space-y-12">
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-12 before:h-full before:px-px before:bg-clofas-coral sm:before:ml-0 before:ml-2 before:top-6 before:bottom-0">
                <div className="absolute left-0 sm:left-0 top-6">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-clofas-coral border-4 border-white shadow"></div>
                </div>
                <div className="sm:absolute left-0 top-6 sm:ml-18 mb-3 sm:mb-0">
                  <div className="font-bold text-clofas-coral">2024 </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Naissance de CLOFAS 241</h3>
                  <p className="text-gray-600">
                    Lancement de la première édition de CLOFAS 241 avec une conférence de presse 
                    qui a réuni les acteurs majeurs du secteur de la mode gabonaise.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-12 before:h-full before:px-px before:bg-clofas-coral sm:before:ml-0 before:ml-2 before:top-6 before:bottom-0">
                <div className="absolute left-0 sm:left-0 top-6">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-clofas-coral border-4 border-white shadow"></div>
                </div>
                <div className="sm:absolute left-0 top-6 sm:ml-18 mb-3 sm:mb-0">
                  <div className="font-bold text-clofas-coral">2024</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Expansion & Reconnaissance</h3>
                  <p className="text-gray-600">
                    CLOFAS 241 s'agrandit avec l'ajout des ateliers de dessin et le premier défilé 
                    qui a connu un succès retentissant, attirant l'attention des médias nationaux.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-12 before:h-full before:px-px before:bg-clofas-coral sm:before:ml-0 before:ml-2 before:top-6 before:bottom-0">
                <div className="absolute left-0 sm:left-0 top-6">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-clofas-coral border-4 border-white shadow"></div>
                </div>
                <div className="sm:absolute left-0 top-6 sm:ml-18 mb-3 sm:mb-0">
                  <div className="font-bold text-clofas-coral">2024</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Partenariats Internationaux</h3>
                  <p className="text-gray-600">
                    Établissement de partenariats stratégiques avec l'ecole de mode de Nzeng-Ayong et des 
                    designers internationaux, apportant une dimension globale à notre événement local.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative pl-8 sm:pl-32 py-6 group">
              <div className="flex flex-col sm:flex-row items-start mb-1">
                <div className="absolute left-0 sm:left-0 top-6">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-clofas-gold border-4 border-white shadow"></div>
                </div>
                <div className="sm:absolute left-0 top-6 sm:ml-18 mb-3 sm:mb-0">
                  <div className="font-bold text-clofas-gold">2025</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Edition Actuelle</h3>
                  <p className="text-gray-600">
                    CLOFAS 241 2025 s'annonce comme l'édition la plus ambitieuse à ce jour, 
                    avec un programme enrichi et une portée élargie pour célébrer l'excellence 
                    de la mode gabonaise.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)} 
        className="py-20 px-4 bg-clofas-dark text-white fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="font-playfair text-4xl font-bold mb-14 text-center">Nos Valeurs</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-20 h-20 bg-clofas-coral/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-clofas-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Excellence Créative</h3>
              <p className="text-gray-300">
                Nous valorisons l'innovation, l'originalité et la qualité dans chaque création, 
                poussant les limites de l'expression artistique dans la mode.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-clofas-gold/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-clofas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Identité Culturelle</h3>
              <p className="text-gray-300">
                Nous célébrons et préservons le patrimoine culturel gabonais à travers la mode, 
                en intégrant nos traditions dans une vision contemporaine et globale.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-clofas-lavender/30 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-clofas-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Économie Locale</h3>
              <p className="text-gray-300">
                Nous soutenons activement le développement économique du Gabon en promouvant 
                la consommation locale et en créant des opportunités pour les entrepreneurs du secteur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={(el) => (sectionsRef.current[4] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Participez à la Révolution de la Mode Gabonaise
          </h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Joignez-vous à nous pour célébrer et promouvoir la créativité, le talent et 
            l'innovation qui caractérisent la mode gabonaise. Ensemble, façonnons l'avenir 
            de notre industrie.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="btn-primary">
              Devenir partenaire
            </Link>
            <Link to="/program" className="btn-secondary">
              Consulter le programme
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
