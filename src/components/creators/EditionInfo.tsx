
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Phone, Instagram, Facebook } from 'lucide-react';

const EditionInfo = () => {
  return (
    <div>
      <span className="inline-block px-3 py-1 bg-clofas-coral/20 text-clofas-coral rounded-full text-sm font-medium mb-4">
        Édition Passée 2024
      </span>
      <h2 className="section-title">2ᵉ Édition CLOFAS 241</h2>
      
      <div className="flex flex-col gap-4 mt-6">
        <div className="flex items-center gap-3">
          <Calendar className="w-5 h-5 text-clofas-coral" />
          <span className="text-lg">13 au 16 décembre 2024</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-clofas-coral" />
          <span className="text-lg">Ministère de la Culture et des Arts - Gabon</span>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Programme</h3>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-clofas-coral mr-2">✓</span>
            <span>Conférence de presse</span>
          </li>
          <li className="flex items-start">
            <span className="text-clofas-coral mr-2">✓</span>
            <span>Atelier de formation</span>
          </li>
          <li className="flex items-start">
            <span className="text-clofas-coral mr-2">✓</span>
            <span>Exposition-vente</span>
          </li>
          <li className="flex items-start">
            <span className="text-clofas-coral mr-2">✓</span>
            <span>Défilé de mode suivi d'un cocktail</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Billetterie</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-clofas-gold">
            <p className="font-semibold">Entrée Solo</p>
            <p className="text-2xl font-bold text-clofas-gold">15.000 FCFA</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-clofas-lavender">
            <p className="font-semibold">Entrée Couple</p>
            <p className="text-2xl font-bold text-clofas-lavender">25.000 FCFA</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Infos & Réservations</h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-clofas-gold" />
            <span>+241 66668900</span>
          </div>
          <div className="flex items-center gap-3">
            <Facebook className="w-5 h-5 text-clofas-gold" />
            <span>CLOFAS 241</span>
          </div>
          <div className="flex items-center gap-3">
            <Instagram className="w-5 h-5 text-clofas-gold" />
            <span>CLOFAS 241</span>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <Link to="/contact" className="btn-primary">
          Réserver vos places
        </Link>
      </div>
    </div>
  );
};

export default EditionInfo;
