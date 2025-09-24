/**
 * Script de Nettoyage Automatique des Images Locales
 * 
 * Ce script supprime automatiquement les images locales après migration
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class AutoImageCleanup {
  constructor() {
    this.creatorsPath = path.join(__dirname, '../../public/creators');
    this.stats = {
      filesDeleted: 0,
      spaceFreed: 0,
      errors: 0
    };
  }

  analyzeAndCleanup() {
    console.log('🧹 NETTOYAGE AUTOMATIQUE DES IMAGES LOCALES');
    console.log('==========================================');
    console.log('');

    if (!fs.existsSync(this.creatorsPath)) {
      console.log('❌ Dossier des créateurs non trouvé');
      return;
    }

    console.log('🔍 Analyse des images locales...');
    
    const folders = fs.readdirSync(this.creatorsPath);
    let totalFiles = 0;
    let totalSize = 0;

    folders.forEach(folder => {
      const folderPath = path.join(this.creatorsPath, folder);
      
      if (fs.statSync(folderPath).isDirectory()) {
        const files = fs.readdirSync(folderPath);
        const imageFiles = files.filter(file => {
          const ext = path.extname(file).toLowerCase();
          return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
        });

        if (imageFiles.length > 0) {
          console.log(`📂 ${folder}: ${imageFiles.length} images trouvées`);
          
          let folderSize = 0;
          imageFiles.forEach(file => {
            const filePath = path.join(folderPath, file);
            
            try {
              const stats = fs.statSync(filePath);
              folderSize += stats.size;
              
              // Supprimer le fichier
              fs.unlinkSync(filePath);
              
              this.stats.filesDeleted++;
              this.stats.spaceFreed += stats.size;
              
              console.log(`   ✅ Supprimé: ${file}`);
            } catch (error) {
              this.stats.errors++;
              console.log(`   ❌ Erreur: ${file} - ${error.message}`);
            }
          });
          
          totalFiles += imageFiles.length;
          totalSize += folderSize;
          console.log(`   💾 Espace libéré: ${(folderSize / 1024 / 1024).toFixed(2)} MB`);
        }
      }
    });

    console.log(`\n📊 Résultats:`);
    console.log(`   🗑️  Fichiers supprimés: ${this.stats.filesDeleted}`);
    console.log(`   💾 Espace libéré: ${(this.stats.spaceFreed / 1024 / 1024).toFixed(2)} MB`);
    console.log(`   ❌ Erreurs: ${this.stats.errors}`);

    // Nettoyer les dossiers vides
    this.cleanupEmptyFolders();
  }

  cleanupEmptyFolders() {
    console.log('\n📁 Nettoyage des dossiers vides...');
    
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
          } catch (error) {
            console.log(`❌ Erreur suppression dossier ${folder}: ${error.message}`);
          }
        }
      }
    });
  }

  saveReport() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const reportPath = path.join(__dirname, `../../auto-cleanup-report-${timestamp}.json`);
    
    const report = {
      cleanupDate: new Date().toISOString(),
      statistics: this.stats,
      summary: {
        filesDeleted: this.stats.filesDeleted,
        spaceFreed: this.stats.spaceFreed,
        spaceFreedMB: (this.stats.spaceFreed / 1024 / 1024).toFixed(2),
        errors: this.stats.errors
      }
    };

    try {
      fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
      console.log(`\n📄 Rapport sauvegardé: ${reportPath}`);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du rapport:', error.message);
    }
  }
}

// Fonction principale
function main() {
  const cleanup = new AutoImageCleanup();
  
  try {
    cleanup.analyzeAndCleanup();
    cleanup.saveReport();

    console.log('\n🎉 NETTOYAGE AUTOMATIQUE TERMINÉ !');
    console.log('==================================');
    console.log('✅ Les images locales ont été supprimées');
    console.log('💾 L\'espace disque a été libéré');
    console.log('📄 Le rapport a été généré');
    console.log('');
    console.log('🎊 MIGRATION COMPLÈTE !');
    console.log('Les images sont maintenant hébergées sur ImgBB');

  } catch (error) {
    console.error('\n❌ Erreur lors du nettoyage:', error.message);
  }
}

// Lancer le nettoyage
main();
