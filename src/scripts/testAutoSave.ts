/**
 * Script de test pour vérifier la sauvegarde automatique
 * 
 * Ce script teste tous les composants admin pour s'assurer que
 * la sauvegarde automatique fonctionne correctement.
 */

import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, push, child } from 'firebase/database';

// Configuration Firebase (utilisez votre vraie configuration)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

interface TestResult {
  component: string;
  success: boolean;
  error?: string;
  timestamp: string;
}

class AutoSaveTester {
  private results: TestResult[] = [];

  /**
   * Tester la sauvegarde des paramètres de site
   */
  async testSiteSettings() {
    console.log('🧪 Test des paramètres de site...');
    
    try {
      const testData = {
        siteName: 'CLOFAS 241 - Test',
        description: 'Test de sauvegarde automatique',
        lastUpdated: new Date().toISOString(),
        testMode: true
      };

      await set(ref(database, 'settings/test'), testData);
      
      // Vérifier que les données ont été sauvegardées
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
    } catch (error: any) {
      this.results.push({
        component: 'SiteSettings',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Paramètres de site:', error.message);
    }
  }

  /**
   * Tester la sauvegarde des créateurs
   */
  async testCreators() {
    console.log('🧪 Test des créateurs...');
    
    try {
      const testCreator = {
        name: 'Test Creator',
        country: 'Gabon',
        bio: 'Créateur de test pour la sauvegarde automatique',
        images: [],
        featured: false,
        createdAt: new Date().toISOString(),
        testMode: true
      };

      const newCreatorRef = push(ref(database, 'creators'));
      await set(newCreatorRef, testCreator);
      
      // Vérifier la sauvegarde
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
    } catch (error: any) {
      this.results.push({
        component: 'Creators',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Créateurs:', error.message);
    }
  }

  /**
   * Tester la sauvegarde des images
   */
  async testImages() {
    console.log('🧪 Test des images...');
    
    try {
      const testImage = {
        name: 'Test Image',
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
      
      // Vérifier la sauvegarde
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
    } catch (error: any) {
      this.results.push({
        component: 'Images',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Images:', error.message);
    }
  }

  /**
   * Tester la sauvegarde des paramètres d'arrière-plan
   */
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
      
      // Vérifier la sauvegarde
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
    } catch (error: any) {
      this.results.push({
        component: 'BackgroundSettings',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Paramètres d\'arrière-plan:', error.message);
    }
  }

  /**
   * Tester la sauvegarde du contenu
   */
  async testContent() {
    console.log('🧪 Test du contenu...');
    
    try {
      const testContent = {
        hero: {
          title: 'Test Hero Title',
          subtitle: 'Test Hero Subtitle',
          description: 'Test de sauvegarde automatique du contenu',
          ctaText: 'Test CTA',
          ctaLink: '/test'
        },
        about: {
          title: 'Test About',
          description: 'Test description',
          mission: 'Test mission',
          vision: 'Test vision',
          values: ['Test Value 1', 'Test Value 2']
        },
        lastUpdated: new Date().toISOString(),
        testMode: true
      };

      await set(ref(database, 'content/test'), testContent);
      
      // Vérifier la sauvegarde
      const snapshot = await get(ref(database, 'content/test'));
      if (snapshot.exists()) {
        this.results.push({
          component: 'Content',
          success: true,
          timestamp: new Date().toISOString()
        });
        console.log('✅ Contenu: OK');
      } else {
        throw new Error('Contenu non trouvé après sauvegarde');
      }
    } catch (error: any) {
      this.results.push({
        component: 'Content',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Contenu:', error.message);
    }
  }

  /**
   * Nettoyer les données de test
   */
  async cleanup() {
    console.log('🧹 Nettoyage des données de test...');
    
    try {
      // Supprimer toutes les données de test
      await set(ref(database, 'settings/test'), null);
      await set(ref(database, 'settings/background/test'), null);
      await set(ref(database, 'content/test'), null);
      
      // Supprimer les créateurs de test
      const creatorsSnapshot = await get(ref(database, 'creators'));
      if (creatorsSnapshot.exists()) {
        const creators = creatorsSnapshot.val();
        for (const [key, creator] of Object.entries(creators)) {
          if ((creator as any).testMode) {
            await set(ref(database, `creators/${key}`), null);
          }
        }
      }
      
      // Supprimer les images de test
      const imagesSnapshot = await get(ref(database, 'images'));
      if (imagesSnapshot.exists()) {
        const images = imagesSnapshot.val();
        for (const [key, image] of Object.entries(images)) {
          if ((image as any).testMode) {
            await set(ref(database, `images/${key}`), null);
          }
        }
      }
      
      console.log('✅ Nettoyage terminé');
    } catch (error: any) {
      console.error('❌ Erreur lors du nettoyage:', error.message);
    }
  }

  /**
   * Exécuter tous les tests
   */
  async runAllTests() {
    console.log('🚀 Démarrage des tests de sauvegarde automatique');
    console.log('================================================');
    
    const startTime = Date.now();
    
    await this.testSiteSettings();
    await this.testCreators();
    await this.testImages();
    await this.testBackgroundSettings();
    await this.testContent();
    
    const endTime = Date.now();
    const duration = endTime - startTime;
    
    // Afficher les résultats
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
    
    // Nettoyer les données de test
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

/**
 * Fonction principale
 */
export async function testAutoSaveSystem() {
  const tester = new AutoSaveTester();
  return await tester.runAllTests();
}

/**
 * Test rapide de connexion Firebase
 */
export async function testFirebaseConnection() {
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
      await set(testRef, null); // Nettoyer
      return true;
    } else {
      throw new Error('Impossible de lire les données de test');
    }
  } catch (error: any) {
    console.error('❌ Connexion Firebase:', error.message);
    return false;
  }
}

// Exécution directe si le script est appelé directement
if (require.main === module) {
  console.log('🧪 Test de sauvegarde automatique CLOFAS 241');
  console.log('============================================');
  
  testFirebaseConnection()
    .then(connected => {
      if (connected) {
        return testAutoSaveSystem();
      } else {
        console.error('❌ Impossible de se connecter à Firebase');
        process.exit(1);
      }
    })
    .then(results => {
      if (results.success) {
        console.log('\n🎉 Tous les tests ont réussi !');
        process.exit(0);
      } else {
        console.log('\n❌ Certains tests ont échoué');
        process.exit(1);
      }
    })
    .catch(error => {
      console.error('❌ Erreur lors des tests:', error);
      process.exit(1);
    });
}
