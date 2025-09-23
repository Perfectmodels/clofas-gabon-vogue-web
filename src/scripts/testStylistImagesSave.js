/**
 * Script de test pour vérifier la sauvegarde des images de stylistes
 * 
 * Ce script teste que les images uploadées par les stylistes
 * sont bien sauvegardées dans Firebase.
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get, push, remove } = require('firebase/database');

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

class StylistImagesTester {
  constructor() {
    this.results = [];
  }

  async testCreatorImagesSave() {
    console.log('🧪 Test de sauvegarde des images de créateurs...');
    
    try {
      const testCreatorId = 'creator-test-001';
      const testImageData = {
        name: 'Test Image Stylist',
        url: 'https://example.com/test-image.jpg',
        displayUrl: 'https://example.com/test-image.jpg',
        category: 'collection',
        tags: ['Test Stylist', 'CLOFAS 241', 'Mode Gabonaise'],
        size: '1024000',
        dimensions: '800x600',
        uploadDate: new Date().toISOString(),
        author: 'Test Stylist',
        alt: 'Test Image - Test Stylist',
        description: 'Image de test pour vérifier la sauvegarde',
        deleteUrl: '',
        creatorId: testCreatorId,
        year: new Date().getFullYear(),
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Sauvegarder l'image
      const newImageRef = push(ref(database, `creatorImages/${testCreatorId}`));
      const imageId = newImageRef.key;
      
      const imageWithId = {
        id: imageId,
        ...testImageData
      };

      await set(newImageRef, imageWithId);
      console.log('✅ Image sauvegardée avec ID:', imageId);
      
      // Vérifier que l'image a été sauvegardée
      const snapshot = await get(newImageRef);
      if (snapshot.exists()) {
        const savedImage = snapshot.val();
        
        this.results.push({
          test: 'CreatorImagesSave',
          success: true,
          details: {
            imageId,
            creatorId: testCreatorId,
            imageName: savedImage.name,
            url: savedImage.url
          },
          timestamp: new Date().toISOString()
        });
        
        console.log('✅ Image récupérée avec succès:', savedImage.name);
        
        // Nettoyer
        await remove(newImageRef);
        console.log('🧹 Image de test supprimée');
        
        return true;
      } else {
        throw new Error('Image non trouvée après sauvegarde');
      }
    } catch (error) {
      this.results.push({
        test: 'CreatorImagesSave',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Erreur test images créateurs:', error.message);
      return false;
    }
  }

  async testMultipleImagesSave() {
    console.log('🧪 Test de sauvegarde multiple d\'images...');
    
    try {
      const testCreatorId = 'creator-test-multiple';
      const testImages = [
        {
          name: 'Image 1',
          url: 'https://example.com/image1.jpg',
          category: 'collection',
          tags: ['Test Multiple'],
          size: '1024',
          dimensions: '800x600'
        },
        {
          name: 'Image 2',
          url: 'https://example.com/image2.jpg',
          category: 'collection',
          tags: ['Test Multiple'],
          size: '2048',
          dimensions: '1024x768'
        },
        {
          name: 'Image 3',
          url: 'https://example.com/image3.jpg',
          category: 'collection',
          tags: ['Test Multiple'],
          size: '512',
          dimensions: '400x300'
        }
      ];

      const savedImages = [];

      // Sauvegarder plusieurs images
      for (let i = 0; i < testImages.length; i++) {
        const imageData = {
          ...testImages[i],
          displayUrl: testImages[i].url,
          uploadDate: new Date().toISOString(),
          author: 'Test Multiple',
          alt: `${testImages[i].name} - Test Multiple`,
          description: `Image de test multiple ${i + 1}`,
          deleteUrl: '',
          creatorId: testCreatorId,
          year: new Date().getFullYear(),
          featured: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        const newImageRef = push(ref(database, `creatorImages/${testCreatorId}`));
        const imageId = newImageRef.key;
        
        const imageWithId = {
          id: imageId,
          ...imageData
        };

        await set(newImageRef, imageWithId);
        savedImages.push(imageId);
        
        console.log(`✅ Image ${i + 1} sauvegardée avec ID: ${imageId}`);
      }

      // Vérifier que toutes les images ont été sauvegardées
      const creatorImagesRef = ref(database, `creatorImages/${testCreatorId}`);
      const snapshot = await get(creatorImagesRef);
      
      if (snapshot.exists()) {
        const savedData = snapshot.val();
        const savedCount = Object.keys(savedData).length;
        
        if (savedCount === testImages.length) {
          this.results.push({
            test: 'MultipleImagesSave',
            success: true,
            details: {
              creatorId: testCreatorId,
              expectedCount: testImages.length,
              actualCount: savedCount,
              imageIds: savedImages
            },
            timestamp: new Date().toISOString()
          });
          
          console.log(`✅ ${savedCount} images sauvegardées avec succès`);
          
          // Nettoyer
          await remove(creatorImagesRef);
          console.log('🧹 Images de test multiples supprimées');
          
          return true;
        } else {
          throw new Error(`Nombre d'images incorrect: ${savedCount} au lieu de ${testImages.length}`);
        }
      } else {
        throw new Error('Aucune image trouvée après sauvegarde multiple');
      }
    } catch (error) {
      this.results.push({
        test: 'MultipleImagesSave',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Erreur test images multiples:', error.message);
      return false;
    }
  }

  async testImageUpdate() {
    console.log('🧪 Test de mise à jour d\'image...');
    
    try {
      const testCreatorId = 'creator-test-update';
      const originalImageData = {
        name: 'Image Originale',
        url: 'https://example.com/original.jpg',
        displayUrl: 'https://example.com/original.jpg',
        category: 'collection',
        tags: ['Test Update'],
        size: '1024',
        dimensions: '800x600',
        uploadDate: new Date().toISOString(),
        author: 'Test Update',
        alt: 'Image Originale',
        description: 'Image originale pour test de mise à jour',
        deleteUrl: '',
        creatorId: testCreatorId,
        year: new Date().getFullYear(),
        featured: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Créer l'image originale
      const newImageRef = push(ref(database, `creatorImages/${testCreatorId}`));
      const imageId = newImageRef.key;
      
      const imageWithId = {
        id: imageId,
        ...originalImageData
      };

      await set(newImageRef, imageWithId);
      console.log('✅ Image originale créée avec ID:', imageId);

      // Mettre à jour l'image
      const updatedData = {
        name: 'Image Mise à Jour',
        description: 'Description mise à jour',
        tags: ['Test Update', 'Updated'],
        featured: true,
        updatedAt: new Date().toISOString()
      };

      const updateRef = ref(database, `creatorImages/${testCreatorId}/${imageId}`);
      await set(updateRef, {
        ...imageWithId,
        ...updatedData
      });
      
      console.log('✅ Image mise à jour');

      // Vérifier la mise à jour
      const snapshot = await get(updateRef);
      if (snapshot.exists()) {
        const updatedImage = snapshot.val();
        
        if (updatedImage.name === 'Image Mise à Jour' && 
            updatedImage.featured === true &&
            updatedImage.tags.includes('Updated')) {
          
          this.results.push({
            test: 'ImageUpdate',
            success: true,
            details: {
              imageId,
              creatorId: testCreatorId,
              originalName: originalImageData.name,
              updatedName: updatedImage.name,
              featured: updatedImage.featured
            },
            timestamp: new Date().toISOString()
          });
          
          console.log('✅ Mise à jour vérifiée avec succès');
          
          // Nettoyer
          await remove(updateRef);
          console.log('🧹 Image de test mise à jour supprimée');
          
          return true;
        } else {
          throw new Error('La mise à jour ne correspond pas aux données attendues');
        }
      } else {
        throw new Error('Image non trouvée après mise à jour');
      }
    } catch (error) {
      this.results.push({
        test: 'ImageUpdate',
        success: false,
        error: error.message,
        timestamp: new Date().toISOString()
      });
      console.error('❌ Erreur test mise à jour image:', error.message);
      return false;
    }
  }

  async runAllTests() {
    console.log('🚀 Test de sauvegarde des images de stylistes');
    console.log('=============================================');
    
    const startTime = Date.now();
    
    await this.testCreatorImagesSave();
    await this.testMultipleImagesSave();
    await this.testImageUpdate();
    
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
      console.log(`${status} ${result.test}: ${result.success ? 'OK' : result.error}`);
    });
    
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
    const testRef = ref(database, 'test/stylist-images');
    await set(testRef, {
      timestamp: new Date().toISOString(),
      message: 'Test de connexion Firebase pour images stylistes'
    });
    
    const snapshot = await get(testRef);
    if (snapshot.exists()) {
      console.log('✅ Connexion Firebase: OK');
      await remove(testRef);
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
  console.log('🧪 Test de sauvegarde des images de stylistes CLOFAS 241');
  console.log('=======================================================');
  
  try {
    const connected = await testFirebaseConnection();
    
    if (connected) {
      const tester = new StylistImagesTester();
      const results = await tester.runAllTests();
      
      if (results.success) {
        console.log('\n🎉 Tous les tests ont réussi !');
        console.log('✅ Les images des stylistes se sauvegardent correctement dans Firebase');
        process.exit(0);
      } else {
        console.log('\n❌ Certains tests ont échoué');
        console.log('⚠️  Il y a un problème avec la sauvegarde des images');
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
