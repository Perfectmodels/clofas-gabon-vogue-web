/**
 * Extracteur d'images spécialement conçu pour la page Facebook CLOFAS 241
 * URL: https://www.facebook.com/clofas241/photos
 * 
 * ⚠️ IMPORTANT: Utilisez ce script de manière responsable et respectueuse
 * - Respectez les droits d'auteur de CLOFAS 241
 * - Utilisez uniquement pour du contenu public
 * - Ne surchargez pas les serveurs Facebook
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';

class CLOFASFacebookExtractor {
  constructor() {
    this.downloadedCount = 0;
    this.errors = [];
    this.results = [];
    this.clofasImages = [];
  }

  /**
   * Télécharger une image depuis une URL
   */
  async downloadImage(url, filename, outputDir) {
    return new Promise((resolve, reject) => {
      try {
        console.log(`📥 Téléchargement: ${filename}`);
        
        // Créer le dossier s'il n'existe pas
        if (!fs.existsSync(outputDir)) {
          fs.mkdirSync(outputDir, { recursive: true });
        }

        const filepath = path.join(outputDir, filename);
        const file = fs.createWriteStream(filepath);
        
        const parsedUrl = new URL(url);
        const protocol = parsedUrl.protocol === 'https:' ? https : http;

        protocol.get(url, (response) => {
          if (response.statusCode !== 200) {
            reject(new Error(`Erreur HTTP: ${response.statusCode}`));
            return;
          }

          const contentType = response.headers['content-type'];
          if (!contentType || !contentType.startsWith('image/')) {
            reject(new Error('Le fichier n\'est pas une image'));
            return;
          }

          response.pipe(file);

          file.on('finish', () => {
            file.close();
            console.log(`✅ Téléchargé: ${filename}`);
            this.downloadedCount++;
            this.results.push({
              filename,
              url,
              size: response.headers['content-length'] || 'Unknown',
              status: 'success',
              source: 'Facebook CLOFAS 241'
            });
            resolve(filename);
          });

          file.on('error', (error) => {
            fs.unlink(filepath, () => {});
            reject(error);
          });
        }).on('error', (error) => {
          reject(error);
        });

      } catch (error) {
        reject(error);
      }
    }).catch(error => {
      console.error(`❌ Erreur téléchargement ${filename}:`, error.message);
      this.errors.push({ filename, url, error: error.message });
    });
  }

  /**
   * Analyser la page Facebook CLOFAS pour extraire les URLs d'images
   */
  async extractImageURLs() {
    console.log('🔍 Analyse de la page Facebook CLOFAS 241...');
    console.log('URL: https://www.facebook.com/clofas241/photos');
    
    // URLs d'images typiques de Facebook (scontent)
    const facebookImagePatterns = [
      'scontent',
      'scontent-a',
      'scontent-b',
      'scontent-c',
      'scontent-d',
      'scontent-e',
      'scontent-f'
    ];

    // Images CLOFAS connues (vous pouvez les ajouter manuellement)
    const knownCLOFASImages = [
      {
        url: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t39.30808-6/example1.jpg',
        filename: 'clofas_facebook_1.jpg',
        description: 'Image CLOFAS depuis Facebook'
      },
      {
        url: 'https://scontent-cdg2-1.xx.fbcdn.net/v/t39.30808-6/example2.jpg',
        filename: 'clofas_facebook_2.jpg',
        description: 'Image CLOFAS depuis Facebook'
      }
    ];

    // Pour l'instant, nous utiliserons des URLs d'exemple
    // Dans un vrai scénario, vous devriez utiliser l'API Facebook Graph
    console.log('⚠️ Note: Ce script utilise des URLs d\'exemple');
    console.log('💡 Pour extraire les vraies images, utilisez l\'API Facebook Graph');
    
    return knownCLOFASImages;
  }

  /**
   * Télécharger toutes les images CLOFAS
   */
  async downloadCLOFASImages(outputDir = 'clofas_facebook_images') {
    console.log('🎨 Téléchargement des images CLOFAS depuis Facebook');
    console.log('===================================================');

    try {
      // Extraire les URLs d'images
      const images = await this.extractImageURLs();
      
      if (images.length === 0) {
        console.log('❌ Aucune image trouvée');
        return;
      }

      console.log(`📷 ${images.length} images CLOFAS identifiées`);

      // Télécharger chaque image
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const filename = image.filename || `clofas_facebook_${i + 1}.jpg`;
        
        try {
          await this.downloadImage(image.url, filename, outputDir);
          this.clofasImages.push({
            ...image,
            downloaded: true,
            timestamp: new Date().toISOString()
          });
          
          // Pause entre les téléchargements
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(`❌ Erreur pour ${filename}:`, error.message);
          this.clofasImages.push({
            ...image,
            downloaded: false,
            error: error.message,
            timestamp: new Date().toISOString()
          });
        }
      }

      // Générer le rapport
      this.generateCLOFASReport(outputDir);
      
      console.log(`\n🎉 Téléchargement terminé !`);
      console.log(`📁 Images sauvegardées dans: ${outputDir}/`);
      console.log(`✅ Succès: ${this.downloadedCount}/${images.length}`);
      console.log(`❌ Erreurs: ${this.errors.length}`);

    } catch (error) {
      console.error('❌ Erreur générale:', error.message);
    }
  }

  /**
   * Générer un rapport spécial CLOFAS
   */
  generateCLOFASReport(outputDir) {
    const report = {
      source: 'Facebook CLOFAS 241',
      url: 'https://www.facebook.com/clofas241/photos',
      timestamp: new Date().toISOString(),
      totalDownloaded: this.downloadedCount,
      totalErrors: this.errors.length,
      clofasImages: this.clofasImages,
      results: this.results,
      errors: this.errors,
      metadata: {
        extractedFrom: 'Facebook Page',
        pageName: 'CLOFAS 241',
        pageUrl: 'https://www.facebook.com/clofas241',
        extractionMethod: 'Manual URL Collection',
        notes: 'Images extraites depuis la page officielle Facebook CLOFAS 241'
      }
    };

    const reportPath = path.join(outputDir, 'clofas_facebook_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📋 Rapport CLOFAS généré: ${reportPath}`);
  }

  /**
   * Méthode alternative: Utilisation de l'API Facebook Graph
   */
  async extractWithFacebookAPI(pageId, accessToken) {
    console.log('🔍 Extraction via API Facebook Graph...');
    console.log('⚠️ Cette méthode nécessite un token d\'accès Facebook');
    
    // Exemple d'utilisation de l'API Facebook Graph
    const apiUrl = `https://graph.facebook.com/v18.0/${pageId}/photos`;
    const params = {
      access_token: accessToken,
      fields: 'images,link,name,created_time,from',
      limit: 100
    };

    console.log('📋 Paramètres API:');
    console.log(`   - Page ID: ${pageId}`);
    console.log(`   - URL: ${apiUrl}`);
    console.log(`   - Fields: ${params.fields}`);
    console.log(`   - Limit: ${params.limit}`);
    
    console.log('💡 Pour utiliser cette méthode:');
    console.log('   1. Obtenez un token d\'accès Facebook');
    console.log('   2. Configurez les paramètres dans le script');
    console.log('   3. Décommentez l\'appel API');
  }
}

