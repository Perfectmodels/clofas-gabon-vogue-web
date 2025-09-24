import React from 'react';
import { Link } from 'react-router-dom';

interface CreatorCardProps {
  creator: {
    id: string;
    name: string;
    status: string;
    description: string;
    profileLink: string;
    images: string[];
  };
  onViewGallery: (name: string) => void;
}

const CreatorCard: React.FC<CreatorCardProps> = ({ creator, onViewGallery }) => {
  return (
    <div className="creator-card group">
      <div className="h-64 relative">
        <img
          src={creator.images[0] || 'https://via.placeholder.com/400x300/CCCCCC/FFFFFF?text=Image+non+disponible'}
          alt={creator.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="creator-status status-stylist absolute top-4 right-4">
          {creator.status}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="text-xl font-bold">{creator.name}</h3>
        </div>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
          {creator.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 flex items-center gap-1">
            <span className="font-semibold">{creator.images.length} créations</span>
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => onViewGallery(creator.name)}
              className="btn-african px-4 py-2 rounded-lg text-sm"
            >
              Voir les créations
            </button>
            <Link
              to={creator.profileLink}
              className="bg-gabon-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-gabon-green transition-colors"
            >
              Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorCard;
