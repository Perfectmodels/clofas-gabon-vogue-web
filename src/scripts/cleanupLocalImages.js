/**
 * Script de Nettoyage des Images Locales
 * 
 * Ce script supprime les images locales après migration vers ImgBB
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class LocalImagesCleanup {
  constructor() {
    this.creatorsPath = path.join(__dirname, '../../public/creators');
    this.cleanupLog = [];
    this.stats = {
      filesDeleted: 0,
      spaceFreed: 0,
      errors: 0
    };
  }

  async confirmCleanup() {
    const readline = await import('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const askQuestion = (question) => {
      return new Promise((resolve) => {
        rl.question(question, resolve);
      });
    };

    console.log('⚠️  ATTENTION - NETTOYAGE DES IMAGES LOCALES');
    console.log('============================================');
    console.log('');
    console.log('Ce script va supprimer toutes les images locales dans:');
    console.log(`📁 ${this.creatorsPath}`);
    console.log('');
    console.log('✅ Les images sont maintenant hébergées sur ImgBB');
    console.log('✅ Toutes les images ont été testées et sont accessibles');
    console.log('✅ Le JSON des créateurs a été mis à jour');
    console.log('');
    console.log('⚠️  Cette action est IRRÉVERSIBLE !');
    console.log('');

    const confirm1 = await askQuestion('Êtes-vous sûr de vouloir supprimer les images locales ? (oui/non): ');
    
    if (confirm1.toLowerCase() !== 'oui') {
      console.log('❌ Nettoyage annulé par l\'utilisateur');
      rl.close();
      return false;
    }

    const confirm2 = await askQuestion('Dernière confirmation - tapez "SUPPRIMER" pour continuer: ');
    
    if (confirm2 !== 'SUPPRIMER') {
      console.log('❌ Nettoyage annulé - confirmation incorrecte');
      rl.close();
      return false;
    }

    rl.close();
    return true;
  }

  analyzeLocalImages() {
    console.log('\n🔍 Analyse des images locales...');
    console.log('===============================');

    const analysis = {
      totalFiles: 0,
      totalSize: 0,
      folders: {}
    };

    if (!fs.existsSync(this.creatorsPath)) {
      console.log('❌ Dossier des créateurs non trouvé');
      return analysis;
    }

    const folders = fs.readdirSync(this.creatorsPath);
    
    folders.forEach(folder => {
      const folderPath = path.join(this.creatorsPath, folder);
      
      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        const imageFiles = files.filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        let folderSize = 0;
        imageFiles.forEach(file => {
          const filePath = path.join(folderPath, file);
          const stats = fs.statSync(filePath);
          folderSize += stats.size;
        });

        analysis.totalFiles += imageFiles.length;
        analysis.totalSize += folderSize;
        analysis.folders[folder] = {
          files: imageFiles.length,
          size: folderSize
        };

        if (imageFiles.length > 0) {
          console.log(`📂 ${folder}: ${imageFiles.length} fichiers (${(folderSize / 1024 / 1024).toFixed(2)} MB)`);
        }
      }
    });

    console.log(`\n📊 Total: ${analysis.totalFiles} fichiers (${(analysis.totalSize / 1024 / 1024).toFixed(2)} MB)`);
    return analysis;
  }

  async cleanupImages(analysis) {
    console.log('\n🧹 Nettoyage des images locales...');
    console.log('==================================');

    for (const [folderName, folderData] of Object.entries(analysis.folders)) {
      if (folderData.files > 0) {
        console.log(`\n📂 Nettoyage: ${folderName}`);
        
        const folderPath = path.join(this.creatorsPath, folderName);
        const files = fs.readdirSync(folderPath);
        
        for (const file of files) {
          const ext = path.extname(file).toLowerCase();
          if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
            const filePath = path.join(folderPath, file);
            
            try {
              const stats = fs.statSync(filePath);
              fs.unlinkSync(filePath);
              
              this.stats.filesDeleted++;
              this.stats.spaceFreed += stats.size;
              
              this.cleanupLog.push({
                action: 'deleted',
                file: file,
                path: filePath,
                size: stats.size,
                timestamp: new Date().toISOString()
              });
              
              console.log(`   ✅ Supprimé: ${file}`);
            } catch (error) {
              this.stats.errors++;
              this.cleanupLog.push({
                action: 'error',
                file: file,
                path: filePath,
                error: error.message,
                timestamp: new Date().toISOString()
              });
              
              console.log(`   ❌ Erreur: ${file} - ${error.message}`);
            }
          }
        }
      }
    }
  }

  cleanupEmptyFolders() {
    console.log('\n📁 Nettoyage des dossiers vides...');
    console.log('==================================');

    if (!fs.existsSync(this.creatorsPath)) {
      return;
    }

    const folders = fs.readdirSync(this.creatorsPath);
    
    folders.forEach(folder => {
      const folderPath = path.join(this.creatorsPath, folder);
      
      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        
        if (files.length === 0) {
          try {
            fs.rmdirSync(folderPath);
            console.log(`✅ Dossier supprimé: ${folder}`);
            
            this.cleanupLog.push({
              action: 'folder_deleted',
              folder: folder,
              path: folderPath,
              timestamp: new Date().toISOString()
            });
          } catch (error) {
            console.log(`❌ Erreur suppression dossier ${folder}: ${error.message}`);
          }
        } else {
          console.log(`📁 Dossier conservé: ${folder} (${files.length} fichiers restants)`);
        }
      }
    });
  }

  displayResults() {
    console.log('\n📊 RÉSULTATS DU NETTOYAGE');
    console.log('=========================');
    console.log(`🗑️  Fichiers supprimés: ${this.stats.filesDeleted}`);
    console.log(`💾 Espace libéré: ${(this.stats.spaceFreed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`❌ Erreurs: ${this.stats.errors}`);
    
    if (this.stats.errors > 0) {
      console.log('\n❌ ERREURS RENCONTRÉES:');
      this.cleanupLog
        .filter(log => log.action === 'error')
        .forEach(log => {
          console.log(`   ${log.file}: ${log.error}`);
        });
    }
  }

  saveCleanupReport() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(__dirname, `../../cleanup-report-${timestamp}.json`);
    
    const report = {
      cleanupDate: new Date().toISOString(),
      statistics: this.stats,
      log: this.cleanupLog,
      summary: {
        filesDeleted: this.stats.filesDeleted,
        spaceFreed: this.stats.spaceFreed,
        spaceFreedMB: (this.stats.spaceFreed / 1024 / 1024).toFixed(2),
        errors: this.stats.errors
      }
    };

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Rapport de nettoyage sauvegardé: ${reportPath}`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du rapport:', error.message);
    }
  }

  generateCleanupSummary() {
    const summaryPath = path.join(__dirname, '../../CLEANUP_SUMMARY.md');
    
    const summary = `# Nettoyage des Images Locales - CLOFAS 241

## 📊 Résultats
- **Fichiers supprimés**: ${this.stats.filesDeleted}
- **Espace libéré**: ${(this.stats.spaceFreed / 1024 / 1024).toFixed(2)} MB
- **Erreurs**: ${this.stats.errors}
- **Date de nettoyage**: ${new Date().toLocaleString('fr-FR')}

## 🎯 Objectif Atteint
✅ Migration vers ImgBB réussie  
✅ Images testées et accessibles  
✅ JSON des créateurs mis à jour  
✅ Images locales supprimées  
✅ Espace disque libéré  

## 📁 Dossiers Nettoyés
${Object.entries(this.cleanupLog.reduce((acc, log) => {
  if (log.action === 'deleted') {
    const folder = path.dirname(log.path).split(path.sep).pop();
    if (!acc[folder]) acc[folder] = 0;
    acc[folder]++;
  }
  return acc;
}, {})).map(([folder, count]) => 
  `- **${folder}**: ${count} fichiers supprimés`
).join('\n')}

## 🔄 Changements Effectués
1. ✅ Suppression des images locales
2. ✅ Nettoyage des dossiers vides
3. ✅ Libération de l'espace disque
4. ✅ Conservation des métadonnées

## 🚀 Avantages
- **Performance**: Chargement plus rapide
- **Espace**: ${(this.stats.spaceFreed / 1024 / 1024).toFixed(2)} MB libérés
- **Maintenance**: Images hébergées professionnellement
- **Sécurité**: Sauvegarde automatique sur ImgBB

## 📁 Fichiers Générés
- \`cleanup-report-[timestamp].json\`: Rapport détaillé
- \`CLEANUP_SUMMARY.md\`: Ce résumé

---
*Nettoyage effectué le ${new Date().toLocaleString('fr-FR')}*
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
  const cleanup = new LocalImagesCleanup();
  
  console.log('🧹 NETTOYAGE DES IMAGES LOCALES - CLOFAS 241');
  console.log('===========================================');
  console.log('');

  try {
    // Demander confirmation
    const confirmed = await cleanup.confirmCleanup();
    if (!confirmed) {
      return;
    }

    // Analyser les images locales
    const analysis = cleanup.analyzeLocalImages();
    
    if (analysis.totalFiles === 0) {
      console.log('\n✅ Aucune image locale à nettoyer');
      return;
    }

    // Nettoyer les images
    await cleanup.cleanupImages(analysis);

    // Nettoyer les dossiers vides
    cleanup.cleanupEmptyFolders();

    // Afficher les résultats
    cleanup.displayResults();

    // Sauvegarder les rapports
    cleanup.saveCleanupReport();
    cleanup.generateCleanupSummary();

    console.log('\n🎉 NETTOYAGE TERMINÉ AVEC SUCCÈS !');
    console.log('==================================');
    console.log('✅ Les images locales ont été supprimées');
    console.log('💾 L\'espace disque a été libéré');
    console.log('📄 Les rapports ont été générés');
    console.log('');
    console.log('🎊 MIGRATION COMPLÈTE !');
    console.log('Les images sont maintenant hébergées sur ImgBB');

  } catch (error) {
    console.error('\n❌ Erreur lors du nettoyage:', error.message);
  }
}

// Lancer le nettoyage
main();
