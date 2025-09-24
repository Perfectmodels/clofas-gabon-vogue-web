import React, { useState } from 'react';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';
import StylistGallery from '../components/StylistGallery';

const Creators: React.FC = () => {
  const [selectedStylist, setSelectedStylist] = useState<string | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  // Données des stylistes avec leurs vraies images migrées
  const stylistsData = {
    'Angèle Epouta': [
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
      },
      {
        id: 5,
        url: 'https://i.ibb.co/fY4s0ZHB/c8afc6ad9f06.jpg',
        title: 'Création 5',
        description: 'Création d\'Angèle Epouta',
        category: 'Haute Couture'
      },
      {
        id: 6,
        url: 'https://i.ibb.co/yc1Kdq34/8dfdf7e9a8f9.jpg',
        title: 'Création 6',
        description: 'Création d\'Angèle Epouta',
        category: 'Haute Couture'
      },
      {
        id: 7,
        url: 'https://i.ibb.co/yc8bG1Tb/52e3ee600fbc.jpg',
        title: 'Création 7',
        description: 'Création d\'Angèle Epouta',
        category: 'Haute Couture'
      },
      {
        id: 8,
        url: 'https://i.ibb.co/FqdpRkXY/1ee4d51f68c4.jpg',
        title: 'Création 8',
        description: 'Création d\'Angèle Epouta',
        category: 'Haute Couture'
      }
    ],
    'Beitch Faro': [
      {
        id: 9,
        url: 'https://i.ibb.co/ZpGx4QvL/245e81248d61.jpg',
        title: 'Création 1',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 10,
        url: 'https://i.ibb.co/hRgT3zqh/a23261079d75.jpg',
        title: 'Création 2',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 11,
        url: 'https://i.ibb.co/9khT9jRR/9c48c28ff676.jpg',
        title: 'Création 3',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 12,
        url: 'https://i.ibb.co/0VKstWrK/3c80cc4e6574.jpg',
        title: 'Création 4',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 13,
        url: 'https://i.ibb.co/z9kL58x/3100b475f5c0.jpg',
        title: 'Création 5',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 14,
        url: 'https://i.ibb.co/N6sspHc7/5213160fe8c8.jpg',
        title: 'Création 6',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 15,
        url: 'https://i.ibb.co/PvLccjDz/c335da428b09.jpg',
        title: 'Création 7',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 16,
        url: 'https://i.ibb.co/zVLFVWjP/cc94856c27c1.jpg',
        title: 'Création 8',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 17,
        url: 'https://i.ibb.co/pB3YNMp3/c247616e8323.jpg',
        title: 'Création 9',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      },
      {
        id: 18,
        url: 'https://i.ibb.co/sMGghMv/3f91bc3fe18b.jpg',
        title: 'Création 10',
        description: 'Création de Beitch Faro',
        category: 'Promotion'
      }
    ],
    'Angelina Creations': [
      {
        id: 19,
        url: 'https://i.ibb.co/ymzt8frZ/1243d99b625e.jpg',
        title: 'Création 1',
        description: 'Création d\'Angelina Creations',
        category: 'Maison de Couture'
      },
      {
        id: 20,
        url: 'https://i.ibb.co/0yD8DL4X/c161792451cb.jpg',
        title: 'Création 2',
        description: 'Création d\'Angelina Creations',
        category: 'Maison de Couture'
      },
      {
        id: 21,
        url: 'https://i.ibb.co/3V0Qttw/064c1430c7db.jpg',
        title: 'Création 3',
        description: 'Création d\'Angelina Creations',
        category: 'Maison de Couture'
      },
      {
        id: 22,
        url: 'https://i.ibb.co/Qs1MVBf/3da1bac85e6b.jpg',
        title: 'Création 4',
        description: 'Création d\'Angelina Creations',
        category: 'Maison de Couture'
      },
      {
        id: 23,
        url: 'https://i.ibb.co/7J30PT4H/ea5023c3ac65.jpg',
        title: 'Création 5',
        description: 'Création d\'Angelina Creations',
        category: 'Maison de Couture'
      },
      {
        id: 24,
        url: 'https://i.ibb.co/xSDxG5Rh/c240a82dfe89.jpg',
        title: 'Création 6',
        description: 'Création d\'Angelina Creations',
        category: 'Maison de Couture'
      },
      {
        id: 25,
        url: 'https://i.ibb.co/jvNZfmhF/bd143a318d50.jpg',
        title: 'Création 7',
        description: 'Création d\'Angelina Creations',
        category: 'Maison de Couture'
      },
      {
        id: 26,
        url: 'https://i.ibb.co/nqNpbqHJ/d3018f0663e6.jpg',
        title: 'Création 8',
        description: 'Création d\'Angelina Creations',
        category: 'Maison de Couture'
      }
    ],
    'L\'atelier Issé By Lita': [
      {
        id: 27,
        url: 'https://i.ibb.co/Wpy22mvs/626988750b51.jpg',
        title: 'Création 1',
        description: 'Création de L\'atelier Issé By Lita',
        category: 'Atelier'
      },
      {
        id: 28,
        url: 'https://i.ibb.co/RGWFYCnx/bf62f7b17d86.jpg',
        title: 'Création 2',
        description: 'Création de L\'atelier Issé By Lita',
        category: 'Atelier'
      },
      {
        id: 29,
        url: 'https://i.ibb.co/GQR5GrqM/c0b200863467.jpg',
        title: 'Création 3',
        description: 'Création de L\'atelier Issé By Lita',
        category: 'Atelier'
      },
      {
        id: 30,
        url: 'https://i.ibb.co/HDcN4DLz/9edaad8588c2.jpg',
        title: 'Création 4',
        description: 'Création de L\'atelier Issé By Lita',
        category: 'Atelier'
      },
      {
        id: 31,
        url: 'https://i.ibb.co/pvsDfzGQ/2ef8a415c6bd.jpg',
        title: 'Création 5',
        description: 'Création de L\'atelier Issé By Lita',
        category: 'Atelier'
      },
      {
        id: 32,
        url: 'https://i.ibb.co/Q3K1sfR7/cf51536b5800.jpg',
        title: 'Création 6',
        description: 'Création de L\'atelier Issé By Lita',
        category: 'Atelier'
      },
      {
        id: 33,
        url: 'https://i.ibb.co/GQgwLrzD/6e2267df4b1d.jpg',
        title: 'Création 7',
        description: 'Création de L\'atelier Issé By Lita',
        category: 'Atelier'
      },
      {
        id: 34,
        url: 'https://i.ibb.co/xqQqzzdQ/cc17a41d83af.jpg',
        title: 'Création 8',
        description: 'Création de L\'atelier Issé By Lita',
        category: 'Atelier'
      }
    ],
    'Desmo': [
      {
        id: 35,
        url: 'https://i.ibb.co/p65BvK4N/a05457383187.jpg',
        title: 'Création 1',
        description: 'Création de Desmo',
        category: 'Designer'
      },
      {
        id: 36,
        url: 'https://i.ibb.co/ccKJnQbV/f62faa714e7f.jpg',
        title: 'Création 2',
        description: 'Création de Desmo',
        category: 'Designer'
      },
      {
        id: 37,
        url: 'https://i.ibb.co/fV8wTqNc/2009081a8d31.jpg',
        title: 'Création 3',
        description: 'Création de Desmo',
        category: 'Designer'
      },
      {
        id: 38,
        url: 'https://i.ibb.co/kVcnwwPn/78af3363aad2.jpg',
        title: 'Création 4',
        description: 'Création de Desmo',
        category: 'Designer'
      },
      {
        id: 39,
        url: 'https://i.ibb.co/GB5Mt3M/0a1e3b4bf9cd.jpg',
        title: 'Création 5',
        description: 'Création de Desmo',
        category: 'Designer'
      },
      {
        id: 40,
        url: 'https://i.ibb.co/ZpW6yYdk/73169dd26a20.jpg',
        title: 'Création 6',
        description: 'Création de Desmo',
        category: 'Designer'
      },
      {
        id: 41,
        url: 'https://i.ibb.co/93W1H0b2/0f0e54c2225c.jpg',
        title: 'Création 7',
        description: 'Création de Desmo',
        category: 'Designer'
      },
      {
        id: 42,
        url: 'https://i.ibb.co/0pfQk2pC/eae3166e7d14.jpg',
        title: 'Création 8',
        description: 'Création de Desmo',
        category: 'Designer'
      }
    ],
    'Jacques Simon': [
      {
        id: 43,
        url: 'https://i.ibb.co/jPsYvQ0N/56c95b5d36b0.jpg',
        title: 'Création 1',
        description: 'Création de Jacques Simon',
        category: 'Couturier'
      },
      {
        id: 44,
        url: 'https://i.ibb.co/39krqgs6/01fba6223b5c.jpg',
        title: 'Création 2',
        description: 'Création de Jacques Simon',
        category: 'Couturier'
      },
      {
        id: 45,
        url: 'https://i.ibb.co/SpPy9TF/f8b80a29ba0c.jpg',
        title: 'Création 3',
        description: 'Création de Jacques Simon',
        category: 'Couturier'
      },
      {
        id: 46,
        url: 'https://i.ibb.co/d07dSM4q/7e702602a905.jpg',
        title: 'Création 4',
        description: 'Création de Jacques Simon',
        category: 'Couturier'
      },
      {
        id: 47,
        url: 'https://i.ibb.co/PZqdfSW7/a1cdccff62ba.jpg',
        title: 'Création 5',
        description: 'Création de Jacques Simon',
        category: 'Couturier'
      },
      {
        id: 48,
        url: 'https://i.ibb.co/k2HbXZKF/079fcf4038b5.jpg',
        title: 'Création 6',
        description: 'Création de Jacques Simon',
        category: 'Couturier'
      },
      {
        id: 49,
        url: 'https://i.ibb.co/xS1GJkdW/d8d09edd16c7.jpg',
        title: 'Création 7',
        description: 'Création de Jacques Simon',
        category: 'Couturier'
      },
      {
        id: 50,
        url: 'https://i.ibb.co/G385KWvX/94bcd6a01c1a.jpg',
        title: 'Création 8',
        description: 'Création de Jacques Simon',
        category: 'Couturier'
      }
    ],
    'Koro DK Style': [
      {
        id: 51,
        url: 'https://i.ibb.co/L3BBq6W/d19611ccc7d1.jpg',
        title: 'Création 1',
        description: 'Création de Koro DK Style',
        category: 'Style'
      },
      {
        id: 52,
        url: 'https://i.ibb.co/k2QRRcQN/635e3f800a0f.jpg',
        title: 'Création 2',
        description: 'Création de Koro DK Style',
        category: 'Style'
      },
      {
        id: 53,
        url: 'https://i.ibb.co/ks0LvDDy/afd8289de7d8.jpg',
        title: 'Création 3',
        description: 'Création de Koro DK Style',
        category: 'Style'
      },
      {
        id: 54,
        url: 'https://i.ibb.co/XZt8LCpH/a43cfd4967bc.jpg',
        title: 'Création 4',
        description: 'Création de Koro DK Style',
        category: 'Style'
      },
      {
        id: 55,
        url: 'https://i.ibb.co/NndJd7Y3/3ca6cd732cac.jpg',
        title: 'Création 5',
        description: 'Création de Koro DK Style',
        category: 'Style'
      },
      {
        id: 56,
        url: 'https://i.ibb.co/W17mKtr/0803735be1ed.jpg',
        title: 'Création 6',
        description: 'Création de Koro DK Style',
        category: 'Style'
      },
      {
        id: 57,
        url: 'https://i.ibb.co/TBrqRqKB/c3082d14ebd6.jpg',
        title: 'Création 7',
        description: 'Création de Koro DK Style',
        category: 'Style'
      },
      {
        id: 58,
        url: 'https://i.ibb.co/W4BvKdwY/979e611c525e.jpg',
        title: 'Création 8',
        description: 'Création de Koro DK Style',
        category: 'Style'
      }
    ],
    'Nous Fashion': [
      {
        id: 59,
        url: 'https://i.ibb.co/Q7PBPMwf/a3c3ca5aac4d.jpg',
        title: 'Création 1',
        description: 'Création de Nous Fashion',
        category: 'Fashion'
      },
      {
        id: 60,
        url: 'https://i.ibb.co/RTkX0Cpv/829b6fccf175.jpg',
        title: 'Création 2',
        description: 'Création de Nous Fashion',
        category: 'Fashion'
      },
      {
        id: 61,
        url: 'https://i.ibb.co/fVxvm7mg/1d0c53fcae41.jpg',
        title: 'Création 3',
        description: 'Création de Nous Fashion',
        category: 'Fashion'
      },
      {
        id: 62,
        url: 'https://i.ibb.co/jZ3ZzVkP/8aa40af32123.jpg',
        title: 'Création 4',
        description: 'Création de Nous Fashion',
        category: 'Fashion'
      },
      {
        id: 63,
        url: 'https://i.ibb.co/RGdFcrN6/fc3991781987.jpg',
        title: 'Création 5',
        description: 'Création de Nous Fashion',
        category: 'Fashion'
      },
      {
        id: 64,
        url: 'https://i.ibb.co/Nd5G8Tf9/f3b97300e45e.jpg',
        title: 'Création 6',
        description: 'Création de Nous Fashion',
        category: 'Fashion'
      },
      {
        id: 65,
        url: 'https://i.ibb.co/7NxCgSLX/3f99366e5806.jpg',
        title: 'Création 7',
        description: 'Création de Nous Fashion',
        category: 'Fashion'
      },
      {
        id: 66,
        url: 'https://i.ibb.co/nsxB8Kcy/72ed9dfdbbc0.jpg',
        title: 'Création 8',
        description: 'Création de Nous Fashion',
        category: 'Fashion'
      }
    ],
    'OJ Fashion': [
      {
        id: 67,
        url: 'https://i.ibb.co/3Y1HBk8C/5d0260a145ae.jpg',
        title: 'Création 1',
        description: 'Création d\'OJ Fashion',
        category: 'Fashion'
      },
      {
        id: 68,
        url: 'https://i.ibb.co/k6ktJ6xt/4a9a9812d2ea.jpg',
        title: 'Création 2',
        description: 'Création d\'OJ Fashion',
        category: 'Fashion'
      },
      {
        id: 69,
        url: 'https://i.ibb.co/wrjf7X47/e5c7e7f896bf.jpg',
        title: 'Création 3',
        description: 'Création d\'OJ Fashion',
        category: 'Fashion'
      },
      {
        id: 70,
        url: 'https://i.ibb.co/SwRfsmfM/de41eba514a8.jpg',
        title: 'Création 4',
        description: 'Création d\'OJ Fashion',
        category: 'Fashion'
      },
      {
        id: 71,
        url: 'https://i.ibb.co/4bqZpJx/c264e754fc74.jpg',
        title: 'Création 5',
        description: 'Création d\'OJ Fashion',
        category: 'Fashion'
      },
      {
        id: 72,
        url: 'https://i.ibb.co/mV3RJyNX/e666e9c388ba.jpg',
        title: 'Création 6',
        description: 'Création d\'OJ Fashion',
        category: 'Fashion'
      },
      {
        id: 73,
        url: 'https://i.ibb.co/VWz15TWj/5df8fed2a3ad.jpg',
        title: 'Création 7',
        description: 'Création d\'OJ Fashion',
        category: 'Fashion'
      },
      {
        id: 74,
        url: 'https://i.ibb.co/H8YQs0q/be6811255295.jpg',
        title: 'Création 8',
        description: 'Création d\'OJ Fashion',
        category: 'Fashion'
      }
    ]
  };

  const handleViewGallery = (stylistName: string) => {
    setSelectedStylist(stylistName);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    setSelectedStylist(null);
  };

  return (
    <div className="min-h-screen section-gabonese pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden creators-section">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gabonese-font animate-golden-shimmer">
              👑 Nos Créateurs
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto modern-font">
              🌟 <strong>Découvrez les talents exceptionnels de la mode gabonaise</strong> qui façonnent l'avenir 
              de la création africaine lors de l'édition 2024 du CLOFAS 241. Chaque créateur apporte sa vision 
              unique de l'authenticité culturelle et de l'innovation contemporaine.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gabon-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>👥</span>
                <span className="font-semibold">8 créateurs d'exception</span>
              </div>
              <div className="flex items-center gap-2 bg-sunset-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📸</span>
                <span className="font-semibold">200+ créations uniques</span>
              </div>
              <div className="flex items-center gap-2 bg-earth-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📅</span>
                <span className="font-semibold">Édition 2024</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
            <span className="text-gabon-green">🌟 Créateurs</span> 
            <span className="text-african-gold mx-3">•</span>
            <span className="text-sunset-orange">CLOFAS 241</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg modern-font">
            🎨 <strong>Rencontrez les artistes qui transforment la mode gabonaise</strong>. Chaque créateur 
            apporte sa vision unique, alliant tradition ancestrale et innovation contemporaine pour créer 
            des pièces exceptionnelles qui honorent l'héritage culturel du Gabon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Angèle Epouta */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/kV5WmdGZ/73b494d49a32.jpg"
                alt="Angèle Epouta"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/00A651/FFFFFF?text=Angèle+Epouta';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-african-gold text-white px-3 py-1 rounded-full text-sm font-bold">
                Maître
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Angèle Epouta</h3>
                <p className="text-sm opacity-90">Maître Créatrice</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                <strong>Figure emblématique de la mode gabonaise</strong>, reconnue pour son excellence artistique 
                et son savoir-faire artisanal exceptionnel. Ses créations allient tradition ancestrale et modernité.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <span className="font-semibold">{stylistsData['Angèle Epouta']?.length || 0} créations</span>
                </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewGallery('Angèle Epouta')}
                        className="btn-african px-4 py-2 rounded-lg text-sm"
                      >
                        Voir les créations
                </button>
                      <Link
                        to="/stylist/angele-epouta"
                        className="bg-gabon-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-gabon-green transition-colors"
                      >
                        Profil
                      </Link>
                    </div>
              </div>
            </div>
          </div>

          {/* Beitch Faro */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/ZpGx4QvL/245e81248d61.jpg"
                alt="Beitch Faro"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/FFD700/000000?text=Beitch+Faro';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-sunset-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                Fondatrice
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Beitch Faro</h3>
                <p className="text-sm opacity-90">Fondatrice & Promotrice</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                <strong>Visionnaire et fondatrice du CLOFAS 241</strong>, dédiée à la promotion de la mode locale 
                gabonaise. Son engagement transforme l'industrie de la mode au Gabon.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <span className="font-semibold">{stylistsData['Beitch Faro']?.length || 0} créations</span>
                </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewGallery('Beitch Faro')}
                        className="btn-african px-4 py-2 rounded-lg text-sm"
                      >
                        Voir les créations
                </button>
                      <Link
                        to="/stylist/beitch-faro"
                        className="bg-gabon-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-gabon-green transition-colors"
                      >
                        Profil
                      </Link>
                    </div>
              </div>
            </div>
          </div>

          {/* Angelina Creations */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/ymzt8frZ/1243d99b625e.jpg"
                alt="Angelina Creations"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/0066CC/FFFFFF?text=Angelina+Creations';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-earth-brown text-white px-3 py-1 rounded-full text-sm font-bold">
                Maison
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Angelina Creations</h3>
                <p className="text-sm opacity-90">💎 Maison de Couture</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                ✨ <strong>Atelier réputé pour ses pièces uniques</strong> mêlant tradition et modernité avec 
                raffinement. Chaque création raconte une histoire d'excellence gabonaise.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  📸 <span className="font-semibold">{stylistsData['Angelina Creations']?.length || 0} créations</span>
                </span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleViewGallery('Angelina Creations')}
                        className="btn-african px-4 py-2 rounded-lg text-sm"
                      >
                        Voir les créations
                </button>
                      <Link
                        to="/stylist/angelina-creations"
                        className="bg-gabon-blue text-white px-4 py-2 rounded-lg text-sm hover:bg-gabon-green transition-colors"
                      >
                        Profil
                      </Link>
                    </div>
              </div>
            </div>
          </div>

          {/* L'atelier Issé By Lita */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/Wpy22mvs/626988750b51.jpg"
                alt="L'atelier Issé By Lita"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/00A651/FFFFFF?text=L\'atelier+Issé+By+Lita';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-gabon-green text-white px-3 py-1 rounded-full text-sm font-bold">
                Atelier
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">L'atelier Issé By Lita</h3>
                <p className="text-sm opacity-90">🎨 Créatrice</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                🏛️ <strong>Espace créatif dédié à la haute couture gabonaise</strong> avec une touche d'originalité 
                distincte. L'atelier allie savoir-faire traditionnel et innovation contemporaine.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  📸 <span className="font-semibold">{stylistsData['L\'atelier Issé By Lita']?.length || 0} créations</span>
                </span>
                <button 
                  onClick={() => handleViewGallery('L\'atelier Issé By Lita')}
                  className="btn-african px-4 py-2 rounded-lg text-sm"
                >
                  Voir les créations
                </button>
              </div>
            </div>
          </div>

          {/* Desmo */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/p65BvK4N/a05457383187.jpg"
                alt="Desmo"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/00A651/FFFFFF?text=Desmo';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-gabon-green text-white px-3 py-1 rounded-full text-sm font-bold">
                Designer
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Desmo</h3>
                <p className="text-sm opacity-90">🎨 Designer Créatif</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                ✨ <strong>Designer créatif aux idées novatrices</strong>, Desmo apporte une vision 
                contemporaine et audacieuse à la mode gabonaise avec des créations uniques.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  📸 <span className="font-semibold">{stylistsData['Desmo']?.length || 0} créations</span>
                </span>
                <button 
                  onClick={() => handleViewGallery('Desmo')}
                  className="btn-african px-4 py-2 rounded-lg text-sm"
                >
                  Voir les créations
                </button>
              </div>
            </div>
          </div>

          {/* Jacques Simon */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/jPsYvQ0N/56c95b5d36b0.jpg"
                alt="Jacques Simon"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/FFD700/000000?text=Jacques+Simon';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-sunset-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                Couturier
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Jacques Simon</h3>
                <p className="text-sm opacity-90">✂️ Maître Couturier</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                🏆 <strong>Maître couturier reconnu pour son savoir-faire exceptionnel</strong>, Jacques Simon 
                excelle dans l'art de la couture traditionnelle gabonaise avec une touche moderne.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  📸 <span className="font-semibold">{stylistsData['Jacques Simon']?.length || 0} créations</span>
                </span>
                <button 
                  onClick={() => handleViewGallery('Jacques Simon')}
                  className="btn-african px-4 py-2 rounded-lg text-sm"
                >
                  Voir les créations
                </button>
              </div>
            </div>
          </div>

          {/* Koro DK Style */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/L3BBq6W/d19611ccc7d1.jpg"
                alt="Koro DK Style"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/0066CC/FFFFFF?text=Koro+DK+Style';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-earth-brown text-white px-3 py-1 rounded-full text-sm font-bold">
                Style
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Koro DK Style</h3>
                <p className="text-sm opacity-90">💎 Style Innovant</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                🔥 <strong>Style innovant qui redéfinit les codes de la mode gabonaise</strong>, Koro DK Style 
                apporte une approche contemporaine et audacieuse aux créations traditionnelles.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  📸 <span className="font-semibold">{stylistsData['Koro DK Style']?.length || 0} créations</span>
                </span>
                <button 
                  onClick={() => handleViewGallery('Koro DK Style')}
                  className="btn-african px-4 py-2 rounded-lg text-sm"
                >
                  Voir les créations
                </button>
              </div>
            </div>
          </div>

          {/* Nous Fashion */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/Q7PBPMwf/a3c3ca5aac4d.jpg"
                alt="Nous Fashion"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/00A651/FFFFFF?text=Nous+Fashion';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-gabon-green text-white px-3 py-1 rounded-full text-sm font-bold">
                Fashion
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">Nous Fashion</h3>
                <p className="text-sm opacity-90">👗 Maison de Mode</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                🌟 <strong>Maison de mode qui célèbre l'élégance gabonaise</strong>, Nous Fashion 
                crée des pièces raffinées qui allient sophistication et authenticité culturelle.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  📸 <span className="font-semibold">{stylistsData['Nous Fashion']?.length || 0} créations</span>
                </span>
                <button 
                  onClick={() => handleViewGallery('Nous Fashion')}
                  className="btn-african px-4 py-2 rounded-lg text-sm"
                >
                  Voir les créations
                </button>
              </div>
            </div>
          </div>

          {/* OJ Fashion */}
          <div className="card-gabonese overflow-hidden">
            <div className="h-64 relative">
              <img
                src="https://i.ibb.co/3Y1HBk8C/5d0260a145ae.jpg"
                alt="OJ Fashion"
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300/FFD700/000000?text=OJ+Fashion';
                }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-30"></div>
              <div className="absolute top-4 right-4 bg-sunset-orange text-white px-3 py-1 rounded-full text-sm font-bold">
                Fashion
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-bold">OJ Fashion</h3>
                <p className="text-sm opacity-90">🎭 Créateur Mode</p>
              </div>
            </div>
            <div className="p-6">
              <p className="text-gray-600 text-sm mb-4 leading-relaxed modern-font">
                💫 <strong>Créateur mode aux inspirations multiples</strong>, OJ Fashion 
                explore les frontières entre tradition et modernité avec des créations originales.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  📸 <span className="font-semibold">{stylistsData['OJ Fashion']?.length || 0} créations</span>
                </span>
                <button 
                  onClick={() => handleViewGallery('OJ Fashion')}
                  className="btn-african px-4 py-2 rounded-lg text-sm"
                >
                  Voir les créations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Galerie des stylistes */}
      <StylistGallery
        stylistName={selectedStylist || ''}
        images={selectedStylist ? stylistsData[selectedStylist as keyof typeof stylistsData] || [] : []}
        isOpen={isGalleryOpen}
        onClose={handleCloseGallery}
      />
    </div>
  );
};

export default Creators;