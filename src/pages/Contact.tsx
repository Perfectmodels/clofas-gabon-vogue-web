
import React, { useState } from 'react';

// Enum pour gérer les différents états de la soumission du formulaire
enum FormStatus {
  IDLE,      // Le formulaire est prêt
  LOADING,   // Envoi en cours
  SUCCESS,   // Message envoyé avec succès
  ERROR,     // Une erreur s'est produite
}

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<FormStatus>(FormStatus.IDLE);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus(FormStatus.LOADING);

    const formData = new FormData(event.currentTarget);
    const formProps = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formProps),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      
      setFormStatus(FormStatus.SUCCESS);

    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setFormStatus(FormStatus.ERROR);
    }
  };

  // Si le message a été envoyé avec succès
  if (formStatus === FormStatus.SUCCESS) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center pt-16 px-4">
        <div className="max-w-lg">
          <h1 className="text-4xl font-bold text-purple-700 mb-4">Message envoyé !</h1>
          <p className="text-lg text-gray-700">Merci pour votre message. Nous reviendrons vers vous dans les plus brefs délais.</p>
          <button onClick={() => setFormStatus(FormStatus.IDLE)} className="mt-8 px-6 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors">
            Envoyer un autre message
          </button>
        </div>
      </div>
    );
  }

  // Affichage du formulaire principal
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="text-center px-4 pb-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-4">Contactez-nous</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">Une question, une proposition de partenariat ou besoin d'informations ? N'hésitez pas à nous laisser un message.</p>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Envoyer un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Message d'erreur global */}
                {formStatus === FormStatus.ERROR && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
                        <strong className="font-bold">Erreur !</strong>
                        <span className="block sm:inline"> Une erreur s'est produite. Veuillez réessayer plus tard.</span>
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nom complet *</label>
                    <input id="name" type="text" name="name" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Adresse Email *</label>
                    <input id="email" type="email" name="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" required />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Sujet *</label>
                  <select id="subject" name="subject" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" required defaultValue="">
                    <option value="" disabled>Sélectionnez un sujet</option>
                    <option value="Question générale">Question générale</option>
                    <option value="Billetterie">Billetterie</option>
                    <option value="Inscription styliste">Inscription styliste</option>
                    <option value="Partenariat">Partenariat</option>
                    <option value="Presse">Presse</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
                  <textarea id="message" name="message" rows={5} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500" required></textarea>
                </div>

                <div className="text-right">
                  <button type="submit" disabled={formStatus === FormStatus.LOADING} className="px-8 py-3 bg-purple-600 text-white font-bold rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-wait">
                    {formStatus === FormStatus.LOADING ? 'Envoi en cours...' : 'Envoyer le message'}
                  </button>
                </div>
              </form>
            </div>

            {/* ... Coordonnées (inchangées) ... */}
             <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Coordonnées</h3>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                                <i className="fas fa-envelope-open-text text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-bold">Email</h4>
                                <a href="mailto:contact@clofas241.online" className="text-purple-600 hover:underline">contact@clofas241.online</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                             <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                                <i className="fab fa-whatsapp text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-bold">WhatsApp</h4>
                                <p className="text-gray-600">+241 XX XX XX XX</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                                <i className="fas fa-map-marker-alt text-xl"></i>
                            </div>
                            <div>
                                <h4 className="font-bold">Adresse</h4>
                                <p className="text-gray-600">Libreville, Gabon</p>
                            </div>
                        </div>
                    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
