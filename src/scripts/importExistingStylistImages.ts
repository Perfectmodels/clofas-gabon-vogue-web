/**
 * Script d'importation des images existantes des stylistes
 * 
 * Ce script importe les images déjà présentes dans le dossier creators/
 * vers Firebase pour les stylistes qui ont déjà des images dans le JSON.
 */

import { database } from '@/services/firebase';
import { ref, set, push } from 'firebase/database';

// Mapping des dossiers vers les IDs des créateurs dans le JSON
const folderToCreatorMapping = {
  'angele-epouta': 'creator-3',
  'angelina-creations': 'creator-4', 
  'atelier-isse-by-lita': 'creator-5',
  'beitch-faro': 'creator-11'
};

// Stylistes qui ont des images dans le dossier mais pas dans Firebase
const stylistsWithImages = [
  {
    id: 'creator-3',
    name: 'Angèle Epouta',
    folder: 'angele-epouta',
    images: [
      'Angele Epouta Creations (1).jpg',
      'Angele Epouta Creations (2).jpg',
      'Angele Epouta Creations (3).jpg',
      'Angele Epouta Creations (4).jpg',
      'Angele Epouta Creations (5).jpg',
      'Angele Epouta Creations (6).jpg',
      'Angele Epouta Creations (7).jpg',
      'Angele Epouta Creations (8).jpg',
      'Angele Epouta Creations (9).jpg',
      'Angele Epouta Creations (10).jpg',
      'Angele Epouta Creations (11).jpg',
      'Angele Epouta Creations (12).jpg',
      'Angele Epouta Creations (13).jpg',
      'Angele Epouta Creations (14).jpg',
      'Angele Epouta Creations (15).jpg',
      'Angele Epouta Creations (16).jpg',
      'Angele Epouta Creations (17).jpg',
      'Angele Epouta Creations (18).jpg'
    ]
  },
  {
    id: 'creator-4',
    name: 'Angelina Creations',
    folder: 'angelina-creations',
    images: [
      'Angelina Créations (1).jpg',
      'Angelina Créations (2).jpg',
      'Angelina Créations (3).jpg',
      'Angelina Créations (4).jpg',
      'Angelina Créations (5).jpg',
      'Angelina Créations (6).jpg',
      'Angelina Créations (7).jpg',
      'Angelina Créations (8).jpg',
      'Angelina Créations (9).jpg',
      'Angelina Créations (10).jpg',
      'Angelina Créations (11).jpg',
      'Angelina Créations (12).jpg',
      'Angelina Créations (13).jpg',
      'Angelina Créations (14).jpg',
      'Angelina Créations (15).jpg',
      'Angelina Créations (16).jpg',
      'Angelina Créations (17).jpg',
      'Angelina Créations (18).jpg',
      'Angelina Créations (19).jpg',
      'Angelina Créations (20).jpg'
    ]
  },
  {
    id: 'creator-5',
    name: 'L\'atelier Issé By Lita',
    folder: 'atelier-isse-by-lita',
    images: [
      'Atelier Issé By Lita (1).jpg',
      'Atelier Issé By Lita (2).jpg',
      'Atelier Issé By Lita (3).jpg',
      'Atelier Issé By Lita (4).jpg',
      'Atelier Issé By Lita (5).jpg',
      'Atelier Issé By Lita (6).jpg',
      'Atelier Issé By Lita (7).jpg',
      'Atelier Issé By Lita (8).jpg',
      'Atelier Issé By Lita (9).jpg',
      'Atelier Issé By Lita (10).jpg',
      'Atelier Issé By Lita (11).jpg',
      'Atelier Issé By Lita (12).jpg',
      'Atelier Issé By Lita (13).jpg',
      'Atelier Issé By Lita (14).jpg',
      'Atelier Issé By Lita (15).jpg'
    ]
  },
  {
    id: 'creator-11',
    name: 'Beitch Faro',
    folder: 'beitch-faro',
    images: [
      'Beitch Faro (1).jpg',
      'Beitch Faro (2).jpg',
      'Beitch Faro (3).jpg',
      'Beitch Faro (4).jpg',
      'Beitch Faro (5).jpg',
      'Beitch Faro (6).jpg',
      'Beitch Faro (7).jpg',
      'Beitch Faro (8).jpg',
      'Beitch Faro (9).jpg',
      'Beitch Faro (10).jpg',
      'Beitch Faro (11).jpg',
      'Beitch Faro (12).jpg',
      'Beitch Faro (13).jpg',
      'Beitch Faro (14).jpg',
      'Beitch Faro (15).jpg',
      'Beitch Faro (16).jpg',
      'Beitch Faro (17).jpg',
      'Beitch Faro (18).jpg',
      'Beitch Faro (19).jpg',
      'Beitch Faro (20).jpg',
      'Beitch Faro (21).jpg',
      'Beitch Faro (22).jpg',
      'Beitch Faro (23).jpg',
      'Beitch Faro (24).jpg',
      'Beitch Faro (25).jpg',
      'Beitch Faro (26).jpg',
      'Beitch Faro (27).jpg',
      'Beitch Faro (28).jpg',
      'Beitch Faro (29).jpg',
      'Beitch Faro (30).jpg',
      'Beitch Faro (31).jpg',
      'Beitch Faro (32).jpg',
      'Beitch Faro (33).jpg',
      'Beitch Faro (34).jpg',
      'Beitch Faro (35).jpg',
      'Beitch Faro (36).jpg',
      'Beitch Faro (37).jpg',
      'Beitch Faro (38).jpg',
      'Beitch Faro (39).jpg',
      'Beitch Faro (40).jpg',
      'Beitch Faro (41).jpg',
      'Beitch Faro (42).jpg',
      'Beitch Faro (43).jpg',
      'Beitch Faro (44).jpg',
      'Beitch Faro (45).jpg'
    ]
  }
];

