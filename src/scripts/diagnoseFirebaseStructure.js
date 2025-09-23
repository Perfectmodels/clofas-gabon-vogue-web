/**
 * Script de diagnostic de la structure Firebase
 * 
 * Ce script vérifie la structure de la base de données Firebase
 * pour s'assurer que les images des stylistes sont bien sauvegardées.
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, get } = require('firebase/database');

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "clofas-gabon-vogue.firebaseapp.com",
  databaseURL: "https://clofas-gabon-vogue-default-rtdb.firebaseio.com",
  projectId: "clofas-gabon-vogue",
  storageBucket: "clofas-gabon-vogue.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdefghijklmnop"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

class FirebaseDiagnostic {
  constructor() {
    this.structure = {};
  }

  async checkCreatorImagesStructure() {
    console.log('🔍 Vérification de la structure creatorImages...');
    
    try {
      const creatorImagesRef = ref(database, 'creatorImages');
      const snapshot = await get(creatorImagesRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const creatorIds = Object.keys(data);
        
        console.log(`✅ Structure creatorImages trouvée:`);
        console.log(`   - Nombre de créateurs: ${creatorIds.length}`);
        
        let totalImages = 0;
        const creatorDetails = [];
        
        for (const creatorId of creatorIds) {
          const creatorData = data[creatorId];
          if (creatorData && typeof creatorData === 'object') {
            const imageIds = Object.keys(creatorData);
            const imageCount = imageIds.length;
            totalImages += imageCount;
            
            creatorDetails.push({
              creatorId,
              imageCount,
              firstImageName: creatorData[imageIds[0]]?.name || 'Inconnu'
            });
            
            console.log(`   - ${creatorId}: ${imageCount} images`);
          }
        }
        
        console.log(`   - Total d'images: ${totalImages}`);
        
        this.structure.creatorImages = {
          exists: true,
          creatorCount: creatorIds.length,
          totalImages,
          creators: creatorDetails
        };
        
        return true;
      } else {
        console.log('❌ Structure creatorImages non trouvée');
        this.structure.creatorImages = { exists: false };
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification creatorImages:', error.message);
      this.structure.creatorImages = { error: error.message };
      return false;
    }
  }

  async checkSettingsStructure() {
    console.log('🔍 Vérification de la structure settings...');
    
    try {
      const settingsRef = ref(database, 'settings');
      const snapshot = await get(settingsRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const settingKeys = Object.keys(data);
        
        console.log(`✅ Structure settings trouvée:`);
        console.log(`   - Clés de configuration: ${settingKeys.join(', ')}`);
        
        this.structure.settings = {
          exists: true,
          keys: settingKeys,
          hasBackground: 'background' in data,
          hasContent: 'content' in data,
          hasColors: 'colors' in data
        };
        
        return true;
      } else {
        console.log('❌ Structure settings non trouvée');
        this.structure.settings = { exists: false };
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification settings:', error.message);
      this.structure.settings = { error: error.message };
      return false;
    }
  }

  async checkImagesStructure() {
    console.log('🔍 Vérification de la structure images...');
    
    try {
      const imagesRef = ref(database, 'images');
      const snapshot = await get(imagesRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const imageIds = Object.keys(data);
        
        console.log(`✅ Structure images trouvée:`);
        console.log(`   - Nombre d'images: ${imageIds.length}`);
        
        this.structure.images = {
          exists: true,
          count: imageIds.length
        };
        
        return true;
      } else {
        console.log('❌ Structure images non trouvée');
        this.structure.images = { exists: false };
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification images:', error.message);
      this.structure.images = { error: error.message };
      return false;
    }
  }

  async checkCreatorsStructure() {
    console.log('🔍 Vérification de la structure creators...');
    
    try {
      const creatorsRef = ref(database, 'creators');
      const snapshot = await get(creatorsRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const creatorIds = Object.keys(data);
        
        console.log(`✅ Structure creators trouvée:`);
        console.log(`   - Nombre de créateurs: ${creatorIds.length}`);
        
        this.structure.creators = {
          exists: true,
          count: creatorIds.length
        };
        
        return true;
      } else {
        console.log('❌ Structure creators non trouvée');
        this.structure.creators = { exists: false };
        return false;
      }
    } catch (error) {
      console.error('❌ Erreur lors de la vérification creators:', error.message);
      this.structure.creators = { error: error.message };
      return false;
    }
  }

  async checkSpecificCreatorImages(creatorId) {
    console.log(`🔍 Vérification des images pour le créateur: ${creatorId}`);
    
    try {
      const creatorImagesRef = ref(database, `creatorImages/${creatorId}`);
      const snapshot = await get(creatorImagesRef);
      
      if (snapshot.exists()) {
        const data = snapshot.val();
        const imageIds = Object.keys(data);
        
        console.log(`✅ Images trouvées pour ${creatorId}:`);
        console.log(`   - Nombre d'images: ${imageIds.length}`);
        
        if (imageIds.length > 0) {
          const firstImage = data[imageIds[0]];
          console.log(`   - Première image: ${firstImage.name}`);
          console.log(`   - URL: ${firstImage.url}`);
          console.log(`   - Catégorie: ${firstImage.category}`);
          console.log(`   - Tags: ${firstImage.tags?.join(', ')}`);
        }
        
        return {
          exists: true,
          count: imageIds.length,
          images: data
        };
      } else {
        console.log(`❌ Aucune image trouvée pour ${creatorId}`);
        return { exists: false };
      }
    } catch (error) {
      console.error(`❌ Erreur lors de la vérification de ${creatorId}:`, error.message);
      return { error: error.message };
    }
  }

  async runFullDiagnostic() {
    console.log('🚀 Diagnostic complet de la structure Firebase');
    console.log('=============================================');
    
    const startTime = Date.now();
    
    await this.checkCreatorImagesStructure();
    await this.checkSettingsStructure();
    await this.checkImagesStructure();
    await this.checkCreatorsStructure();
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log('\n📊 RÉSUMÉ DU DIAGNOSTIC');
    console.log('=======================');
    
    console.log('Structure Firebase:');
    console.log(`- creatorImages: ${this.structure.creatorImages?.exists ? '✅ Trouvé' : '❌ Manquant'}`);
    console.log(`- settings: ${this.structure.settings?.exists ? '✅ Trouvé' : '❌ Manquant'}`);
    console.log(`- images: ${this.structure.images?.exists ? '✅ Trouvé' : '❌ Manquant'}`);
    console.log(`- creators: ${this.structure.creators?.exists ? '✅ Trouvé' : '❌ Manquant'}`);
    
    if (this.structure.creatorImages?.exists) {
      console.log(`\nImages de créateurs:`);
      console.log(`- Créateurs: ${this.structure.creatorImages.creatorCount}`);
      console.log(`- Total images: ${this.structure.creatorImages.totalImages}`);
    }
    
    console.log(`\n⏱️  Durée du diagnostic: ${duration}ms`);
    
    return {
      structure: this.structure,
      duration,
      timestamp: new Date().toISOString()
    };
  }

  async checkSpecificCreators() {
    console.log('\n🔍 Vérification des créateurs spécifiques...');
    
    const testCreators = [
      'creator-0', // Lady Riaba
      'creator-1', // Madame Luc-Abiale
      'creator-2', // Belle Soeur
      'creator-3', // Angèle Epouta
      'creator-4', // Angelina Creations
      'creator-5', // L'atelier Issé By Lita
      'creator-11' // Beitch Faro
    ];
    
    const results = {};
    
    for (const creatorId of testCreators) {
      results[creatorId] = await this.checkSpecificCreatorImages(creatorId);
    }
    
    return results;
  }
}

async function testFirebaseConnection() {
  console.log('🔗 Test de connexion Firebase...');
  
  try {
    const testRef = ref(database, 'test/diagnostic');
    const snapshot = await get(testRef);
    console.log('✅ Connexion Firebase: OK');
    return true;
  } catch (error) {
    console.error('❌ Connexion Firebase:', error.message);
    return false;
  }
}

// Exécution principale
async function main() {
  console.log('🧪 Diagnostic de la structure Firebase CLOFAS 241');
  console.log('================================================');
  
  try {
    const connected = await testFirebaseConnection();
    
    if (connected) {
      const diagnostic = new FirebaseDiagnostic();
      
      // Diagnostic complet
      const fullResults = await diagnostic.runFullDiagnostic();
      
      // Vérification des créateurs spécifiques
      const creatorResults = await diagnostic.checkSpecificCreators();
      
      console.log('\n🎉 Diagnostic terminé !');
      console.log('📋 Utilisez ces informations pour vérifier la structure de votre base de données Firebase.');
      
    } else {
      console.error('❌ Impossible de se connecter à Firebase');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erreur lors du diagnostic:', error);
    process.exit(1);
  }
}

// Exécuter le script
main();
