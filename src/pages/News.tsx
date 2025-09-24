import React, { useState } from 'react';
import '@/styles/backgrounds.css';
import '@/styles/gabonese-theme.css';
import '@/styles/minimalist-theme.css';

const News: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const articles = [
    {
      id: 1,
      title: 'CLOFAS 241 : L\'édition 2025 promet d\'être exceptionnelle',
      excerpt: 'Découvrez les nouveautés de cette édition qui célèbre l\'excellence de la mode gabonaise avec un thème fort : "Consommer local, porter notre identité".',
      content: 'L\'édition 2025 du CLOFAS 241 s\'annonce comme un événement majeur dans le paysage de la mode gabonaise. Avec un thème puissant "Consommer local, porter notre identité", cette édition mettra en lumière les créateurs qui transforment notre héritage culturel en créations contemporaines exceptionnelles.',
      category: 'clofas',
      date: '2024-09-24',
      author: 'Équipe CLOFAS',
      image: 'https://i.ibb.co/kV5WmdGZ/73b494d49a32.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Interview exclusive : Angèle Epouta, maître créatrice gabonaise',
      excerpt: 'Rencontre avec une figure emblématique de la mode gabonaise qui nous parle de sa vision de la haute couture locale.',
      content: 'Angèle Epouta, reconnue pour son excellence artistique et son savoir-faire artisanal exceptionnel, nous dévoile sa vision de la mode gabonaise et ses projets pour l\'avenir.',
      category: 'mode',
      date: '2024-09-20',
      author: 'Rédaction CLOFAS',
      image: 'https://i.ibb.co/JfKsLJP/01c8f4050da2.jpg',
      featured: false
    },
    {
      id: 3,
      title: 'Les tendances de la mode locale au Gabon en 2025',
      excerpt: 'Analyse des tendances émergentes dans la mode gabonaise et l\'impact de la consommation locale.',
      content: 'La mode gabonaise connaît un essor remarquable avec l\'émergence de nouveaux créateurs et l\'adoption croissante de la consommation locale. Cette analyse explore les tendances qui façonnent l\'avenir de la mode au Gabon.',
      category: 'mode',
      date: '2024-09-18',
      author: 'Expert Mode',
      image: 'https://i.ibb.co/vvCT2NV9/290f203a0fb8.jpg',
      featured: false
    },
    {
      id: 4,
      title: 'L\'impact culturel de la mode gabonaise sur la scène internationale',
      excerpt: 'Comment les créateurs gabonais exportent leur savoir-faire et influencent la mode mondiale.',
      content: 'La mode gabonaise gagne en reconnaissance internationale grâce au talent de nos créateurs qui réussissent à allier tradition ancestrale et innovation contemporaine.',
      category: 'culture',
      date: '2024-09-15',
      author: 'Culture Gabon',
      image: 'https://i.ibb.co/0VDmmp32/0e2ee56e1ae3.jpg',
      featured: false
    },
    {
      id: 5,
      title: 'Beitch Faro : Portrait d\'une visionnaire de la mode gabonaise',
      excerpt: 'Découvrez le parcours inspirant de la fondatrice du CLOFAS 241 et sa vision pour l\'avenir de la mode locale.',
      content: 'Beitch Faro, fondatrice et promotrice du CLOFAS 241, partage sa vision pour transformer l\'industrie de la mode au Gabon et promouvoir la consommation locale.',
      category: 'clofas',
      date: '2024-09-12',
      author: 'Équipe CLOFAS',
      image: 'https://i.ibb.co/ZpGx4QvL/245e81248d61.jpg',
      featured: false
    },
    {
      id: 6,
      title: 'Résumé de l\'édition 2024 : Un succès retentissant',
      excerpt: 'Retour sur les moments forts de l\'édition précédente qui a marqué un tournant dans la promotion de la mode locale.',
      content: 'L\'édition 2024 du CLOFAS a été un véritable succès avec la participation de 8 créateurs exceptionnels et plus de 200 créations présentées devant un public conquis.',
      category: 'clofas',
      date: '2024-09-10',
      author: 'Équipe CLOFAS',
      image: 'https://i.ibb.co/ymzt8frZ/1243d99b625e.jpg',
      featured: false
    }
  ];

  const categories = [
    { id: 'all', name: 'Tous les articles', count: articles.length },
    { id: 'clofas', name: 'Actu CLOFAS', count: articles.filter(a => a.category === 'clofas').length },
    { id: 'mode', name: 'Mode', count: articles.filter(a => a.category === 'mode').length },
    { id: 'culture', name: 'Culture', count: articles.filter(a => a.category === 'culture').length }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const featuredArticle = articles.find(article => article.featured);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative overflow-hidden news-section section-gabonese">
        <div className="background-overlay"></div>
        
        <div className="background-content container mx-auto px-4 py-20">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 gabonese-font animate-golden-shimmer">
              📰 Actualités & Blog
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto modern-font">
              🌟 <strong>Découvrez les dernières actualités</strong> de la mode gabonaise, 
              les interviews de nos créateurs et les tendances qui façonnent l'avenir de la mode locale.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2 bg-gabon-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📝</span>
                <span className="font-semibold">Articles exclusifs</span>
              </div>
              <div className="flex items-center gap-2 bg-sunset-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>🎤</span>
                <span className="font-semibold">Interviews créateurs</span>
              </div>
              <div className="flex items-center gap-2 bg-earth-gradient backdrop-blur-sm rounded-full px-6 py-3 border border-african-gold">
                <span>📈</span>
                <span className="font-semibold">Tendances mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article en vedette */}
      {featuredArticle && (
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 gabonese-font">
                <span className="text-gabon-green">⭐ Article</span> 
                <span className="text-african-gold mx-3">•</span>
                <span className="text-sunset-orange">En Vedette</span>
              </h2>
            </div>

            <div className="card-gabonese overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="h-64 lg:h-auto">
                  <img
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/600x400/00A651/FFFFFF?text=Article+en+Vedette';
                    }}
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-gabon-green text-white px-3 py-1 rounded-full text-sm font-bold">
                      ⭐ En vedette
                    </span>
                    <span className="text-sm text-gray-500">{featuredArticle.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 gabonese-font">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 mb-4 modern-font">
                    {featuredArticle.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Par {featuredArticle.author}</span>
                    <button className="btn-african px-4 py-2 rounded-lg text-sm">
                      Lire l'article
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filtres par catégorie */}
      <div className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-gabon-green text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Liste des articles */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map(article => (
              <div key={article.id} className="card-gabonese overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="h-48">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://via.placeholder.com/400x300/CCCCCC/000000?text=Image+non+disponible';
                    }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      article.category === 'clofas' ? 'bg-gabon-green text-white' :
                      article.category === 'mode' ? 'bg-sunset-orange text-white' :
                      'bg-earth-brown text-white'
                    }`}>
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                    <span className="text-sm text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-3 gabonese-font line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 modern-font line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Par {article.author}</span>
                    <button className="text-gabon-green hover:text-gabon-blue transition-colors text-sm font-medium">
                      Lire plus →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="text-center mt-12">
            <button className="btn-african px-8 py-3 rounded-full font-medium">
              Charger plus d'articles
            </button>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-gradient-to-r from-gabon-green to-sunset-orange py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto text-white">
            <h2 className="text-4xl font-bold mb-6">
              Restez informé(e)
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Abonnez-vous à notre newsletter pour recevoir les dernières actualités 
              de la mode gabonaise et les informations sur nos événements.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-gabon-green px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-all duration-300">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