/**
 * Génère l'URL locale d'une image
 */
function getLocalImageUrl(folder: string, filename: string): string {
  return `/creators/${folder}/${filename}`;
}

/**
 * Importe les images d'un styliste vers Firebase
 */
async function importStylistImages(stylist: typeof stylistsWithImages[0]): Promise<void> {
  console.log(`🔄 Importation des images pour ${stylist.name}...`);
  
  const imageUrls = stylist.images.map(filename => 
    getLocalImageUrl(stylist.folder, filename)
  );
  
  try {
    // Mettre à jour le créateur avec ses images
    const creatorRef = ref(database, `creators/${stylist.id}`);
    await set(creatorRef, {
      id: stylist.id,
      name: stylist.name,
      images: imageUrls,
      updatedAt: new Date().toISOString()
    });
    
    console.log(`✅ ${stylist.name}: ${imageUrls.length} images importées`);
  } catch (error) {
    console.error(`❌ Erreur lors de l'importation pour ${stylist.name}:`, error);
    throw error;
  }
}

/**
 * Importe toutes les images existantes
 */
export async function importAllExistingImages(): Promise<void> {
  console.log('🚀 Début de l\'importation des images existantes...');
  console.log('================================================');
  
  let totalImages = 0;
  let successCount = 0;
  
  for (const stylist of stylistsWithImages) {
    try {
      await importStylistImages(stylist);
      totalImages += stylist.images.length;
      successCount++;
    } catch (error) {
      console.error(`❌ Échec de l'importation pour ${stylist.name}`);
    }
  }
  
  console.log('\n📊 Résumé de l\'importation:');
  console.log(`✅ Stylistes traités avec succès: ${successCount}/${stylistsWithImages.length}`);
  console.log(`📷 Total d'images importées: ${totalImages}`);
  
  if (successCount === stylistsWithImages.length) {
    console.log('🎉 Importation terminée avec succès !');
  } else {
    console.log('⚠️ Importation terminée avec des erreurs');
  }
}

/**
 * Vérifie quelles images sont déjà présentes
 */
export function checkExistingImages(): void {
  console.log('🔍 Vérification des images existantes...');
  console.log('==========================================');
  
  stylistsWithImages.forEach(stylist => {
    console.log(`\n📁 ${stylist.name} (${stylist.folder}):`);
    console.log(`   📷 Nombre d'images: ${stylist.images.length}`);
    console.log(`   📂 Dossier: /creators/${stylist.folder}/`);
    console.log(`   🔗 Exemple d'URL: ${getLocalImageUrl(stylist.folder, stylist.images[0])}`);
  });
  
  const totalImages = stylistsWithImages.reduce((sum, stylist) => sum + stylist.images.length, 0);
  console.log(`\n📊 Total: ${totalImages} images dans ${stylistsWithImages.length} dossiers`);
}

/**
 * Fonction de test pour vérifier l'importation
 */
export function testImportExistingImages() {
  console.log('🧪 Test d\'importation des images existantes');
  console.log('============================================');
  
  checkExistingImages();
  
  console.log('\n🎯 Stylistes avec images disponibles:');
  stylistsWithImages.forEach((stylist, index) => {
    console.log(`${index + 1}. ${stylist.name}`);
    console.log(`   - Dossier: ${stylist.folder}`);
    console.log(`   - Images: ${stylist.images.length}`);
    console.log(`   - ID Firebase: ${stylist.id}`);
  });
  
  console.log('\n🚀 Pour lancer l\'importation:');
  console.log('importAllExistingImages().then(() => console.log("Importation terminée"))');
  
  return {
    stylistsCount: stylistsWithImages.length,
    totalImages: stylistsWithImages.reduce((sum, s) => sum + s.images.length, 0),
    stylists: stylistsWithImages.map(s => ({
      name: s.name,
      folder: s.folder,
      imageCount: s.images.length
    }))
  };
}

// Export par défaut
export default {
  stylistsWithImages,
  importAllExistingImages,
  checkExistingImages,
  testImportExistingImages,
  getLocalImageUrl
};
