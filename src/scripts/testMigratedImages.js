/**
 * Script de Test des Images Migrées
 * 
 * Ce script teste que les images migrées vers ImgBB sont accessibles
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class MigratedImagesTester {
  constructor() {
    this.jsonPath = path.join(__dirname, '../components/creators/clofas-cms-data.json');
    this.creatorsData = null;
    this.testResults = [];
  }

  loadCreatorsData() {
    try {
      const jsonContent = fs.readFileSync(this.jsonPath, 'utf8');
      this.creatorsData = JSON.parse(jsonContent);
      console.log('✅ Données des créateurs chargées');
      return true;
    } catch (error) {
      console.error('❌ Erreur lors du chargement du JSON:', error.message);
      return false;
    }
  }

  async testImageUrl(url) {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      return {
        url,
        accessible: response.ok,
        status: response.status,
        contentType: response.headers.get('content-type'),
        size: response.headers.get('content-length')
      };
    } catch (error) {
      return {
        url,
        accessible: false,
        error: error.message
      };
    }
  }

  async testAllImages() {
    console.log('\n🧪 Test des images migrées...');
    console.log('=============================');

    let totalImages = 0;
    let accessibleImages = 0;
    let failedImages = 0;

    for (const creator of this.creatorsData.creators) {
      if (creator.images && creator.images.length > 0) {
        console.log(`\n👤 ${creator.name}:`);
        
        for (const imageUrl of creator.images) {
          totalImages++;
          console.log(`   🔍 Test: ${imageUrl.substring(0, 50)}...`);
          
          const result = await this.testImageUrl(imageUrl);
          this.testResults.push({
            creator: creator.name,
            ...result
          });

          if (result.accessible) {
            accessibleImages++;
            console.log(`   ✅ Accessible (${result.status})`);
          } else {
            failedImages++;
            console.log(`   ❌ Inaccessible: ${result.error || result.status}`);
          }

          // Pause entre les tests pour éviter de surcharger les serveurs
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }
    }

    return { totalImages, accessibleImages, failedImages };
  }

  displayResults(results) {
    console.log('\n📊 RÉSULTATS DES TESTS');
    console.log('======================');
    console.log(`📸 Total d'images testées: ${results.totalImages}`);
    console.log(`✅ Images accessibles: ${results.accessibleImages}`);
    console.log(`❌ Images inaccessibles: ${results.failedImages}`);
    console.log(`📈 Taux de succès: ${((results.accessibleImages / results.totalImages) * 100).toFixed(1)}%`);

    if (results.failedImages > 0) {
      console.log('\n❌ IMAGES INACCESSIBLES:');
      this.testResults
        .filter(result => !result.accessible)
        .forEach(result => {
          console.log(`   ${result.creator}: ${result.url}`);
          console.log(`   Erreur: ${result.error || `HTTP ${result.status}`}`);
        });
    }

    if (results.accessibleImages > 0) {
      console.log('\n✅ IMAGES ACCESSIBLES:');
      this.testResults
        .filter(result => result.accessible)
        .slice(0, 5) // Afficher seulement les 5 premières
        .forEach(result => {
          console.log(`   ${result.creator}: ${result.url}`);
          console.log(`   Taille: ${result.size ? (result.size / 1024).toFixed(2) + ' KB' : 'Inconnue'}`);
        });
      
      if (results.accessibleImages > 5) {
        console.log(`   ... et ${results.accessibleImages - 5} autres images accessibles`);
      }
    }
  }

  saveTestReport(results) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(__dirname, `../../images-test-report-${timestamp}.json`);
    
    const report = {
      testDate: new Date().toISOString(),
      results: results,
      detailedResults: this.testResults,
      summary: {
        totalImages: results.totalImages,
        accessibleImages: results.accessibleImages,
        failedImages: results.failedImages,
        successRate: ((results.accessibleImages / results.totalImages) * 100).toFixed(1) + '%'
      }
    };

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Rapport de test sauvegardé: ${reportPath}`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du rapport:', error.message);
    }
  }

  generateTestSummary(results) {
    const summaryPath = path.join(__dirname, '../../IMAGES_TEST_SUMMARY.md');
    
    const summary = `# Test des Images Migrées - CLOFAS 241

## 📊 Résultats
- **Images testées**: ${results.totalImages}
- **Images accessibles**: ${results.accessibleImages}
- **Images inaccessibles**: ${results.failedImages}
- **Taux de succès**: ${((results.accessibleImages / results.totalImages) * 100).toFixed(1)}%

## 📸 Détails par Créateur
${this.creatorsData.creators.filter(c => c.images.length > 0).map(creator => {
  const creatorResults = this.testResults.filter(r => r.creator === creator.name);
  const accessible = creatorResults.filter(r => r.accessible).length;
  const total = creatorResults.length;
  
  return `### ${creator.name}
- **Images**: ${accessible}/${total} accessibles
- **Taux de succès**: ${((accessible / total) * 100).toFixed(1)}%`;
}).join('\n\n')}

## 🚀 Recommandations
${results.accessibleImages === results.totalImages ? 
  '✅ Toutes les images sont accessibles ! La migration est un succès complet.' :
  results.accessibleImages > results.totalImages * 0.8 ?
  '⚠️ La plupart des images sont accessibles. Vérifiez les images inaccessibles.' :
  '❌ Plusieurs images ne sont pas accessibles. Vérifiez la migration.'}

## 📁 Fichiers Générés
- \`images-test-report-[timestamp].json\`: Rapport détaillé
- \`IMAGES_TEST_SUMMARY.md\`: Ce résumé

---
*Test effectué le ${new Date().toLocaleString('fr-FR')}*
`;

    try {
      fs.writeFileSync(summaryPath, summary);
      console.log(`📄 Résumé créé: ${summaryPath}`);
    } catch (error) {
      console.error('Erreur lors de la création du résumé:', error.message);
    }
  }
}

// Fonction principale
async function main() {
  const tester = new MigratedImagesTester();
  
  console.log('🧪 TEST DES IMAGES MIGRÉES VERS IMGBB');
  console.log('====================================');
  console.log('');

  try {
    // Charger les données des créateurs
    if (!tester.loadCreatorsData()) {
      return;
    }

    // Tester toutes les images
    const results = await tester.testAllImages();

    // Afficher les résultats
    tester.displayResults(results);

    // Sauvegarder les rapports
    tester.saveTestReport(results);
    tester.generateTestSummary(results);

    console.log('\n🎉 TEST TERMINÉ !');
    console.log('================');
    console.log('✅ Les images migrées ont été testées');
    console.log('📄 Les rapports ont été générés');
    
    if (results.accessibleImages === results.totalImages) {
      console.log('\n🎊 PARFAIT ! Toutes les images sont accessibles !');
      console.log('💡 Vous pouvez maintenant nettoyer les images locales');
    } else {
      console.log('\n⚠️  Certaines images ne sont pas accessibles');
      console.log('💡 Vérifiez le rapport pour plus de détails');
    }

  } catch (error) {
    console.error('\n❌ Erreur lors du test:', error.message);
  }
}

// Lancer les tests
main();
