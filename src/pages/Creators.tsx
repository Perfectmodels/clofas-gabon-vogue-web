
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Phone, Mail, Instagram, Facebook } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Creators = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

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

  const creators2024 = [
  {
    name: "Angèle Epouta",
    country: "Gabon",
    images: [
      "https://i.ibb.co/r2Tf4cwQ/DSC-0219.jpg",
      "https://i.ibb.co/dw0rSZw1/DSC-0220.jpg",
      "https://i.ibb.co/sJbDXCBg/DSC-0221.jpg",
      "https://i.ibb.co/HL5v320z/DSC-0222.jpg",
      "https://i.ibb.co/9Fqdn91/DSC-0223.jpg",
      "https://i.ibb.co/fYLRv4mg/DSC-0224.jpg",
      "https://i.ibb.co/1Y66K5JK/DSC-0225.jpg",
      "https://i.ibb.co/j9ZCTDtZ/DSC-0226.jpg",
      "https://i.ibb.co/ZsyTx9f/DSC-0227.jpg",
      "https://i.ibb.co/bjtrb2K8/DSC-0228.jpg",
      "https://i.ibb.co/FbgVVyfD/DSC-0229.jpg",
      "https://i.ibb.co/8n8VDjT0/DSC-0230.jpg",
      "https://i.ibb.co/DB2H4Pd/DSC-0231.jpg",
      "https://i.ibb.co/F1hB9pC/DSC-0232.jpg",
      "https://i.ibb.co/5xstWV8v/DSC-0233.jpg",
      "https://i.ibb.co/B2VywvGj/DSC-0234.jpg",
      "https://i.ibb.co/DHMyQdR4/DSC-0235.jpg",
      "https://i.ibb.co/3mZjJdvz/DSC-0236.jpg"
    ]
  },
  {
    name: "Atelier Issée By Lita",
    country: "Gabon",
    images: [
      "https://i.ibb.co/KzfHN85c/DSC-0238.jpg",
      "https://i.ibb.co/xtWq4ppT/DSC-0239.jpg",
      "https://i.ibb.co/RGyRSkWH/DSC-0240.jpg",
      "https://i.ibb.co/v4NdwHcR/DSC-0241.jpg",
      "https://i.ibb.co/TxpwGjfP/DSC-0242.jpg",
      "https://i.ibb.co/kgGD0qth/DSC-0243.jpg",
      "https://i.ibb.co/hRnxW2GK/DSC-0244.jpg",
      "https://i.ibb.co/v6GxL1jZ/DSC-0245.jpg",
      "https://i.ibb.co/MDd75HzW/DSC-0246.jpg",
      "https://i.ibb.co/35Wdr3X2/DSC-0247.jpg",
      "https://i.ibb.co/Jwt31rQy/DSC-0250.jpg",
      "https://i.ibb.co/QjYRXwVt/DSC-0251.jpg",
      "https://i.ibb.co/QRRJWTT/DSC-0252.jpg",
      "https://i.ibb.co/sv0k6HGB/DSC-0253.jpg"
    ]
  },
 {
  name: "Desmo",
  country: "Togo",
  images: [
    "https://i.ibb.co/Xxvkd5jH/DSC-0258.jpg",
    "https://i.ibb.co/XfDmTt9H/DSC-0259.jpg",
    "https://i.ibb.co/kgQvbQZ9/DSC-0261.jpg",
    "https://i.ibb.co/rf2k6D62/DSC-0262.jpg",
    "https://i.ibb.co/1Dx7skM/DSC-0263.jpg",
    "https://i.ibb.co/bgJ1TfZt/DSC-0264.jpg",
    "https://i.ibb.co/99F239mq/DSC-0265.jpg",
    "https://i.ibb.co/F4c4Xtx1/DSC-0266.jpg",
    "https://i.ibb.co/k21NFgGc/DSC-0267.jpg",
    "https://i.ibb.co/F4xZwkyJ/DSC-0268.jpg",
    "https://i.ibb.co/DfCYGx95/DSC-0269.jpg",
    "https://i.ibb.co/jZGtVRtd/DSC-0271.jpg",
    "https://i.ibb.co/mCcD1Gfq/DSC-0272.jpg",
    "https://i.ibb.co/2zRKpF4/DSC-0273.jpg",
    "https://i.ibb.co/MkVKxKMx/DSC-0274.jpg",
    "https://i.ibb.co/fVP7cHx4/DSC-0275.jpg",
    "https://i.ibb.co/8LJHcqWs/DSC-0277.jpg",
    "https://i.ibb.co/zTKBxfCR/DSC-0278.jpg",
    "https://i.ibb.co/nMnYTwgP/DSC-0279.jpg",
    "https://i.ibb.co/8gPh51Gq/DSC-0280.jpg",
    "https://i.ibb.co/7JpHWTdH/DSC-0281.jpg",
    "https://i.ibb.co/YT0gkyDz/DSC-0282.jpg",
    "https://i.ibb.co/5hRK8k2f/DSC-0283.jpg",
    "https://i.ibb.co/bjdfMhrz/DSC-0284.jpg",
    "https://i.ibb.co/35kzwJ3g/DSC-0285.jpg",
    "https://i.ibb.co/B0JvpMX/DSC-0286.jpg"
  ]
},
  {
    name: "Jacques Simon",
    country: "Gabon",
    images: []
  },
  {
    name: "Koro DK Style",
    country: "Burkina Faso",
    images: []
  },
  {
    name: "Nous Fashion",
    country: "Gabon",
    images: []
  },
  {
    name: "OJ Fashion",
    country: "Gabon",
    images: []
  },
  {
    name: "Angelina Creations",
    country: "Gabon",
    images: []
  }
];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-clofas-dark text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1617922001439-4a2e6562f328?q=80&w=1974')] bg-cover bg-center opacity-20"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-playfair text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Créateurs <span className="text-clofas-gold">CLOFAS 241</span>
          </h1>
          <p className="text-xl max-w-3xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
            Découvrez les talentueux stylistes qui participent à cette célébration de la mode gabonaise et africaine
          </p>
        </div>
      </section>

      {/* Current Edition */}
      <section 
        ref={(el) => (sectionsRef.current[0] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
            <div className="md:w-1/2">
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
            
            <div className="md:w-1/2 mt-8 md:mt-0">
              <h3 className="text-xl font-bold mb-6">Stylistes invités</h3>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du styliste</TableHead>
                      <TableHead>Pays</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {creators2024.map((creator, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{creator.name}</TableCell>
                        <TableCell>{creator.country}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-8 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold mb-4">Galerie des créateurs</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((index) => (
                    <div key={index} className="group relative overflow-hidden rounded-lg aspect-square">
                      <img 
                        src={`https://source.unsplash.com/random/300x300?fashion,africa,designer&sig=${index}`} 
                        alt={`Créateur ${index}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-80 transition-opacity"></div>
                      <div className="absolute bottom-0 left-0 p-3 text-white translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="font-bold text-sm">Créateur {index}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Editions */}
      <section 
        ref={(el) => (sectionsRef.current[1] = el)} 
        className="py-20 px-4 bg-gray-50 fade-in-section"
      >
        <div className="container mx-auto max-w-6xl">
          <span className="inline-block px-3 py-1 bg-clofas-lavender/20 text-clofas-lavender rounded-full text-sm font-medium mb-4">
            À venir
          </span>
          <h2 className="section-title">Éditions Futures (2025 et plus)</h2>
          <p className="text-lg max-w-3xl mb-12">
            Restez informés des prochaines éditions de CLOFAS 241 et des opportunités de participation
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-xl font-bold mb-4">Annonce des prochaines éditions</h3>
              <p className="text-gray-600 mb-6">
                Soyez les premiers informés des dates et lieux des prochaines éditions de CLOFAS 241
              </p>
              <Link to="/contact" className="text-clofas-coral hover:underline font-medium">
                S'inscrire à la newsletter &rarr;
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-xl font-bold mb-4">Inscriptions pour participations</h3>
              <p className="text-gray-600 mb-6">
                Ouverture des inscriptions pour les créateurs, exposants et partenaires souhaitant participer
              </p>
              <Link to="/contact" className="text-clofas-coral hover:underline font-medium">
                Soumettre sa candidature &rarr;
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-xl font-bold mb-4">Opportunités de collaboration</h3>
              <p className="text-gray-600 mb-6">
                Découvrez comment devenir partenaire ou sponsor pour les futures éditions
              </p>
              <Link to="/contact" className="text-clofas-coral hover:underline font-medium">
                Devenir partenaire &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section 
        ref={(el) => (sectionsRef.current[2] = el)} 
        className="py-20 px-4 fade-in-section"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="section-title text-center mx-auto">Contact & Réseaux Sociaux</h2>
          <p className="text-lg mb-10 max-w-3xl mx-auto">
            Pour toute information complémentaire, n'hésitez pas à nous contacter
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-clofas-coral/10 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-clofas-coral" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Téléphone</p>
                <p className="font-bold">+241 66668900</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-clofas-gold/10 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-clofas-gold" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Lieu de l'événement</p>
                <p className="font-bold">Ministère de la Culture et des Arts - Gabon</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-clofas-lavender/10 rounded-full flex items-center justify-center">
                <Instagram className="w-5 h-5 text-clofas-lavender" />
              </div>
              <div className="text-left">
                <p className="text-sm text-gray-500">Réseaux sociaux</p>
                <p className="font-bold">Facebook & Instagram: CLOFAS 241</p>
              </div>
            </div>
          </div>
          
          <Link to="/contact" className="btn-primary">
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Creators;
