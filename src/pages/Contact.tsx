
import { useEffect, useRef, useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  interest: string;
};

const Contact = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the form data to a server here
    console.log("Form submitted:", formData);
    // Simulate API call
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        interest: ''
      });
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-clofas-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2074')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Contactez <span className="text-clofas-coral">CLOFAS 241</span>
          </h1>
          <p className="text-xl max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Posez vos questions, inscrivez-vous aux événements ou proposez un partenariat
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="section-title">Contactez-nous</h2>
              <p className="text-lg mb-8">
                Vous avez des questions concernant CLOFAS 241 ? Vous souhaitez participer 
                à l'un de nos événements ou explorer des opportunités de partenariat ? 
                N'hésitez pas à nous contacter.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-clofas-coral/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <svg className="w-6 h-6 text-clofas-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      (+241) 077 123 456
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-clofas-gold/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <svg className="w-6 h-6 text-clofas-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-600">
                      contact@clofas241.ga
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-clofas-lavender/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <svg className="w-6 h-6 text-clofas-lavender" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      Rue de la Mode<br />
                      BP 1234, Libreville<br />
                      Gabon
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl">
                <h3 className="font-bold text-lg mb-4">Heures d'ouverture</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Lundi - Vendredi:</span>
                    <span className="font-medium">09:00 - 17:00</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Samedi:</span>
                    <span className="font-medium">10:00 - 14:00</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-gray-600">Dimanche:</span>
                    <span className="font-medium">Fermé</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div>
              <h2 className="section-title">Formulaire de Contact</h2>
              <p className="text-lg mb-8">
                Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                    <input 
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clofas-coral"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input 
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clofas-coral"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
                    <input 
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clofas-coral"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                    <input 
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clofas-coral"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">Je suis intéressé(e) par *</label>
                  <select 
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clofas-coral"
                  >
                    <option value="">Sélectionnez une option</option>
                    <option value="conference">Conférence de Presse</option>
                    <option value="workshops">Ateliers de Dessin</option>
                    <option value="fashion-show">Défilé de Mode</option>
                    <option value="partnership">Partenariat</option>
                    <option value="press">Presse et Médias</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea 
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-clofas-coral"
                  ></textarea>
                </div>
                
                <div>
                  <button 
                    type="submit"
                    className="btn-primary w-full flex justify-center items-center"
                    disabled={submitStatus === 'success'}
                  >
                    {submitStatus === 'idle' && 'Envoyer le message'}
                    {submitStatus === 'success' && (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Message envoyé !
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="py-20 px-4 bg-gray-50 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?q=80&w=2069" 
                alt="Inscription CLOFAS 241" 
                className="rounded-xl shadow-xl"
              />
            </div>
            <div>
              <h2 className="section-title">Inscrivez-vous aux Événements</h2>
              <p className="text-lg mb-6">
                Assurez votre place aux différents événements de CLOFAS 241 en vous 
                inscrivant à l'avance. Les places sont limitées, particulièrement pour 
                les ateliers et le défilé de mode.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-clofas-coral/10 rounded-full flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-clofas-coral" />
                    </div>
                    <h3 className="font-bold">Conférence de Presse</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">15 Juin 2025 | Entrée gratuite sur inscription</p>
                  <a 
                    href="#conference"
                    className="text-sm font-medium text-clofas-coral hover:underline"
                  >
                    S'inscrire &rarr;
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-clofas-gold/10 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-clofas-gold" />
                    </div>
                    <h3 className="font-bold">Ateliers de Dessin</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">16-17 Juin 2025 | 25,000 FCFA par atelier</p>
                  <a 
                    href="#ateliers"
                    className="text-sm font-medium text-clofas-coral hover:underline"
                  >
                    S'inscrire &rarr;
                  </a>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-clofas-lavender/10 rounded-full flex items-center justify-center mr-3">
                      <Image className="w-5 h-5 text-clofas-lavender" />
                    </div>
                    <h3 className="font-bold">Défilé de Mode</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">18 Juin 2025 | À partir de 50,000 FCFA</p>
                  <a 
                    href="#defile"
                    className="text-sm font-medium text-clofas-coral hover:underline"
                  >
                    Réserver votre place &rarr;
                  </a>
                </div>
              </div>
              
              <div className="bg-clofas-dark text-white p-6 rounded-xl">
                <p className="font-medium">
                  Pour toute demande concernant les inscriptions aux événements ou les 
                  tarifs de groupe, contactez-nous directement par téléphone ou email.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center mx-auto">Questions Fréquentes</h2>
          <p className="text-center max-w-3xl mx-auto mb-12 text-lg">
            Trouvez rapidement des réponses aux questions les plus courantes
          </p>
          
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Où se déroulent les événements de CLOFAS 241 ?</h3>
              <p className="text-gray-600">
                Les événements se déroulent dans différents lieux à Libreville. La conférence de presse 
                a lieu à l'Hôtel Radisson Blu, les ateliers au Centre Culturel Français, et le défilé 
                de mode au Palais des Congrès. Les adresses exactes vous seront communiquées après inscription.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Comment s'inscrire aux ateliers de dessin ?</h3>
              <p className="text-gray-600">
                Vous pouvez vous inscrire en remplissant le formulaire de contact sur cette page en 
                indiquant votre intérêt pour les ateliers, ou en nous contactant directement par email 
                ou téléphone. Les places étant limitées, nous vous recommandons de vous inscrire au plus tôt.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Est-il possible d'assister à tous les événements ?</h3>
              <p className="text-gray-600">
                Absolument ! Nous proposons un pass complet qui vous donne accès à l'ensemble des 
                événements de CLOFAS 241. C'est la meilleure option pour vivre pleinement l'expérience 
                et bénéficier d'un tarif préférentiel.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Comment devenir exposant ou créateur participant ?</h3>
              <p className="text-gray-600">
                Les créateurs intéressés à présenter leurs collections lors du défilé ou à exposer 
                leurs créations doivent soumettre leur candidature avant le 31 janvier 2025. 
                Contactez-nous pour recevoir le dossier de candidature complet.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Y a-t-il un code vestimentaire pour les événements ?</h3>
              <p className="text-gray-600">
                La conférence de presse et les ateliers ne requièrent pas de tenue particulière, 
                bien que nous encouragions l'élégance décontractée. Pour le défilé de mode, une 
                tenue élégante est demandée, surtout pour les places VIP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)} 
        className="py-20 px-4 bg-clofas-dark text-white fade-in-section"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">
            Suivez-nous sur les Réseaux Sociaux
          </h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Restez informé(e) des dernières actualités, des coulisses et des annonces 
            concernant CLOFAS 241 en nous suivant sur les réseaux sociaux.
          </p>
          <div className="flex justify-center space-x-8">
            <a 
              href="https://instagram.com/clofas241" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-clofas-coral transition-colors"
              aria-label="Instagram"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a 
              href="https://facebook.com/clofas241" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-clofas-coral transition-colors"
              aria-label="Facebook"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
              </svg>
            </a>
            <a 
              href="https://twitter.com/clofas241" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-clofas-coral transition-colors"
              aria-label="Twitter"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a 
              href="https://youtube.com/clofas241" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-clofas-coral transition-colors"
              aria-label="YouTube"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
