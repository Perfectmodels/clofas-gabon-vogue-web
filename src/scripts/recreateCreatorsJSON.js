/**
 * Script de Recréation du JSON des Créateurs
 * 
 * Ce script recrée le fichier clofas-cms-data.json avec les nouvelles URLs ImgBB
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CreatorsJSONRecreator {
  constructor() {
    this.jsonPath = path.join(__dirname, '../components/creators/clofas-cms-data.json');
    this.migrationDataPath = path.join(__dirname, '../../firebase-migration-data-2025-09-23T23-48-00-384Z.json');
    this.migrationData = null;
  }

  loadMigrationData() {
    try {
      const content = fs.readFileSync(this.migrationDataPath, 'utf8');
      this.migrationData = JSON.parse(content);
      console.log('✅ Données de migration chargées');
      return true;
    } catch (error) {
      console.error('❌ Erreur lors du chargement des données de migration:', error.message);
      return false;
    }
  }

  createCreatorsData() {
    console.log('\n🏗️  Création des données des créateurs...');
    
    const creatorsData = {
      settings: {
        siteName: "CLOFAS 241",
        siteDescription: "Consommation Locale Fashion Show 241 - Mode Gabonaise Authentique et Responsable",
        contactEmail: "Beitchfaro@yahoo.fr",
        contactPhone: "+241 66 66 89 00",
        socialMedia: {
          instagram: "#",
          facebook: "#",
          twitter: "#"
        }
      },
      pages: {
        home: {
          hero: {
            title: "CLOFAS 241",
            subtitle: "Mode Gabonaise Authentique et Responsable",
            backgroundImage: "https://i.ibb.co/QFPYtZSN/Logo-CLOFAS.png",
            textColor: "white"
          },
          content: {}
        },
        about: {
          hero: {
            title: "À Propos de CLOFAS 241",
            subtitle: "Découvrez notre mission et notre vision pour la mode gabonaise",
            backgroundColor: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            textColor: "white"
          },
          content: {}
        },
        creators: {
          hero: {
            title: "Nos Créateurs",
            subtitle: "Découvrez les talents exceptionnels de la mode gabonaise",
            backgroundColor: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            textColor: "white"
          },
          content: {}
        }
      },
      creators: []
    };

    // Mapping des IDs de créateurs vers les données
    const creatorsMapping = {
      'creator-0': {
        id: 'creator-0',
        name: 'Lady Riaba',
        status: 'Créatrice Émergente',
        description: 'Lady Riaba incarne la nouvelle génération de créateurs gabonais avec une approche révolutionnaire qui redéfinit les codes de la mode contemporaine. Ses créations audacieuses fusionnent l\'héritage culturel gabonais avec une esthétique avant-gardiste, créant des pièces uniques qui captivent et inspirent.',
        images: []
      },
      'creator-1': {
        id: 'creator-1',
        name: 'Madame Luc-Abiale',
        status: 'Designer Innovante',
        description: 'Madame Luc-Abiale se distingue par son approche visionnaire de la mode gabonaise, où chaque création raconte une histoire profonde. Son talent exceptionnel pour transformer les traditions en innovations contemporaines fait d\'elle une figure incontournable de la scène créative locale.',
        images: []
      },
      'creator-2': {
        id: 'creator-2',
        name: 'Belle Soeur',
        status: 'Artiste Créative',
        description: 'Belle Soeur apporte une énergie créative unique à la mode gabonaise avec des designs qui célèbrent la féminité et l\'élégance. Son approche artistique sophistiquée et son attention aux détails font de ses créations de véritables œuvres d\'art portables.',
        images: []
      },
      'creator-3': {
        id: 'creator-3',
        name: 'Angèle Epouta',
        status: 'Maître Créatrice',
        description: 'Angèle Epouta est une figure emblématique de la mode gabonaise, reconnue pour son excellence artistique et son savoir-faire artisanal exceptionnel. Ses créations sophistiquées allient tradition et modernité avec une maîtrise technique remarquable qui fait d\'elle une référence incontournable dans l\'univers de la haute couture locale.',
        images: []
      },
      'creator-4': {
        id: 'creator-4',
        name: 'Angelina Creations',
        status: 'Maison de couture',
        description: 'Atelier réputé pour ses pièces uniques mêlant tradition et modernité avec raffinement.',
        images: []
      },
      'creator-5': {
        id: 'creator-5',
        name: 'L\'atelier Issé By Lita',
        status: 'Créatrice',
        description: 'Espace créatif dédié à la haute couture gabonaise avec une touche d\'originalité distincte.',
        images: []
      },
      'creator-11': {
        id: 'creator-11',
        name: 'Beitch Faro',
        status: 'Promotrice de l\'événement',
        description: 'Visionnaire et fondatrice du CLOFAS 241, dédiée à la promotion de la mode locale gabonaise.',
        images: []
      }
    };

    // Ajouter les images migrées
    Object.entries(this.migrationData).forEach(([creatorId, images]) => {
      if (creatorsMapping[creatorId]) {
        creatorsMapping[creatorId].images = images.map(img => img.url);
        console.log(`✅ ${creatorsMapping[creatorId].name}: ${images.length} images ajoutées`);
      }
    });

    // Convertir en tableau
    creatorsData.creators = Object.values(creatorsMapping);

    return creatorsData;
  }

  saveCreatorsData(creatorsData) {
    console.log('\n💾 Sauvegarde du JSON des créateurs...');
    
    try {
      // Créer le dossier s'il n'existe pas
      const dirPath = path.dirname(this.jsonPath);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Sauvegarder le JSON
      fs.writeFileSync(this.jsonPath, JSON.stringify(creatorsData, null, 2));
      console.log('✅ JSON des créateurs sauvegardé');
      
      return true;
    } catch (error) {
      console.error('❌ Erreur lors de la sauvegarde:', error.message);
      return false;
    }
  }

  generateSummary(creatorsData) {
    console.log('\n📊 RÉSUMÉ DE LA RECRÉATION');
    console.log('==========================');
    
    let totalImages = 0;
    
    creatorsData.creators.forEach(creator => {
      const imageCount = creator.images.length;
      totalImages += imageCount;
      
      if (imageCount > 0) {
        console.log(`✅ ${creator.name}: ${imageCount} images`);
      } else {
        console.log(`⚠️  ${creator.name}: Aucune image`);
      }
    });

    console.log(`\n📈 Total: ${totalImages} images avec URLs ImgBB`);
  }

  createSummaryReport(creatorsData) {
    const summaryPath = path.join(__dirname, '../../CREATORS_JSON_RECREATED.md');
    
    const summary = `# Recréation du JSON des Créateurs - CLOFAS 241

## 📊 Résumé
- **Créateurs**: ${creatorsData.creators.length}
- **Images totales**: ${creatorsData.creators.reduce((sum, creator) => sum + creator.images.length, 0)}
- **Date de recréation**: ${new Date().toLocaleString('fr-FR')}

## 👥 Créateurs avec Images Migrées
${creatorsData.creators.filter(c => c.images.length > 0).map(creator => 
  `### ${creator.name} (${creator.status})
- **Images**: ${creator.images.length}
- **URLs**: ${creator.images.slice(0, 3).map(url => url).join(', ')}${creator.images.length > 3 ? '...' : ''}`
).join('\n\n')}

## 🔄 Changements Effectués
1. ✅ JSON des créateurs recréé avec URLs ImgBB
2. ✅ Structure maintenue pour compatibilité
3. ✅ Images locales remplacées par URLs ImgBB
4. ✅ Métadonnées préservées

## 🚀 Prochaines Étapes
1. Tester l'affichage des images dans l'application
2. Vérifier que toutes les images s'affichent correctement
3. Nettoyer les images locales si tout fonctionne
4. Déployer les changements

---
*Recréation effectuée le ${new Date().toLocaleString('fr-FR')}*
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
  const recreator = new CreatorsJSONRecreator();
  
  console.log('🏗️  RECRÉATION DU JSON DES CRÉATEURS CLOFAS 241');
  console.log('==============================================');
  console.log('');

  try {
    // Charger les données de migration
    if (!recreator.loadMigrationData()) {
      return;
    }

    // Créer les données des créateurs
    const creatorsData = recreator.createCreatorsData();

    // Sauvegarder le JSON
    if (recreator.saveCreatorsData(creatorsData)) {
      // Générer le résumé
      recreator.generateSummary(creatorsData);
      recreator.createSummaryReport(creatorsData);

      console.log('\n🎉 RECRÉATION TERMINÉE AVEC SUCCÈS !');
      console.log('====================================');
      console.log('✅ Le JSON des créateurs a été recréé avec les URLs ImgBB');
      console.log('📄 Un résumé détaillé a été généré');
      console.log('');
      console.log('💡 PROCHAINES ÉTAPES:');
      console.log('1. Testez l\'affichage des images dans l\'application');
      console.log('2. Vérifiez que toutes les images s\'affichent correctement');
      console.log('3. Si tout fonctionne, vous pouvez nettoyer les images locales');
    }

  } catch (error) {
    console.error('\n❌ Erreur lors de la recréation:', error.message);
  }
}

// Lancer la recréation
main();
