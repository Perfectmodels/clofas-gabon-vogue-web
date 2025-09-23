/**
 * Script de téléchargement d'images depuis des URLs publiques
 * Version légale et éthique pour CLOFAS 241
 */

import fs from 'fs';
import path from 'path';
import axios from 'axios';

class ImageDownloader {
  constructor() {
    this.downloadedCount = 0;
    this.errors = [];
    this.results = [];
  }

  /**
   * Télécharger une image depuis une URL
   */
  async downloadImage(url, filename, outputDir) {
    try {
      console.log(`📥 Téléchargement: ${filename}`);
      
      const response = await axios.get(url, {
        responseType: 'stream',
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });

      // Créer le dossier s'il n'existe pas
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const filepath = path.join(outputDir, filename);
      const writer = fs.createWriteStream(filepath);
      
      response.data.pipe(writer);

      return new Promise((resolve, reject) => {
        writer.on('finish', () => {
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
        writer.on('error', (error) => {
          console.error(`❌ Erreur: ${filename}`, error.message);
          this.errors.push({ filename, url, error: error.message });
          reject(error);
        });
      });
    } catch (error) {
      console.error(`❌ Erreur téléchargement ${filename}:`, error.message);
      this.errors.push({ filename, url, error: error.message });
    }
  }

  /**
   * Télécharger plusieurs images
   */
  async downloadMultiple(images, outputDir = 'downloaded_images') {
    console.log(`🚀 Début du téléchargement de ${images.length} images...`);
    
    const downloadPromises = images.map((image, index) => {
      const filename = image.filename || `image_${index + 1}.jpg`;
      return this.downloadImage(image.url, filename, outputDir);
    });

    await Promise.all(downloadPromises);
    
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
  },
  // Ajoutez d'autres URLs d'images publiques ici
];

/**
 * Fonction principale
 */
async function downloadCLOFASImages() {
  console.log('🎨 Téléchargement des images CLOFAS');
  console.log('===================================');

  const downloader = new ImageDownloader();
  
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
  
  const downloader = new ImageDownloader();
  
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
  console.log(`   const downloader = new ImageDownloader();
   downloader.downloadImage('https://example.com/image.jpg', 'image.jpg', 'output');`);
}

// Export pour utilisation en module
export { 
  ImageDownloader, 
  downloadCLOFASImages, 
  downloadFromURLs,
  CLOFAS_IMAGES 
};

// Exécution directe
showExamples();

// Décommentez la ligne suivante pour télécharger les images CLOFAS
// downloadCLOFASImages();
