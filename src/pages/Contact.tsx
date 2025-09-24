import React, { useState } from 'react';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      alert('Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden contact-section section-gabonese">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gabonese-font animate-golden-shimmer">
              📞 Contact
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto modern-font">
              🌟 <strong>Restons en contact</strong> pour toute question sur l'événement, 
              les inscriptions ou pour toute collaboration.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gabon-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📧</span>
                <span className="font-semibold">clofas241@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 bg-sunset-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📱</span>
                <span className="font-semibold">WhatsApp disponible</span>
              </div>
              <div className="flex items-center gap-2 bg-earth-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📍</span>
                <span className="font-semibold">Libreville, Gabon</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulaire de contact et informations */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formulaire de contact */}
            <div className="card-gabonese p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 gabonese-font">
                <span className="text-gabon-green">📝 Envoyez-nous</span> 
                <span className="text-african-gold mx-2">•</span>
                <span className="text-sunset-orange">un Message</span>
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="general">Question générale</option>
                      <option value="tickets">Billetterie</option>
                      <option value="stylist">Inscription styliste</option>
                      <option value="volunteer">Bénévolat</option>
                      <option value="press">Presse</option>
                      <option value="partnership">Partenariat</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                    placeholder="Décrivez votre demande en détail..."
                    required
                  ></textarea>
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-african px-8 py-4 rounded-lg text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </div>
              </form>
            </div>

            {/* Informations de contact */}
            <div className="space-y-8">
              {/* Coordonnées */}
              <div className="card-gabonese p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 gabonese-font">
                  <span className="text-gabon-green">📍 Coordonnées</span>
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gabon-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">📧</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Email</h4>
                      <p className="text-gray-600 modern-font">clofas241@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-sunset-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">📱</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Téléphone / WhatsApp</h4>
                      <p className="text-gray-600 modern-font">+241 XX XX XX XX</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-earth-gradient rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-lg">📍</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-1">Adresse</h4>
                      <p className="text-gray-600 modern-font">Libreville, Gabon</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Réseaux sociaux */}
              <div className="card-gabonese p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 gabonese-font">
                  <span className="text-gabon-green">🌐 Réseaux</span> 
                  <span className="text-african-gold mx-2">•</span>
                  <span className="text-sunset-orange">Sociaux</span>
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <a href="#" className="flex items-center gap-3 p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    <span className="text-xl">📘</span>
                    <span className="font-medium">Facebook</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    <span className="text-xl">📷</span>
                    <span className="font-medium">Instagram</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    <span className="text-xl">🎵</span>
                    <span className="font-medium">TikTok</span>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                    <span className="text-xl">💬</span>
                    <span className="font-medium">WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Horaires */}
              <div className="card-gabonese p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 gabonese-font">
                  <span className="text-gabon-green">🕒 Horaires</span>
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Lundi - Vendredi</span>
                    <span className="text-gray-600">8h00 - 18h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Samedi</span>
                    <span className="text-gray-600">9h00 - 15h00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">Dimanche</span>
                    <span className="text-gray-600">Fermé</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carte Google Maps */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4 gabonese-font">
                <span className="text-gabon-green">🗺️ Localisation</span>
              </h2>
              <p className="text-gray-600 modern-font">
                Trouvez-nous facilement à Libreville
              </p>
            </div>
            
            <div className="card-gabonese p-8">
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gabon-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white text-2xl">📍</span>
                  </div>
                  <p className="text-gray-600 modern-font">Carte Google Maps</p>
                  <p className="text-sm text-gray-500">Libreville, Gabon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Contact */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
              <span className="text-gabon-green">❓ Questions</span> 
              <span className="text-african-gold mx-3">•</span>
              <span className="text-sunset-orange">Fréquentes</span>
            </h2>
            <p className="text-gray-600 text-lg modern-font">
              Trouvez rapidement les réponses à vos questions
            </p>
          </div>

          <div className="space-y-6">
            <div className="card-gabonese p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Combien de temps faut-il pour recevoir une réponse ?
              </h3>
              <p className="text-gray-600 modern-font">
                Nous nous efforçons de répondre à tous les messages dans les 24-48 heures. 
                Pour les questions urgentes, n'hésitez pas à nous contacter par WhatsApp.
              </p>
            </div>

            <div className="card-gabonese p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Puis-je acheter des tickets par téléphone ?
              </h3>
              <p className="text-gray-600 modern-font">
                Oui, vous pouvez nous appeler pour réserver vos tickets. Nous vous enverrons 
                un QR code par WhatsApp pour confirmer votre réservation.
              </p>
            </div>

            <div className="card-gabonese p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                Comment devenir partenaire de l'événement ?
              </h3>
              <p className="text-gray-600 modern-font">
                Nous sommes toujours ouverts aux partenariats. Contactez-nous avec votre 
                proposition et nous étudierons les possibilités de collaboration.
              </p>
            </div>

            <div className="card-gabonese p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-2">
                L'événement est-il accessible aux personnes à mobilité réduite ?
              </h3>
              <p className="text-gray-600 modern-font">
                Oui, le Casino Croisette est entièrement accessible. N'hésitez pas à nous 
                contacter pour toute demande spécifique d'accompagnement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