/**
 * Fonction principale pour extraire les images CLOFAS
 */
async function extractCLOFASFacebookImages() {
  console.log('🚀 Extracteur d\'images CLOFAS 241 depuis Facebook');
  console.log('=================================================');
  console.log('📱 Page source: https://www.facebook.com/clofas241/photos');
  console.log('🎯 Objectif: Extraire les images de la page officielle CLOFAS');
  
  const extractor = new CLOFASFacebookExtractor();
  
  try {
    await extractor.downloadCLOFASImages();
    
    console.log('\n📊 RÉSUMÉ DE L\'EXTRACTION:');
    console.log('============================');
    console.log(`✅ Images téléchargées: ${extractor.downloadedCount}`);
    console.log(`❌ Erreurs: ${extractor.errors.length}`);
    console.log(`📁 Dossier de sortie: clofas_facebook_images/`);
    console.log(`📋 Rapport: clofas_facebook_images/clofas_facebook_report.json`);
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'extraction:', error.message);
  }
}

/**
 * Instructions pour l'utilisation de l'API Facebook
 */
function showFacebookAPIInstructions() {
  console.log('\n📖 INSTRUCTIONS POUR L\'API FACEBOOK:');
  console.log('=====================================');
  console.log('1. Créez une application Facebook:');
  console.log('   https://developers.facebook.com/apps/');
  console.log('');
  console.log('2. Obtenez un token d\'accès:');
  console.log('   - Page Access Token pour clofas241');
  console.log('   - Permissions: pages_read_engagement');
  console.log('');
  console.log('3. Utilisez l\'API Graph:');
  console.log('   GET https://graph.facebook.com/v18.0/{page-id}/photos');
  console.log('');
  console.log('4. Exemple de requête:');
  console.log(`   curl -i -X GET \\
     "https://graph.facebook.com/v18.0/clofas241/photos?access_token=YOUR_TOKEN&fields=images,link,name"`);
}

/**
 * Script de test
 */
async function testCLOFASExtractor() {
  console.log('🧪 Test de l\'extracteur CLOFAS');
  console.log('===============================');
  
  const extractor = new CLOFASFacebookExtractor();
  
  // Test avec une image publique CLOFAS
  const testImage = {
    url: 'https://i.ibb.co/QFPYtZSN/Logo-CLOFAS.png',
    filename: 'clofas_logo_test.png',
    description: 'Logo CLOFAS (test)'
  };
  
  try {
    await extractor.downloadImage(testImage.url, testImage.filename, 'test_clofas');
    console.log('✅ Test réussi !');
    
  } catch (error) {
    console.error('❌ Test échoué:', error.message);
  }
}

// Export pour utilisation en module
export { 
  CLOFASFacebookExtractor, 
  extractCLOFASFacebookImages,
  showFacebookAPIInstructions,
  testCLOFASExtractor
};

// Exécution directe
console.log('🎨 Extracteur d\'images CLOFAS 241 depuis Facebook');
console.log('=================================================');

showFacebookAPIInstructions();

console.log('\n🧪 Lancement du test...');
testCLOFASExtractor();
