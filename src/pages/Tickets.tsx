import React, { useState } from 'react';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';

const Tickets: React.FC = () => {
  const [selectedTicketType, setSelectedTicketType] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    ticketType: '',
    quantity: 1
  });

  const ticketTypes = [
    {
      id: 'vip',
      name: 'VIP',
      price: 50000,
      description: 'Accès privilégié avec cocktail de bienvenue',
      features: [
        'Accès prioritaire',
        'Cocktail de bienvenue',
        'Placement en première rangée',
        'Rencontre avec les créateurs',
        'Goodies exclusifs'
      ],
      color: 'gabon-green'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 25000,
      description: 'Accès standard à l\'événement',
      features: [
        'Accès à l\'événement',
        'Placement standard',
        'Boissons incluses',
        'Participation aux remises d\'attestations'
      ],
      color: 'sunset-orange'
    },
    {
      id: 'etudiant',
      name: 'Étudiant',
      price: 15000,
      description: 'Tarif préférentiel pour les étudiants',
      features: [
        'Accès à l\'événement',
        'Placement standard',
        'Tarif préférentiel',
        'Justificatif étudiant requis'
      ],
      color: 'earth-brown'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTicketPurchase = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'achat de ticket
    alert('Fonctionnalité d\'achat en cours de développement');
  };

  const handleStylistApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription styliste
    alert('Fonctionnalité d\'inscription styliste en cours de développement');
  };

  const handleVolunteerApplication = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'inscription bénévole
    alert('Fonctionnalité d\'inscription bénévole en cours de développement');
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden tickets-section section-gabonese">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gabonese-font animate-golden-shimmer">
              🎫 Tickets & Inscription
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto modern-font">
              🌟 <strong>Réservez votre place</strong> pour l'édition 2025 du CLOFAS 241 
              et participez à cette célébration exceptionnelle de la mode gabonaise.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gabon-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>🎫</span>
                <span className="font-semibold">Billetterie en ligne</span>
              </div>
              <div className="flex items-center gap-2 bg-sunset-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>💳</span>
                <span className="font-semibold">Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2 bg-earth-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📱</span>
                <span className="font-semibold">QR Code mobile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Types de tickets */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
              <span className="text-gabon-green">🎫 Types</span> 
              <span className="text-african-gold mx-3">•</span>
              <span className="text-sunset-orange">de Tickets</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg modern-font">
              🎭 <strong>Choisissez l'expérience qui vous correspond</strong> pour vivre cette soirée 
              exceptionnelle dédiée à l'excellence de la mode gabonaise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {ticketTypes.map(ticket => (
              <div key={ticket.id} className={`card-gabonese overflow-hidden hover:shadow-xl transition-all duration-300 ${
                selectedTicketType === ticket.id ? 'ring-2 ring-gabon-green' : ''
              }`}>
                <div className={`h-2 bg-${ticket.color}`}></div>
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 gabonese-font">
                      {ticket.name}
                    </h3>
                    <p className="text-gray-600 mb-4 modern-font">
                      {ticket.description}
                    </p>
                    <div className="text-3xl font-bold text-gabon-green mb-2">
                      {ticket.price.toLocaleString()} FCFA
                    </div>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    {ticket.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <span className="text-gabon-green">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button
                    onClick={() => setSelectedTicketType(ticket.id)}
                    className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                      selectedTicketType === ticket.id
                        ? 'bg-gabon-green text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {selectedTicketType === ticket.id ? 'Sélectionné' : 'Sélectionner'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Formulaire d'achat */}
      {selectedTicketType && (
        <div className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <div className="card-gabonese p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 gabonese-font text-center">
                  <span className="text-gabon-green">💳 Achat</span> 
                  <span className="text-african-gold mx-2">•</span>
                  <span className="text-sunset-orange">de Ticket</span>
                </h3>
                
                <form onSubmit={handleTicketPurchase} className="space-y-6">
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
                        Téléphone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Quantité
                      </label>
                      <select
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-bold text-gray-800 mb-2">Récapitulatif de commande</h4>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">
                        {ticketTypes.find(t => t.id === selectedTicketType)?.name} × {formData.quantity}
                      </span>
                      <span className="font-bold text-gabon-green">
                        {(ticketTypes.find(t => t.id === selectedTicketType)?.price || 0) * formData.quantity} FCFA
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn-african px-8 py-4 rounded-lg text-lg font-bold"
                    >
                      Procéder au paiement
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Inscriptions */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
              <span className="text-gabon-green">📝 Inscriptions</span> 
              <span className="text-african-gold mx-3">•</span>
              <span className="text-sunset-orange">Spéciales</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg modern-font">
              🎨 <strong>Participez activement à l'événement</strong> en tant que styliste, 
              bénévole ou membre de la presse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inscription Styliste */}
            <div className="card-gabonese p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gabon-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">👑</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 gabonese-font">
                  Stylistes
                </h3>
                <p className="text-gray-600 modern-font">
                  Soumettez votre candidature pour participer au défilé
                </p>
              </div>
              
              <form onSubmit={handleStylistApplication} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom du styliste/label *
                  </label>
                  <input
                    type="text"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio/Lien vers vos créations
                  </label>
                  <input
                    type="url"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full btn-african py-3 rounded-lg font-bold"
                >
                  Soumettre candidature
                </button>
              </form>
            </div>

            {/* Inscription Bénévole */}
            <div className="card-gabonese p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-sunset-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 gabonese-font">
                  Bénévoles
                </h3>
                <p className="text-gray-600 modern-font">
                  Rejoignez notre équipe pour faire de cet événement un succès
                </p>
              </div>
              
              <form onSubmit={handleVolunteerApplication} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
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
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Domaine d'intérêt
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gabon-green focus:border-transparent">
                    <option>Accueil</option>
                    <option>Technique</option>
                    <option>Communication</option>
                    <option>Logistique</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full btn-african py-3 rounded-lg font-bold"
                >
                  S'inscrire comme bénévole
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
                <span className="text-gabon-green">❓ FAQ</span>
              </h2>
              <p className="text-gray-600 text-lg modern-font">
                Questions fréquemment posées sur l'événement
              </p>
            </div>

            <div className="space-y-6">
              <div className="card-gabonese p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Où acheter les tickets physiquement ?
                </h3>
                <p className="text-gray-600 modern-font">
                  Les tickets sont disponibles à la vente dans nos points de vente partenaires 
                  et directement sur place le jour de l'événement (dans la limite des places disponibles).
                </p>
              </div>

              <div className="card-gabonese p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Quels sont les avantages VIP ?
                </h3>
                <p className="text-gray-600 modern-font">
                  Les tickets VIP incluent un accès prioritaire, un cocktail de bienvenue, 
                  un placement en première rangée, une rencontre avec les créateurs et des goodies exclusifs.
                </p>
              </div>

              <div className="card-gabonese p-6">
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  Quelle tenue recommandée ?
                </h3>
                <p className="text-gray-600 modern-font">
                  Nous recommandons une tenue élégante qui met en valeur la mode gabonaise. 
                  N'hésitez pas à porter du wax ou des créations locales pour soutenir nos stylistes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
