// Données d'images pour les créateurs CLOFAS 241
export interface CreatorImage {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  imageUrl: string;
  category: 'défilé' | 'backstage' | 'portrait' | 'collection';
  year: number;
  event: string;
  featured: boolean;
}

export const creatorImages: CreatorImage[] = [
  // Images pour Marie Ntsame
  {
    id: 'marie-1',
    creatorId: 'marie-ntsame',
    title: 'Collection Printemps 2024',
    description: 'Robe longue en wax gabonais avec motifs traditionnels',
    imageUrl: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=400&auto=format&fit=crop',
    category: 'défilé',
    year: 2024,
    event: 'CLOFAS 241 - Défilé Principal',
    featured: true
  },
  {
    id: 'marie-2',
    creatorId: 'marie-ntsame',
    title: 'Backstage - Préparation',
    description: 'Moment de préparation avant le défilé',
    imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=400&auto=format&fit=crop',
    category: 'backstage',
    year: 2024,
    event: 'CLOFAS 241 - Backstage',
    featured: false
  },
  {
    id: 'marie-3',
    creatorId: 'marie-ntsame',
    title: 'Portrait Créatrice',
    description: 'Portrait officiel de la créatrice',
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=400&auto=format&fit=crop',
    category: 'portrait',
    year: 2024,
    event: 'CLOFAS 241 - Portrait',
    featured: true
  },
  {
    id: 'marie-4',
    creatorId: 'marie-ntsame',
    title: 'Collection Été 2024',
    description: 'Ensemble moderne inspiré de la culture gabonaise',
    imageUrl: 'https://images.unsplash.com/photo-1564635864477-260a722a89ff?q=80&w=400&auto=format&fit=crop',
    category: 'collection',
    year: 2024,
    event: 'CLOFAS 241 - Collection Été',
    featured: false
  },

  // Images pour Alain Mbadinga
  {
    id: 'alain-1',
    creatorId: 'alain-mbadinga',
    title: 'Défilé Masculin 2024',
    description: 'Costume moderne avec influences traditionnelles',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    category: 'défilé',
    year: 2024,
    event: 'CLOFAS 241 - Défilé Masculin',
    featured: true
  },
  {
    id: 'alain-2',
    creatorId: 'alain-mbadinga',
    title: 'Atelier de Création',
    description: 'Processus de création en atelier',
    imageUrl: 'https://images.unsplash.com/photo-1521791055366-0d553872125f?q=80&w=400&auto=format&fit=crop',
    category: 'backstage',
    year: 2024,
    event: 'CLOFAS 241 - Atelier',
    featured: false
  },
  {
    id: 'alain-3',
    creatorId: 'alain-mbadinga',
    title: 'Portrait Designer',
    description: 'Portrait du designer en action',
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
    category: 'portrait',
    year: 2024,
    event: 'CLOFAS 241 - Portrait',
    featured: true
  },

  // Images pour Sophie Okou
  {
    id: 'sophie-1',
    creatorId: 'sophie-okou',
    title: 'Collection Accessoires',
    description: 'Créations d\'accessoires en matériaux locaux',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=400&auto=format&fit=crop',
    category: 'collection',
    year: 2024,
    event: 'CLOFAS 241 - Accessoires',
    featured: true
  },
  {
    id: 'sophie-2',
    creatorId: 'sophie-okou',
    title: 'Défilé Accessoires',
    description: 'Présentation des accessoires sur le podium',
    imageUrl: 'https://images.unsplash.com/photo-1495385794356-15371f348c31?q=80&w=400&auto=format&fit=crop',
    category: 'défilé',
    year: 2024,
    event: 'CLOFAS 241 - Défilé Accessoires',
    featured: false
  },
  {
    id: 'sophie-3',
    creatorId: 'sophie-okou',
    title: 'Portrait Créatrice',
    description: 'Portrait de la créatrice d\'accessoires',
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    category: 'portrait',
    year: 2024,
    event: 'CLOFAS 241 - Portrait',
    featured: true
  },

  // Images pour Jean-Pierre Mba
  {
    id: 'jp-1',
    creatorId: 'jean-pierre-mba',
    title: 'Collection Haute Couture',
    description: 'Pièces de haute couture inspirées du Gabon',
    imageUrl: 'https://images.unsplash.com/photo-1566479179817-c0d9d6d3e4f8?q=80&w=400&auto=format&fit=crop',
    category: 'défilé',
    year: 2024,
    event: 'CLOFAS 241 - Haute Couture',
    featured: true
  },
  {
    id: 'jp-2',
    creatorId: 'jean-pierre-mba',
    title: 'Atelier de Couture',
    description: 'Travail en atelier sur les pièces de haute couture',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=400&auto=format&fit=crop',
    category: 'backstage',
    year: 2024,
    event: 'CLOFAS 241 - Atelier Couture',
    featured: false
  },
  {
    id: 'jp-3',
    creatorId: 'jean-pierre-mba',
    title: 'Portrait Couturier',
    description: 'Portrait du couturier dans son atelier',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    category: 'portrait',
    year: 2024,
    event: 'CLOFAS 241 - Portrait',
    featured: true
  },

  // Images pour Fatou Diallo
  {
    id: 'fatou-1',
    creatorId: 'fatou-diallo',
    title: 'Collection Jeune Créateur',
    description: 'Créations innovantes de la nouvelle génération',
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop',
    category: 'défilé',
    year: 2024,
    event: 'CLOFAS 241 - Jeunes Créateurs',
    featured: true
  },
  {
    id: 'fatou-2',
    creatorId: 'fatou-diallo',
    title: 'Processus Créatif',
    description: 'Moment de création et d\'inspiration',
    imageUrl: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=400&auto=format&fit=crop',
    category: 'backstage',
    year: 2024,
    event: 'CLOFAS 241 - Création',
    featured: false
  },
  {
    id: 'fatou-3',
    creatorId: 'fatou-diallo',
    title: 'Portrait Jeune Créatrice',
    description: 'Portrait de la jeune créatrice prometteuse',
    imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    category: 'portrait',
    year: 2024,
    event: 'CLOFAS 241 - Portrait',
    featured: true
  }
];

// Fonction pour obtenir les images d'un créateur
export const getCreatorImages = (creatorId: string): CreatorImage[] => {
  return creatorImages.filter(image => image.creatorId === creatorId);
};

// Fonction pour obtenir les images mises en avant d'un créateur
export const getFeaturedCreatorImages = (creatorId: string): CreatorImage[] => {
  return creatorImages.filter(image => image.creatorId === creatorId && image.featured);
};

// Fonction pour obtenir les images par catégorie
export const getCreatorImagesByCategory = (creatorId: string, category: string): CreatorImage[] => {
  return creatorImages.filter(image => image.creatorId === creatorId && image.category === category);
};
