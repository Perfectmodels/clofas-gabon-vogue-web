/**
 * Script de test de la sauvegarde automatique
 * Version JavaScript pour Node.js
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, push } = require('firebase/database');

// Configuration Firebase de test
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

class AutoSaveTester {
  constructor() {
    this.results = [];
  }

  async testSiteSettings() {
    console.log('🧪 Test des paramètres de site...');
    
    try {
      const testData = {
        siteName: 'CLOFAS 241 - Test AutoSave',
        description: 'Test de sauvegarde automatique',
        lastUpdated: new Date().toISOString(),
        testMode: true
      };

      await set(ref(database, 'settings/test'), testData);
      
      const snapshot = await get(ref(database, 'settings/test'));
      if (snapshot.exists()) {
        this.results.push({
          component: 'SiteSettings',
          success: true,
          timestamp: new Date().toISOString()
        });
        console.log('✅ Paramètres de site: OK');
      } else {
        throw new Error('Données non trouvées après sauvegarde');
      }
    } catch (error) {
      this.results.push({
        component: 'SiteSettings',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Paramètres de site:', error.message);
    }
  }

  async testCreators() {
    console.log('🧪 Test des créateurs...');
    
    try {
      const testCreator = {
        name: 'Test Creator AutoSave',
        country: 'Gabon',
        bio: 'Créateur de test pour la sauvegarde automatique',
        images: [],
        featured: false,
        createdAt: new Date().toISOString(),
        testMode: true
      };

      const newCreatorRef = push(ref(database, 'creators'));
      await set(newCreatorRef, testCreator);
      
      const snapshot = await get(newCreatorRef);
      if (snapshot.exists()) {
        this.results.push({
          component: 'Creators',
          success: true,
          timestamp: new Date().toISOString()
        });
        console.log('✅ Créateurs: OK');
      } else {
        throw new Error('Créateur non trouvé après sauvegarde');
      }
    } catch (error) {
      this.results.push({
        component: 'Creators',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Créateurs:', error.message);
    }
  }

  async testImages() {
    console.log('🧪 Test des images...');
    
    try {
      const testImage = {
        name: 'Test Image AutoSave',
        url: 'https://example.com/test-image.jpg',
        category: 'test',
        tags: ['test', 'autosave'],
        featured: false,
        size: 1024,
        dimensions: { width: 800, height: 600 },
        uploadedAt: new Date().toISOString(),
        testMode: true
      };

      const newImageRef = push(ref(database, 'images'));
      await set(newImageRef, testImage);
      
      const snapshot = await get(newImageRef);
      if (snapshot.exists()) {
        this.results.push({
          component: 'Images',
          success: true,
          timestamp: new Date().toISOString()
        });
        console.log('✅ Images: OK');
      } else {
        throw new Error('Image non trouvée après sauvegarde');
      }
    } catch (error) {
      this.results.push({
        component: 'Images',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Images:', error.message);
    }
  }

  async testBackgroundSettings() {
    console.log('🧪 Test des paramètres d\'arrière-plan...');
    
    try {
      const testBackground = {
        selectedBackground: 'test-background',
        showBackground: true,
        overlayOpacity: 0.8,
        lastUpdated: new Date().toISOString(),
        testMode: true
      };

      await set(ref(database, 'settings/background/test'), testBackground);
      
      const snapshot = await get(ref(database, 'settings/background/test'));
      if (snapshot.exists()) {
        this.results.push({
          component: 'BackgroundSettings',
          success: true,
          timestamp: new Date().toISOString()
        });
        console.log('✅ Paramètres d\'arrière-plan: OK');
      } else {
        throw new Error('Paramètres d\'arrière-plan non trouvés après sauvegarde');
      }
    } catch (error) {
      this.results.push({
        component: 'BackgroundSettings',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Paramètres d\'arrière-plan:', error.message);
    }
  }

  async cleanup() {
    console.log('🧹 Nettoyage des données de test...');
    
    try {
      await set(ref(database, 'settings/test'), null);
      await set(ref(database, 'settings/background/test'), null);
      
      // Nettoyer les créateurs de test
      const creatorsSnapshot = await get(ref(database, 'creators'));
      if (creatorsSnapshot.exists()) {
        const creators = creatorsSnapshot.val();
        for (const [key, creator] of Object.entries(creators)) {
          if (creator.testMode) {
            await set(ref(database, `creators/${key}`), null);
          }
        }
      }
      
      // Nettoyer les images de test
      const imagesSnapshot = await get(ref(database, 'images'));
      if (imagesSnapshot.exists()) {
        const images = imagesSnapshot.val();
        for (const [key, image] of Object.entries(images)) {
          if (image.testMode) {
            await set(ref(database, `images/${key}`), null);
          }
        }
      }
      
      console.log('✅ Nettoyage terminé');
    } catch (error) {
      console.error('❌ Erreur lors du nettoyage:', error.message);
    }
  }

  async runAllTests() {
    console.log('🚀 Démarrage des tests de sauvegarde automatique');
    console.log('================================================');
    
    const startTime = Date.now();
    
    await this.testSiteSettings();
    await this.testCreators();
    await this.testImages();
    await this.testBackgroundSettings();
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    console.log('\n📊 RÉSULTATS DES TESTS');
    console.log('======================');
    
    const successCount = this.results.filter(r => r.success).length;
    const totalCount = this.results.length;
    
    console.log(`✅ Succès: ${successCount}/${totalCount}`);
    console.log(`⏱️  Durée: ${duration}ms`);
    console.log('');
    
    this.results.forEach(result => {
      const status = result.success ? '✅' : '❌';
      console.log(`${status} ${result.component}: ${result.success ? 'OK' : result.error}`);
    });
    
    await this.cleanup();
    
    console.log('\n🎉 Tests terminés !');
    
    return {
      success: successCount === totalCount,
      results: this.results,
      duration,
      summary: {
        total: totalCount,
        success: successCount,
        failed: totalCount - successCount
      }
    };
  }
}

async function testFirebaseConnection() {
  console.log('🔗 Test de connexion Firebase...');
  
  try {
    const testRef = ref(database, 'test/connection');
    await set(testRef, {
      timestamp: new Date().toISOString(),
      message: 'Test de connexion Firebase'
    });
    
    const snapshot = await get(testRef);
    if (snapshot.exists()) {
      console.log('✅ Connexion Firebase: OK');
      await set(testRef, null);
      return true;
    } else {
      throw new Error('Impossible de lire les données de test');
    }
  } catch (error) {
    console.error('❌ Connexion Firebase:', error.message);
    return false;
  }
}

// Exécution principale
async function main() {
  console.log('🧪 Test de sauvegarde automatique CLOFAS 241');
  console.log('============================================');
  
  try {
    const connected = await testFirebaseConnection();
    
    if (connected) {
      const tester = new AutoSaveTester();
      const results = await tester.runAllTests();
      
      if (results.success) {
        console.log('\n🎉 Tous les tests ont réussi !');
        process.exit(0);
      } else {
        console.log('\n❌ Certains tests ont échoué');
        process.exit(1);
      }
    } else {
      console.error('❌ Impossible de se connecter à Firebase');
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Erreur lors des tests:', error);
    process.exit(1);
  }
}

// Exécuter le script
main();
