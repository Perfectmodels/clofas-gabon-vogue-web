
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, ImageIcon, ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Home = () => {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeSection, setActiveSection] = useState(0);
  const [subscribeEmail, setSubscribeEmail] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrollPosition = window.scrollY;
        parallaxRef.current.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }
      
      // Fade-in animation for sections as they enter viewport
      sectionsRef.current.forEach((section, index) => {
        if (!section) return;
        
        const rect = section.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom >= 0;
        
        if (isVisible) {
          section.classList.add('is-visible');
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initial check for elements already in viewport
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer votre adresse email pour vous abonner.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Merci pour votre abonnement!",
      description: "Vous recevrez désormais nos actualités.",
    });
    
    setSubscribeEmail('');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const scrollToNextSection = () => {
    const nextSection = sectionsRef.current[activeSection + 1];
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          ref={parallaxRef}
          className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"
        ></div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1605289355680-75fb41239154?q=80&w=1974')] bg-cover bg-center"
          ref={parallaxRef}
        ></div>
        <div className="relative z-20 text-center px-4 text-white">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            CLOFAS <span className="text-clofas-gold">241</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 font-light animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Célébrer et promouvoir la mode gabonaise à travers l'élégance, la créativité et le savoir-faire local
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 animate-slide-up" style={{ animationDelay: '0.6s' }}>
            <Button 
              className="btn-primary"
              onClick={() => handleNavigate('/about')}
            >
              Découvrir l'événement
            </Button>
            <Button 
              className="btn-secondary"
              onClick={() => handleNavigate('/contact')}
            >
              S'inscrire
            </Button>
          </div>
          
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
            <Button 
              variant="ghost" 
              className="text-white rounded-full p-2" 
              onClick={scrollToNextSection}
            >
              <ChevronDown />
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">CLOFAS 241</h2>
              <p className="text-lg mb-6">
                CLOFAS 241 est un événement incontournable initié par la styliste gabonaise Beitch Faro, 
                dédié à la promotion de la <span className="highlight-text font-semibold">consommation locale</span> dans 
                le secteur de la mode au Gabon.
              </p>
              <p className="text-lg mb-6">
                Notre mission est de valoriser la créativité nationale, d'encourager le soutien aux créateurs locaux, 
                et d'éveiller la fierté culturelle à travers la mode.
              </p>
              <Button 
                className="font-medium text-clofas-coral hover:underline"
                variant="link"
                onClick={() => handleNavigate('/about')}
              >
                En savoir plus <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="bg-clofas-gold/10 p-8 rounded-xl hover:shadow-lg transition-shadow duration-300">
              <blockquote className="text-xl font-playfair italic text-clofas-dark">
                "CLOFAS 241 est né de la volonté de mettre en lumière les talents extraordinaires 
                qui font vibrer la mode gabonaise, et d'encourager chaque citoyen à devenir ambassadeur 
                de notre créativité nationale."
                <footer className="mt-4 text-right font-normal text-base">
                  — <cite>Beitch Faro, Fondatrice</cite>
                </footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Program Highlights */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="py-20 px-4 bg-gray-50 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-center mx-auto">Notre Programme</h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
            Découvrez les moments forts qui rythmeront cet événement exceptionnel
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('/program')}>
              <div className="w-16 h-16 bg-clofas-coral/20 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-8 h-8 text-clofas-coral" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Conférence de Presse</h3>
              <p className="text-gray-600">
                Une plateforme de dialogue sur les défis et opportunités du secteur de la mode gabonaise,
                avec des intervenants de premier plan.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('/program')}>
              <div className="w-16 h-16 bg-clofas-gold/20 rounded-full flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-clofas-gold" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Ateliers de Dessin</h3>
              <p className="text-gray-600">
                Des sessions interactives avec des designers reconnus pour partager leurs techniques
                et inspirer la prochaine génération de créateurs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow cursor-pointer" onClick={() => handleNavigate('/program')}>
              <div className="w-16 h-16 bg-clofas-lavender/20 rounded-full flex items-center justify-center mb-6">
                <ImageIcon className="w-8 h-8 text-clofas-lavender" />
              </div>
              <h3 className="font-playfair text-xl font-bold mb-4">Défilé de Mode</h3>
              <p className="text-gray-600">
                Le point culminant de l'événement où les créations des stylistes gabonais sont 
                sublimées sur le podium dans un spectacle visuel éblouissant.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="btn-primary"
              onClick={() => handleNavigate('/program')}
            >
              Voir le programme complet
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Creators */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <h2 className="section-title text-center mx-auto">Créateurs à l'Honneur</h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
            Découvrez quelques-uns des talents exceptionnels qui participent à CLOFAS 241
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-xl cursor-pointer"
                onClick={() => handleNavigate('/creators')}
              >
                <div className="aspect-w-1 aspect-h-1">
                  <img 
                    src={`https://source.unsplash.com/random/600x800?fashion,designer&sig=${index}`} 
                    alt={`Créateur ${index}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 transition-opacity group-hover:opacity-90"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="font-playfair text-xl font-bold">Créateur {index}</h3>
                  <p className="font-light opacity-80">Fashion Designer</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button 
              className="btn-primary"
              onClick={() => handleNavigate('/creators')}
            >
              Voir tous les créateurs
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)} 
        className="py-20 px-4 bg-clofas-dark text-white fade-in-section"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6">
            Rejoignez l'Aventure CLOFAS <span className="text-clofas-gold">241</span>
          </h2>
          <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-3xl mx-auto">
            Que vous soyez créateur, passionné de mode ou simple curieux, 
            CLOFAS 241 vous invite à participer à cette célébration unique 
            de la mode gabonaise.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="flex-grow px-4 py-3 rounded-md text-gray-800"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
              />
              <Button type="submit" className="btn-primary whitespace-nowrap">
                S'abonner
              </Button>
            </div>
          </form>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button 
              className="btn-primary"
              onClick={() => handleNavigate('/contact')}
            >
              S'inscrire maintenant
            </Button>
            <Button 
              className="bg-white text-clofas-dark hover:bg-gray-100"
              onClick={() => handleNavigate('/program')}
            >
              Consulter le programme
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
