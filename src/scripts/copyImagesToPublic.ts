/**
 * Script pour copier les images des stylistes vers le dossier public
 * 
 * Ce script copie les images depuis clerk-react/public/creators/ 
 * vers public/creators/ pour qu'elles soient accessibles via les URLs locales
 */

import * as fs from 'fs';
import * as path from 'path';

// Chemins des dossiers
const sourceDir = 'clerk-react/public/creators';
const targetDir = 'public/creators';

// Mapping des dossiers de stylistes
const stylistFolders = [
  'angele-epouta',
  'angelina-creations', 
  'atelier-isse-by-lita',
  'beitch-faro'
];

/**
 * Copie récursive d'un dossier
 */
function copyDirectory(source: string, target: string): void {
  if (!fs.existsSync(source)) {
    console.error(`❌ Dossier source inexistant: ${source}`);
    return;
  }

  // Créer le dossier cible s'il n'existe pas
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
    console.log(`📁 Dossier créé: ${target}`);
  }

  // Lire le contenu du dossier source
  const items = fs.readdirSync(source);
  
  items.forEach(item => {
    const sourcePath = path.join(source, item);
    const targetPath = path.join(target, item);
    
    const stat = fs.statSync(sourcePath);
    
    if (stat.isDirectory()) {
      // Copier le sous-dossier récursivement
      copyDirectory(sourcePath, targetPath);
    } else {
      // Copier le fichier
      try {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`📄 Copié: ${item}`);
      } catch (error) {
        console.error(`❌ Erreur lors de la copie de ${item}:`, error);
      }
    }
  });
}

/**
 * Copie toutes les images des stylistes
 */
export function copyAllStylistImages(): void {
  console.log('🔄 Copie des images des stylistes...');
  console.log('====================================');
  
  if (!fs.existsSync(sourceDir)) {
    console.error(`❌ Dossier source inexistant: ${sourceDir}`);
    console.log('💡 Assurez-vous que le dossier clerk-react/public/creators existe');
    return;
  }

  let totalFiles = 0;
  let successCount = 0;

  stylistFolders.forEach(folder => {
    const sourceFolder = path.join(sourceDir, folder);
    const targetFolder = path.join(targetDir, folder);
    
    console.log(`\n📁 Traitement du dossier: ${folder}`);
    
    if (fs.existsSync(sourceFolder)) {
      // Compter les fichiers avant la copie
      const files = fs.readdirSync(sourceFolder).filter(file => 
        fs.statSync(path.join(sourceFolder, file)).isFile()
      );
      
      console.log(`   📷 ${files.length} images trouvées`);
      totalFiles += files.length;
      
      // Copier le dossier
      copyDirectory(sourceFolder, targetFolder);
      
      // Vérifier que la copie a réussi
      if (fs.existsSync(targetFolder)) {
        const copiedFiles = fs.readdirSync(targetFolder).filter(file => 
          fs.statSync(path.join(targetFolder, file)).isFile()
        );
        
        if (copiedFiles.length === files.length) {
          console.log(`   ✅ Copie réussie: ${copiedFiles.length}/${files.length} fichiers`);
          successCount += copiedFiles.length;
        } else {
          console.log(`   ⚠️ Copie partielle: ${copiedFiles.length}/${files.length} fichiers`);
        }
      }
    } else {
      console.log(`   ❌ Dossier source inexistant: ${sourceFolder}`);
    }
  });

  console.log('\n📊 Résumé de la copie:');
  console.log(`✅ Fichiers copiés avec succès: ${successCount}/${totalFiles}`);
  console.log(`📁 Dossiers traités: ${stylistFolders.length}`);
  
  if (successCount === totalFiles) {
    console.log('🎉 Copie terminée avec succès !');
  } else {
    console.log('⚠️ Copie terminée avec des erreurs');
  }
}

/**
 * Vérifie la structure des dossiers
 */
export function checkDirectoryStructure(): void {
  console.log('🔍 Vérification de la structure des dossiers...');
  console.log('===============================================');
  
  console.log(`\n📂 Dossier source: ${sourceDir}`);
  console.log(`📂 Dossier cible: ${targetDir}`);
  
  // Vérifier le dossier source
  if (fs.existsSync(sourceDir)) {
    console.log('✅ Dossier source existe');
    
    stylistFolders.forEach(folder => {
      const folderPath = path.join(sourceDir, folder);
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath).filter(file => 
          fs.statSync(path.join(folderPath, file)).isFile()
        );
        console.log(`   📁 ${folder}: ${files.length} fichiers`);
      } else {
        console.log(`   ❌ ${folder}: dossier inexistant`);
      }
    });
  } else {
    console.log('❌ Dossier source inexistant');
  }
  
  // Vérifier le dossier cible
  if (fs.existsSync(targetDir)) {
    console.log('✅ Dossier cible existe');
    
    stylistFolders.forEach(folder => {
      const folderPath = path.join(targetDir, folder);
      if (fs.existsSync(folderPath)) {
        const files = fs.readdirSync(folderPath).filter(file => 
          fs.statSync(path.join(folderPath, file)).isFile()
        );
        console.log(`   📁 ${folder}: ${files.length} fichiers`);
      } else {
        console.log(`   📁 ${folder}: pas encore copié`);
      }
    });
  } else {
    console.log('📁 Dossier cible à créer');
  }
}

/**
 * Génère les URLs locales pour les images
 */
export function generateLocalUrls(): void {
  console.log('🔗 Génération des URLs locales...');
  console.log('==================================');
  
  stylistFolders.forEach(folder => {
    const folderPath = path.join(targetDir, folder);
    
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath)
        .filter(file => fs.statSync(path.join(folderPath, file)).isFile())
        .sort();
      
      console.log(`\n📁 ${folder}:`);
      files.slice(0, 3).forEach(file => { // Afficher seulement les 3 premiers
        console.log(`   /creators/${folder}/${file}`);
      });
      
      if (files.length > 3) {
        console.log(`   ... et ${files.length - 3} autres fichiers`);
      }
    }
  });
}

/**
 * Script principal
 */
export function main(): void {
  console.log('🚀 Script de copie des images des stylistes');
  console.log('============================================');
  
  checkDirectoryStructure();
  
  console.log('\n🔄 Démarrage de la copie...');
  copyAllStylistImages();
  
  console.log('\n🔗 URLs locales générées:');
  generateLocalUrls();
  
  console.log('\n✅ Script terminé !');
  console.log('💡 Vous pouvez maintenant utiliser les images via les URLs locales');
}

// Export par défaut
export default {
  copyAllStylistImages,
  checkDirectoryStructure,
  generateLocalUrls,
  main
};
