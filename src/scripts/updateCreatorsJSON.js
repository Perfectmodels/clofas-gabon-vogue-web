/**
 * Script de Mise à Jour du JSON des Créateurs
 * 
 * Ce script met à jour le fichier clofas-cms-data.json avec les nouvelles URLs ImgBB
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CreatorsJSONUpdater {
  constructor() {
    this.jsonPath = path.join(__dirname, '../components/creators/clofas-cms-data.json');
    this.migrationReportPath = path.join(__dirname, '../../migration-report-2025-09-23T23-48-00-360Z.json');
    this.creatorsData = null;
    this.migrationData = null;
    this.updates = [];
  }

  loadData() {
    try {
      // Charger les données des créateurs
      const jsonContent = fs.readFileSync(this.jsonPath, 'utf8');
      this.creatorsData = JSON.parse(jsonContent);
      console.log('✅ Données des créateurs chargées');

      // Charger le rapport de migration
      const migrationContent = fs.readFileSync(this.migrationReportPath, 'utf8');
      this.migrationData = JSON.parse(migrationContent);
      console.log('✅ Données de migration chargées');

      return true;
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données:', error.message);
      return false;
    }
  }

  createMappingFromMigration() {
    console.log('\n🔗 Création du mapping des URLs...');
    
    const urlMapping = {};
    
    // Créer un mapping des chemins originaux vers les URLs ImgBB
    Object.values(this.migrationData.results).forEach(result => {
      if (result.imgbbUrl) {
        // Extraire le chemin relatif (sans /creators/)
        const relativePath = result.originalPath.replace(/.*[\\\/]creators[\\\/]/, '');
        const normalizedPath = relativePath.replace(/\\/g, '/');
        
        urlMapping[normalizedPath] = {
          imgbbUrl: result.imgbbUrl,
          displayUrl: result.displayUrl,
          size: result.size,
          width: result.width,
          height: result.height
        };
      }
    });

    console.log(`📊 ${Object.keys(urlMapping).length} URLs mappées`);
    return urlMapping;
  }

  updateCreatorsImages(urlMapping) {
    console.log('\n🔄 Mise à jour des références d\'images...');
    
    let totalUpdates = 0;
    
    this.creatorsData.creators.forEach(creator => {
      if (creator.images && creator.images.length > 0) {
        const originalImages = [...creator.images];
        creator.images = [];
        
        originalImages.forEach(imagePath => {
          // Extraire le nom du fichier du chemin
          const fileName = path.basename(imagePath);
          
          // Chercher dans le mapping
          let foundMapping = null;
          
          // Essayer plusieurs variantes du nom de fichier
          for (const [mappedPath, urlData] of Object.entries(urlMapping)) {
            if (mappedPath.includes(fileName) || fileName.includes(path.basename(mappedPath))) {
              foundMapping = urlData;
              break;
            }
          }
          
          if (foundMapping) {
            // Remplacer par l'URL ImgBB
            creator.images.push(foundMapping.imgbbUrl);
            totalUpdates++;
            
            this.updates.push({
              creator: creator.name,
              originalPath: imagePath,
              newUrl: foundMapping.imgbbUrl,
              size: foundMapping.size
            });
            
            console.log(`✅ ${creator.name}: ${fileName} → ${foundMapping.imgbbUrl}`);
          } else {
            // Garder l'ancien chemin si pas de mapping trouvé
            creator.images.push(imagePath);
            console.log(`⚠️  ${creator.name}: ${fileName} → pas de mapping trouvé`);
          }
        });
      }
    });

    console.log(`\n📊 ${totalUpdates} images mises à jour`);
    return totalUpdates;
  }

  saveUpdatedJSON() {
    console.log('\n💾 Sauvegarde du JSON mis à jour...');
    
    try {
      // Créer une sauvegarde
      const backupPath = this.jsonPath.replace('.json', `-backup-${Date.now()}.json`);
      fs.writeFileSync(backupPath, JSON.stringify(this.creatorsData, null, 2));
      console.log(`📁 Sauvegarde créée: ${backupPath}`);
      
      // Sauvegarder le nouveau JSON
      fs.writeFileSync(this.jsonPath, JSON.stringify(this.creatorsData, null, 2));
      console.log('✅ JSON des créateurs mis à jour');
      
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error.message);
      return false;
    }
  }

  generateUpdateReport() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(__dirname, `../../creators-json-update-report-${timestamp}.json`);
    
    const report = {
      updateDate: new Date().toISOString(),
      totalUpdates: this.updates.length,
      updates: this.updates,
      summary: this.generateSummary()
    };

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`📄 Rapport de mise à jour sauvegardé: ${reportPath}`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du rapport:', error.message);
    }
  }

  generateSummary() {
    const summary = {};
    
    this.updates.forEach(update => {
      if (!summary[update.creator]) {
        summary[update.creator] = {
          count: 0,
          totalSize: 0,
          images: []
        };
      }
      
      summary[update.creator].count++;
      summary[update.creator].totalSize += update.size;
      summary[update.creator].images.push({
        originalPath: update.originalPath,
        newUrl: update.newUrl
      });
    });

    return summary;
  }

  displayResults() {
    console.log('\n📊 RÉSULTATS DE LA MISE À JOUR');
    console.log('==============================');
    
    const summary = this.generateSummary();
    
    Object.entries(summary).forEach(([creator, data]) => {
      console.log(`\n👤 ${creator}:`);
      console.log(`   📸 Images mises à jour: ${data.count}`);
      console.log(`   💾 Taille totale: ${(data.totalSize / 1024 / 1024).toFixed(2)} MB`);
    });

    console.log(`\n📈 Total: ${this.updates.length} images mises à jour`);
  }

  createMigrationSummary() {
    const summaryPath = path.join(__dirname, '../../JSON_UPDATE_SUMMARY.md');
    
    const summary = `# Mise à Jour du JSON des Créateurs - CLOFAS 241

## 📊 Résumé
- **Images mises à jour**: ${this.updates.length}
- **Créateurs affectés**: ${Object.keys(this.generateSummary()).length}
- **Date de mise à jour**: ${new Date().toLocaleString('fr-FR')}

## 👥 Créateurs Mis à Jour
${Object.entries(this.generateSummary()).map(([creator, data]) => 
  `### ${creator}
- **Images**: ${data.count}
- **Taille**: ${(data.totalSize / 1024 / 1024).toFixed(2)} MB
- **URLs ImgBB**: ${data.images.map(img => img.newUrl).join(', ')}`
).join('\n\n')}

## 🔄 Changements Effectués
1. ✅ URLs locales remplacées par URLs ImgBB
2. ✅ Sauvegarde de sécurité créée
3. ✅ Rapport de mise à jour généré
4. ✅ JSON des créateurs mis à jour

## 🚀 Prochaines Étapes
1. Tester l'affichage des images dans l'application
2. Vérifier que toutes les images s'affichent correctement
3. Nettoyer les images locales si tout fonctionne
4. Déployer les changements

---
*Mise à jour effectuée le ${new Date().toLocaleString('fr-FR')}*
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
  const updater = new CreatorsJSONUpdater();
  
  console.log('🔄 MISE À JOUR DU JSON DES CRÉATEURS CLOFAS 241');
  console.log('==============================================');
  console.log('');

  try {
    // Charger les données
    if (!updater.loadData()) {
      return;
    }

    // Créer le mapping des URLs
    const urlMapping = updater.createMappingFromMigration();

    // Mettre à jour les images des créateurs
    const totalUpdates = updater.updateCreatorsImages(urlMapping);

    if (totalUpdates > 0) {
      // Sauvegarder le JSON mis à jour
      if (updater.saveUpdatedJSON()) {
        // Générer les rapports
        updater.generateUpdateReport();
        updater.createMigrationSummary();
        
        // Afficher les résultats
        updater.displayResults();

        console.log('\n🎉 MISE À JOUR TERMINÉE AVEC SUCCÈS !');
        console.log('====================================');
        console.log('✅ Le JSON des créateurs a été mis à jour avec les URLs ImgBB');
        console.log('📁 Une sauvegarde de sécurité a été créée');
        console.log('📄 Les rapports ont été générés');
        console.log('');
        console.log('💡 PROCHAINES ÉTAPES:');
        console.log('1. Testez l\'affichage des images dans l\'application');
        console.log('2. Vérifiez que toutes les images s\'affichent correctement');
        console.log('3. Si tout fonctionne, vous pouvez nettoyer les images locales');
      }
    } else {
      console.log('\n⚠️  Aucune mise à jour effectuée');
      console.log('Vérifiez que les données de migration sont correctes');
    }

  } catch (error) {
    console.error('\n❌ Erreur lors de la mise à jour:', error.message);
  }
}

// Lancer la mise à jour
main();
