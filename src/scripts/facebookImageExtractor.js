/**
 * Script d'extraction d'images depuis Facebook
 * Spécialement conçu pour CLOFAS 241
 * 
 * ⚠️ ATTENTION: Utilisez ce script de manière responsable et respectueuse
 * - Respectez les droits d'auteur
 * - Ne surchargez pas les serveurs Facebook
 * - Utilisez uniquement pour du contenu public
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

class FacebookImageExtractor {
  constructor() {
    this.baseUrl = 'https://graph.facebook.com/v18.0';
    this.images = [];
    this.downloadedCount = 0;
    this.errors = [];
  }

  /**
   * Méthode 1: Utilisation de l'API Facebook Graph (Recommandée)
   */
  async extractWithAPI(pageId, accessToken) {
    console.log('🔍 Extraction via API Facebook Graph...');
    
    try {
      const response = await axios.get(`${this.baseUrl}/${pageId}/photos`, {
        params: {
          access_token: accessToken,
          fields: 'images,link,name,created_time,from',
          limit: 100
        }
      });

      const photos = response.data.data;
      console.log(`✅ ${photos.length} photos trouvées via l'API`);

      for (const photo of photos) {
        if (photo.images && photo.images.length > 0) {
          // Prendre l'image de plus haute qualité
          const bestImage = photo.images.reduce((prev, current) => 
            (current.width > prev.width) ? current : prev
          );

          this.images.push({
            url: bestImage.source,
            name: photo.name || `clofas_${Date.now()}`,
            width: bestImage.width,
            height: bestImage.height,
            created_time: photo.created_time,
            link: photo.link,
            method: 'api'
          });
        }
      }

      return this.images;
    } catch (error) {
      console.error('❌ Erreur API Facebook:', error.message);
      this.errors.push(`API Error: ${error.message}`);
      return [];
    }
  }

  /**
   * Méthode 2: Web Scraping (Alternative)
   */
  async extractWithScraping(pageUrl) {
    console.log('🔍 Extraction via Web Scraping...');
    
    try {
      // Simulation d'un navigateur
      const response = await axios.get(pageUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'fr-FR,fr;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Connection': 'keep-alive',
          'Upgrade-Insecure-Requests': '1'
        }
      });

      // Recherche des URLs d'images dans le HTML
      const imageRegex = /https:\/\/scontent[^"'\s]+\.jpg|https:\/\/scontent[^"'\s]+\.png/g;
      const matches = response.data.match(imageRegex);

      if (matches) {
        const uniqueImages = [...new Set(matches)];
        console.log(`✅ ${uniqueImages.length} images trouvées via scraping`);

        uniqueImages.forEach((url, index) => {
          this.images.push({
            url: url,
            name: `clofas_scraped_${index + 1}`,
            method: 'scraping'
          });
        });
      }

      return this.images;
    } catch (error) {
      console.error('❌ Erreur Web Scraping:', error.message);
      this.errors.push(`Scraping Error: ${error.message}`);
      return [];
    }
  }

  /**
   * Téléchargement des images
   */
  async downloadImages(outputDir = 'downloaded_facebook_images') {
    console.log('📥 Téléchargement des images...');
    
    // Créer le dossier de sortie
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const downloadPromises = this.images.map(async (image, index) => {
      try {
        const response = await axios.get(image.url, {
          responseType: 'stream',
          timeout: 30000
        });

        const extension = path.extname(image.url) || '.jpg';
        const filename = `${image.name}_${index + 1}${extension}`;
        const filepath = path.join(outputDir, filename);

        const writer = fs.createWriteStream(filepath);
        response.data.pipe(writer);

        return new Promise((resolve, reject) => {
          writer.on('finish', () => {
            console.log(`✅ Téléchargé: ${filename}`);
            this.downloadedCount++;
            resolve(filename);
          });
          writer.on('error', reject);
        });
      } catch (error) {
        console.error(`❌ Erreur téléchargement ${image.name}:`, error.message);
        this.errors.push(`Download Error ${image.name}: ${error.message}`);
      }
    });

    await Promise.all(downloadPromises);
    
    console.log(`\n📊 Résumé du téléchargement:`);
    console.log(`✅ Images téléchargées: ${this.downloadedCount}/${this.images.length}`);
    console.log(`❌ Erreurs: ${this.errors.length}`);
  }

  /**
   * Génération d'un rapport
   */
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      totalImages: this.images.length,
      downloadedCount: this.downloadedCount,
      errors: this.errors,
      images: this.images.map(img => ({
        name: img.name,
        url: img.url,
        method: img.method,
        dimensions: img.width && img.height ? `${img.width}x${img.height}` : 'Unknown'
      }))
    };

    const reportPath = 'facebook_extraction_report.json';
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📋 Rapport généré: ${reportPath}`);
    
    return report;
  }

  /**
   * Filtrage des images CLOFAS
   */
  filterCLOFASImages() {
    console.log('🔍 Filtrage des images CLOFAS...');
    
    const clofasKeywords = [
      'clofas', 'mode gabonaise', 'fashion show', 'libreville', 
      'beitch faro', 'créateurs', 'défilé', 'couture'
    ];

    const filteredImages = this.images.filter(image => {
      const searchText = `${image.name} ${image.link || ''}`.toLowerCase();
      return clofasKeywords.some(keyword => searchText.includes(keyword));
    });

    console.log(`✅ ${filteredImages.length} images CLOFAS identifiées`);
    return filteredImages;
  }
}

// Fonction principale
async function main() {
  console.log('🚀 Extracteur d\'images Facebook pour CLOFAS 241');
  console.log('================================================');

  const extractor = new FacebookImageExtractor();

  // Configuration
  const FACEBOOK_PAGE_ID = 'your_clofas_page_id'; // À remplacer
  const ACCESS_TOKEN = 'your_access_token'; // À remplacer
  const PAGE_URL = 'https://www.facebook.com/your_clofas_page'; // À remplacer

  try {
    // Méthode 1: API Facebook (si vous avez un token d'accès)
    if (ACCESS_TOKEN !== 'your_access_token') {
      await extractor.extractWithAPI(FACEBOOK_PAGE_ID, ACCESS_TOKEN);
    } else {
      console.log('⚠️ Token d\'accès non configuré, utilisation du scraping...');
      
      // Méthode 2: Web Scraping
      await extractor.extractWithScraping(PAGE_URL);
    }

    if (extractor.images.length === 0) {
      console.log('❌ Aucune image trouvée');
      return;
    }

    // Filtrage des images CLOFAS
    const clofasImages = extractor.filterCLOFASImages();

    // Téléchargement
    await extractor.downloadImages('clofas_facebook_images');

    // Génération du rapport
    extractor.generateReport();

    console.log('\n🎉 Extraction terminée avec succès !');
    console.log('📁 Images sauvegardées dans: clofas_facebook_images/');

  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

// Instructions d'utilisation
function showInstructions() {
  console.log('\n📖 INSTRUCTIONS D\'UTILISATION:');
  console.log('==============================');
  console.log('1. Obtenez un token d\'accès Facebook (recommandé)');
  console.log('2. Ou utilisez le mode scraping (moins fiable)');
  console.log('3. Configurez les variables dans le script');
  console.log('4. Exécutez: node facebookImageExtractor.js');
  console.log('\n⚠️ IMPORTANT:');
  console.log('- Respectez les droits d\'auteur');
  console.log('- Utilisez uniquement du contenu public');
  console.log('- Ne surchargez pas les serveurs Facebook');
  console.log('- Respectez les conditions d\'utilisation');
}

// Export pour utilisation en module
module.exports = { FacebookImageExtractor, main, showInstructions };

// Exécution directe
if (require.main === module) {
  showInstructions();
  // main(); // Décommentez pour exécuter
}
