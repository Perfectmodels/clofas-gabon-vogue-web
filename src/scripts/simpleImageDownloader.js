/**
 * Script simple de téléchargement d'images
 * Utilise uniquement les modules Node.js intégrés
 */

import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';
import { URL } from 'url';

class SimpleImageDownloader {
  constructor() {
    this.downloadedCount = 0;
    this.errors = [];
    this.results = [];
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
          // Vérifier le code de statut
          if (response.statusCode !== 200) {
            reject(new Error(`Erreur HTTP: ${response.statusCode}`));
            return;
          }

          // Vérifier le type de contenu
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
              status: 'success'
            });
            resolve(filename);
          });

          file.on('error', (error) => {
            fs.unlink(filepath, () => {}); // Supprimer le fichier partiellement téléchargé
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
   * Télécharger plusieurs images
   */
  async downloadMultiple(images, outputDir = 'downloaded_images') {
    console.log(`🚀 Début du téléchargement de ${images.length} images...`);
    
    for (let i = 0; i < images.length; i++) {
      const image = images[i];
      const filename = image.filename || `image_${i + 1}.jpg`;
      
      try {
        await this.downloadImage(image.url, filename, outputDir);
        // Petite pause entre les téléchargements pour éviter de surcharger le serveur
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.error(`❌ Erreur pour ${filename}:`, error.message);
      }
    }
    
    console.log(`\n📊 Résumé:`);
    console.log(`✅ Téléchargées: ${this.downloadedCount}/${images.length}`);
    console.log(`❌ Erreurs: ${this.errors.length}`);
    
    if (this.errors.length > 0) {
      console.log('\n❌ Erreurs détectées:');
      this.errors.forEach(error => {
        console.log(`   - ${error.filename}: ${error.error}`);
      });
    }
  }

  /**
   * Générer un rapport
   */
  generateReport(outputDir) {
    const report = {
      timestamp: new Date().toISOString(),
      totalDownloaded: this.downloadedCount,
      totalErrors: this.errors.length,
      results: this.results,
      errors: this.errors
    };

    const reportPath = path.join(outputDir, 'download_report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📋 Rapport généré: ${reportPath}`);
  }
}

/**
 * Images CLOFAS à télécharger (URLs publiques uniquement)
 */
const CLOFAS_IMAGES = [
  {
    url: 'https://i.ibb.co/QFPYtZSN/Logo-CLOFAS.png',
    filename: 'clofas-logo.png',
    description: 'Logo CLOFAS officiel'
  },
  {
    url: 'https://i.ibb.co/2zRKpF4/DSC-0273.jpg',
    filename: 'clofas-event-1.jpg',
    description: 'Événement CLOFAS'
  }
];

/**
 * Fonction principale
 */
async function downloadCLOFASImages() {
  console.log('🎨 Téléchargement des images CLOFAS');
  console.log('===================================');

  const downloader = new SimpleImageDownloader();
  
  try {
    await downloader.downloadMultiple(CLOFAS_IMAGES, 'clofas_images');
    downloader.generateReport('clofas_images');
    
    console.log('\n🎉 Téléchargement terminé !');
    console.log('📁 Images sauvegardées dans: clofas_images/');
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

/**
 * Télécharger depuis une liste d'URLs personnalisée
 */
async function downloadFromURLs(urls, outputDir = 'custom_images') {
  console.log(`📥 Téléchargement depuis ${urls.length} URLs`);
  
  const downloader = new SimpleImageDownloader();
  
  const images = urls.map((url, index) => ({
    url,
    filename: `image_${index + 1}.jpg`
  }));
  
  await downloader.downloadMultiple(images, outputDir);
  downloader.generateReport(outputDir);
}

/**
 * Exemples d'utilisation
 */
function showExamples() {
  console.log('\n📖 EXEMPLES D\'UTILISATION:');
  console.log('===========================');
  
  console.log('\n1. Télécharger les images CLOFAS:');
  console.log('   downloadCLOFASImages();');
  
  console.log('\n2. Télécharger depuis des URLs personnalisées:');
  console.log(`   const urls = [
     'https://example.com/image1.jpg',
     'https://example.com/image2.jpg'
   ];
   downloadFromURLs(urls, 'my_images');`);
  
  console.log('\n3. Télécharger une seule image:');
  console.log(`   const downloader = new SimpleImageDownloader();
   downloader.downloadImage('https://example.com/image.jpg', 'image.jpg', 'output');`);
}

/**
 * Script de test
 */
async function testDownloader() {
  console.log('🧪 Test du téléchargeur d\'images');
  console.log('=================================');
  
  const downloader = new SimpleImageDownloader();
  
  // Test avec une image simple
  const testImages = [
    {
      url: 'https://i.ibb.co/QFPYtZSN/Logo-CLOFAS.png',
      filename: 'test-logo.png'
    }
  ];
  
  try {
    await downloader.downloadMultiple(testImages, 'test_images');
    downloader.generateReport('test_images');
    
    console.log('\n✅ Test réussi !');
    
  } catch (error) {
    console.error('❌ Test échoué:', error.message);
  }
}

// Export pour utilisation en module
export { 
  SimpleImageDownloader, 
  downloadCLOFASImages, 
  downloadFromURLs,
  CLOFAS_IMAGES,
  testDownloader
};

// Exécution directe
console.log('🚀 Script de téléchargement d\'images CLOFAS');
console.log('============================================');

showExamples();

// Lancer le test
console.log('\n🧪 Lancement du test...');
testDownloader();
