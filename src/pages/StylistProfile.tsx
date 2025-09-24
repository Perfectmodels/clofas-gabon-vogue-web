import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';

interface StylistData {
  name: string;
  title: string;
  description: string;
  bio: string;
  achievements: string[];
  imageUrl: string;
  gallery: Array<{
    id: number;
    url: string;
    title: string;
    description: string;
    category: string;
  }>;
}

const StylistProfile: React.FC = () => {
  const { stylistName } = useParams<{ stylistName: string }>();
  
  // Données des stylistes
  const stylistsData: Record<string, StylistData> = {
    'angele-epouta': {
      name: 'Angèle Epouta',
      title: 'Maître Créatrice',
      description: 'Figure emblématique de la mode gabonaise',
      bio: 'Angèle Epouta est une figure emblématique de la mode gabonaise, reconnue pour son excellence artistique et son savoir-faire artisanal exceptionnel. Ses créations allient tradition ancestrale et modernité, créant des pièces uniques qui honorent l\'héritage culturel du Gabon.',
      achievements: [
        'Maître Créatrice reconnue internationalement',
        'Expositions dans les plus grandes capitales africaines',
        'Mentor de nombreux jeunes créateurs gabonais',
        'Pionnière de la mode gabonaise contemporaine'
      ],
      imageUrl: 'https://i.ibb.co/kV5WmdGZ/73b494d49a32.jpg',
      gallery: [
        {
          id: 1,
          url: 'https://i.ibb.co/kV5WmdGZ/73b494d49a32.jpg',
          title: 'Création 1',
          description: 'Création d\'Angèle Epouta',
          category: 'Haute Couture'
        },
        {
          id: 2,
          url: 'https://i.ibb.co/JfKsLJP/01c8f4050da2.jpg',
          title: 'Création 2',
          description: 'Création d\'Angèle Epouta',
          category: 'Haute Couture'
        },
        {
          id: 3,
          url: 'https://i.ibb.co/vvCT2NV9/290f203a0fb8.jpg',
          title: 'Création 3',
          description: 'Création d\'Angèle Epouta',
          category: 'Haute Couture'
        },
        {
          id: 4,
          url: 'https://i.ibb.co/0VDmmp32/0e2ee56e1ae3.jpg',
          title: 'Création 4',
          description: 'Création d\'Angèle Epouta',
          category: 'Haute Couture'
        }
      ]
    },
    'beitch-faro': {
      name: 'Beitch Faro',
      title: 'Fondatrice & Promotrice',
      description: 'Visionnaire et fondatrice du CLOFAS 241',
      bio: 'Beitch Faro est la visionnaire et fondatrice du CLOFAS 241, dédiée à la promotion de la mode locale gabonaise. Son engagement transforme l\'industrie de la mode au Gabon et inspire une nouvelle génération de créateurs.',
      achievements: [
        'Fondatrice du CLOFAS 241',
        'Promotrice de la mode locale gabonaise',
        'Entrepreneure visionnaire',
        'Inspiratrice de la nouvelle génération'
      ],
      imageUrl: 'https://i.ibb.co/ZpGx4QvL/245e81248d61.jpg',
      gallery: [
        {
          id: 5,
          url: 'https://i.ibb.co/ZpGx4QvL/245e81248d61.jpg',
          title: 'Création 1',
          description: 'Création de Beitch Faro',
          category: 'Promotion'
        },
        {
          id: 6,
          url: 'https://i.ibb.co/hRgT3zqh/a23261079d75.jpg',
          title: 'Création 2',
          description: 'Création de Beitch Faro',
          category: 'Promotion'
        },
        {
          id: 7,
          url: 'https://i.ibb.co/9khT9jRR/9c48c28ff676.jpg',
          title: 'Création 3',
          description: 'Création de Beitch Faro',
          category: 'Promotion'
        },
        {
          id: 8,
          url: 'https://i.ibb.co/0VKstWrK/3c80cc4e6574.jpg',
          title: 'Création 4',
          description: 'Création de Beitch Faro',
          category: 'Promotion'
        }
      ]
    },
    'angelina-creations': {
      name: 'Angelina Creations',
      title: 'Maison de Couture',
      description: 'Atelier réputé pour ses pièces uniques',
      bio: 'Angelina Creations est un atelier réputé pour ses pièces uniques mêlant tradition et modernité avec raffinement. Cette maison de couture gabonaise excelle dans la création de vêtements qui honorent l\'héritage culturel tout en s\'adaptant aux tendances contemporaines.',
      achievements: [
        'Maison de couture établie',
        'Pièces uniques tradition-modernité',
        'Excellence dans l\'artisanat',
        'Innovation dans la mode gabonaise'
      ],
      imageUrl: 'https://i.ibb.co/ymzt8frZ/1243d99b625e.jpg',
      gallery: [
        {
          id: 9,
          url: 'https://i.ibb.co/ymzt8frZ/1243d99b625e.jpg',
          title: 'Création 1',
          description: 'Création d\'Angelina Creations',
          category: 'Maison de Couture'
        },
        {
          id: 10,
          url: 'https://i.ibb.co/0yD8DL4X/c161792451cb.jpg',
          title: 'Création 2',
          description: 'Création d\'Angelina Creations',
          category: 'Maison de Couture'
        },
        {
          id: 11,
          url: 'https://i.ibb.co/3V0Qttw/064c1430c7db.jpg',
          title: 'Création 3',
          description: 'Création d\'Angelina Creations',
          category: 'Maison de Couture'
        },
        {
          id: 12,
          url: 'https://i.ibb.co/Qs1MVBf/3da1bac85e6b.jpg',
          title: 'Création 4',
          description: 'Création d\'Angelina Creations',
          category: 'Maison de Couture'
        }
      ]
    }
  };

  const stylist = stylistName ? stylistsData[stylistName] : null;

  if (!stylist) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Styliste non trouvé</h1>
          <Link to="/creators" className="btn-african px-6 py-3 rounded-lg">
            Retour aux créateurs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden creators-section">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gabonese-font animate-golden-shimmer">
              {stylist.name}
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto modern-font">
              <strong>{stylist.title}</strong> - {stylist.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Portrait et informations */}
            <div className="card-gabonese p-8">
              <div className="text-center mb-8">
                <div className="w-48 h-48 bg-gradient-to-br from-gabon-green to-gabon-blue rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <div className="w-44 h-44 bg-white rounded-full flex items-center justify-center">
                    <div className="w-40 h-40 bg-gradient-to-br from-gabon-yellow to-gabon-green rounded-full flex items-center justify-center">
                      <span className="text-white text-4xl font-bold gabonese-font">
                        {stylist.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2 gabonese-font">
                  {stylist.name}
                </h2>
                <p className="text-gabon-green font-semibold text-xl mb-4 modern-font">
                  {stylist.title}
                </p>
                <p className="text-gray-600 text-lg modern-font">
                  {stylist.description}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 gabonese-font">
                    <span className="text-gabon-green">Biographie</span>
                  </h3>
                  <p className="text-gray-600 leading-relaxed modern-font">
                    {stylist.bio}
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 gabonese-font">
                    <span className="text-gabon-yellow">Réalisations</span>
                  </h3>
                  <ul className="space-y-3">
                    {stylist.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-600 modern-font">
                        <span className="text-gabon-green">•</span>
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Galerie */}
            <div className="card-gabonese p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 gabonese-font">
                <span className="text-gabon-blue">Galerie de Créations</span>
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stylist.gallery.map((item) => (
                  <div key={item.id} className="group cursor-pointer">
                    <div className="aspect-square rounded-lg overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                      <img
                        src={item.url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/300x300/CCCCCC/000000?text=Image';
                        }}
                      />
                    </div>
                    <div className="mt-2">
                      <h4 className="font-semibold text-gray-800 text-sm">{item.title}</h4>
                      <p className="text-xs text-gray-600">{item.category}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Link
              to="/creators"
              className="btn-african px-8 py-4 rounded-lg text-lg font-bold"
            >
              Retour aux Créateurs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StylistProfile;
