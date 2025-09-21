import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, push } from 'firebase/database';
import { creators2024 } from '../components/creators/CreatorsData';

// Configuration Firebase
const firebaseConfig = {
  databaseURL: "https://pmmga-9f8a1-default-rtdb.firebaseio.com/"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Interface pour les données de créateur
interface CreatorData {
  id: string;
  name: string;
  country: string;
  images: string[];
}

// Interface pour les données Firebase
interface FirebaseCreator {
  name: string;
  country: string;
  bio: string;
  images: any[];
  featured: boolean;
  website: string;
  socialMedia: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// Interface pour les images Firebase
interface FirebaseImage {
  url: string;
  name: string;
  description: string;
  category: string;
  featured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// Fonction pour ajouter un créateur
async function addCreator(creatorData: CreatorData): Promise<string> {
  try {
    const now = new Date().toISOString();
    
    const firebaseCreator: FirebaseCreator = {
      name: creatorData.name,
      country: creatorData.country,
      bio: `Créateur de mode de ${creatorData.country}. Spécialisé dans la création de vêtements uniques et modernes.`,
      images: [],
      featured: false,
      website: '',
      socialMedia: {},
      createdAt: now,
      updatedAt: now
    };

    // Ajouter le créateur à Firebase
    const creatorsRef = ref(database, 'creators');
    const newCreatorRef = push(creatorsRef);
    await set(newCreatorRef, firebaseCreator);
    
    const creatorId = newCreatorRef.key;
    console.log(`✅ Créateur ${creatorData.name} ajouté avec l'ID: ${creatorId}`);

    // Ajouter les images si elles existent
    if (creatorData.images && creatorData.images.length > 0) {
      const imagesRef = ref(database, `creators/${creatorId}/images`);
      
      for (let i = 0; i < creatorData.images.length; i++) {
        const imageUrl = creatorData.images[i];
        const imageData: FirebaseImage = {
          url: imageUrl,
          name: `Image ${i + 1} de ${creatorData.name}`,
          description: `Photo de création de ${creatorData.name}`,
          category: 'création',
          featured: i === 0, // Première image mise en vedette
          tags: ['mode', 'création', creatorData.country.toLowerCase()],
          createdAt: now,
          updatedAt: now
        };

        const newImageRef = push(imagesRef);
        await set(newImageRef, imageData);
        console.log(`📸 Image ${i + 1} ajoutée pour ${creatorData.name}`);
      }
    }

    return creatorId!;
  } catch (error) {
    console.error(`❌ Erreur lors de l'ajout de ${creatorData.name}:`, error);
    throw error;
  }
}

// Fonction principale d'import
async function importAllStylists() {
  console.log('🚀 Début de l\'import des stylistes CLOFAS 2024...');
  console.log(`📊 ${creators2024.length} créateurs à importer`);
  
  const results = {
    success: 0,
    errors: 0,
    total: creators2024.length
  };

  for (let i = 0; i < creators2024.length; i++) {
    const creator = creators2024[i];
    console.log(`\n📝 Import ${i + 1}/${creators2024.length}: ${creator.name}`);
    
    try {
      await addCreator(creator);
      results.success++;
      console.log(`✅ ${creator.name} importé avec succès`);
    } catch (error) {
      results.errors++;
      console.error(`❌ Erreur pour ${creator.name}:`, error);
    }
    
    // Petite pause pour éviter de surcharger Firebase
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Import terminé !');
  console.log(`✅ Succès: ${results.success}`);
  console.log(`❌ Erreurs: ${results.errors}`);
  console.log(`📊 Total: ${results.total}`);
}

// Exporter la fonction pour utilisation
export { importAllStylists, addCreator };

// Si le script est exécuté directement
if (typeof window !== 'undefined') {
  // Dans le navigateur, on peut lier la fonction à window pour l'utiliser dans la console
  (window as any).importAllStylists = importAllStylists;
  (window as any).addCreator = addCreator;
  console.log('🔧 Script d\'import chargé. Utilisez:');
  console.log('- importAllStylists() pour importer tous les stylistes');
  console.log('- addCreator(creatorData) pour ajouter un styliste spécifique');
}
