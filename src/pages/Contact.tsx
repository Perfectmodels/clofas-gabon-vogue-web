
import { useEffect, useRef, useState } from 'react';
import { Calendar, Users, ImageIcon, MapPin, Phone, Mail } from 'lucide-react';
import { AnimatedButton } from '@/components/AnimatedButton';
import ImageUpload from '@/components/ui/image-upload';
import { UploadResult } from '@/services/imgbb-service';

type FormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  interest: string;
  images?: string[]; // URLs des images uploadées
};

const Contact = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    interest: '',
    images: []
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

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

  const handleUploadComplete = (results: UploadResult[]) => {
    const successfulUploads = results.filter(r => r.success && r.url);
    const imageUrls = successfulUploads.map(r => r.url!);
    setUploadedImages(prev => [...prev, ...imageUrls]);
    setFormData(prev => ({ ...prev, images: [...(prev.images || []), ...imageUrls] }));
  };

  const handleUploadError = (error: string) => {
    console.error('Erreur d\'upload:', error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation des champs requis
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim() || !formData.interest) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }
    
    // Validation email basique
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
      return;
    }
    
    // Format WhatsApp message with form data and images
    let message = `Nouveau message CLOFAS 241:\nNom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone || 'Non renseigné'}\nSujet: ${formData.subject}\nIntérêt: ${formData.interest}\nMessage: ${formData.message}`;
    
    if (uploadedImages.length > 0) {
      message += `\n\nImages jointes (${uploadedImages.length}):\n${uploadedImages.join('\n')}`;
    }
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/24177507950?text=${encodeURIComponent(message)}`, '_blank');
    
    // Reset form
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      interest: '',
      images: []
    });
    setUploadedImages([]);
    // Reset status after 3 seconds
    setTimeout(() => setSubmitStatus('idle'), 3000);
  };

  // Function to generate WhatsApp link with prefilled message
  const generateWhatsAppLink = (eventName: string) => {
    const message = `Bonjour, je souhaite m'inscrire à l'événement: ${eventName}`;
    return `https://wa.me/24177507950?text=${encodeURIComponent(message)}`;
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
                    <Phone className="w-6 h-6 text-clofas-coral" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                    <p className="text-gray-600">
                      (+241) 66 66 89 00
                    </p>
                    <p className="text-gray-600">
                      WhatsApp: (+241) 77 50 79 50
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-clofas-gold/10 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <Mail className="w-6 h-6 text-clofas-gold" />
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
                    <MapPin className="w-6 h-6 text-clofas-lavender" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Lieu de l'événement</h3>
                    <p className="text-gray-600">
                      Ministère de la Culture et des Arts<br />
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
                Vous recevrez une réponse immédiate par WhatsApp.
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

                {/* Upload d'images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Images (optionnel)
                  </label>
                  <ImageUpload
                    onUploadComplete={handleUploadComplete}
                    onUploadError={handleUploadError}
                    multiple={true}
                    maxFiles={50}
                    maxSize={32} // 32MB par image
                    showPreview={true}
                    showProgress={true}
                    unlimited={true}
                    className="border border-gray-300 rounded-lg p-4"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Vous pouvez joindre un nombre illimité d'images (max 32MB chacune)
                  </p>
                </div>
                
                <div>
                  <AnimatedButton 
                    type="submit"
                    className="w-full flex justify-center items-center"
                    variant="whatsapp"
                    animationType="scale"
                    disabled={submitStatus === 'success'}
                  >
                    {submitStatus === 'idle' && 'Envoyer le message sur WhatsApp'}
                    {submitStatus === 'success' && (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Message envoyé !
                      </>
                    )}
                    {submitStatus === 'error' && (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Erreur de validation
                      </>
                    )}
                  </AnimatedButton>
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
                inscrivant à l'avance via WhatsApp. Les places sont limitées, particulièrement pour 
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
                  <AnimatedButton 
                    variant="whatsapp"
                    animationType="scale"
                    size="sm"
                    className="text-sm"
                    onClick={() => window.open(generateWhatsAppLink('Conférence de Presse'), '_blank')}
                  >
                    S'inscrire par WhatsApp
                  </AnimatedButton>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-clofas-gold/10 rounded-full flex items-center justify-center mr-3">
                      <Users className="w-5 h-5 text-clofas-gold" />
                    </div>
                    <h3 className="font-bold">Ateliers de Dessin</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">16-17 Juin 2025 | 25,000 FCFA par atelier</p>
                  <AnimatedButton 
                    variant="whatsapp"
                    animationType="scale"
                    size="sm"
                    className="text-sm"
                    onClick={() => window.open(generateWhatsAppLink('Ateliers de Dessin'), '_blank')}
                  >
                    S'inscrire par WhatsApp
                  </AnimatedButton>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-clofas-lavender/10 rounded-full flex items-center justify-center mr-3">
                      <ImageIcon className="w-5 h-5 text-clofas-lavender" />
                    </div>
                    <h3 className="font-bold">Défilé de Mode</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">18 Juin 2025 | À partir de 50,000 FCFA</p>
                  <AnimatedButton 
                    variant="whatsapp"
                    animationType="scale"
                    size="sm"
                    className="text-sm" 
                    onClick={() => window.open(generateWhatsAppLink('Défilé de Mode'), '_blank')}
                  >
                    Réserver par WhatsApp
                  </AnimatedButton>
                </div>
              </div>
              
              <div className="bg-clofas-dark text-white p-6 rounded-xl">
                <p className="font-medium">
                  Pour toute demande concernant les inscriptions aux événements ou les 
                  tarifs de groupe, contactez-nous directement par WhatsApp au 
                  <a href="https://wa.me/24177507950" target="_blank" rel="noopener noreferrer" className="text-clofas-coral ml-1">
                    +241 77 50 79 50
                  </a>.
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
                Les événements se déroulent au Ministère de la Culture et des Arts à Libreville, Gabon. Les adresses 
                exactes vous seront communiquées après inscription via WhatsApp.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-bold text-lg mb-2">Comment s'inscrire aux ateliers de dessin ?</h3>
              <p className="text-gray-600">
                Vous pouvez vous inscrire en utilisant les boutons WhatsApp sur cette page, en
                indiquant votre intérêt pour les ateliers, ou en nous contactant directement au
                <a href="https://wa.me/24177507950" target="_blank" rel="noopener noreferrer" className="text-clofas-coral ml-1">
                  +241 77 50 79 50
                </a>. Les places étant limitées, nous vous recommandons de vous inscrire au plus tôt.
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
                Contactez-nous par WhatsApp pour recevoir le dossier de candidature complet.
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
              href="https://wa.me/24177507950" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-clofas-coral transition-colors"
              aria-label="WhatsApp"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
