// Script d'import automatique des stylistes CLOFAS 2024
// Ce script peut être exécuté directement dans la console du navigateur

// Configuration Firebase
const firebaseConfig = {
  databaseURL: "https://pmmga-9f8a1-default-rtdb.firebaseio.com/"
};

// Données des créateurs CLOFAS 2024
const creators2024 = [
  {
    id: "angele-epouta",
    name: "Angèle Epouta",
    country: "Gabon",
    images: [
      "https://i.ibb.co/r2Tf4cw/DSC-0219.jpg",
      "https://i.ibb.co/dw0rSZw/DSC-0220.jpg",
      "https://i.ibb.co/sJbDXCB/DSC-0221.jpg",
      "https://i.ibb.co/HL5v320/DSC-0222.jpg",
      "https://i.ibb.co/9Fqdn91/DSC-0223.jpg",
      "https://i.ibb.co/fYLRv4m/DSC-0224.jpg",
      "https://i.ibb.co/1Y66K5J/DSC-0225.jpg",
      "https://i.ibb.co/j9ZCTDt/DSC-0226.jpg",
      "https://i.ibb.co/ZsyTx9f/DSC-0227.jpg",
      "https://i.ibb.co/bjtrb2K/DSC-0228.jpg",
      "https://i.ibb.co/FbgVVyf/DSC-0229.jpg",
      "https://i.ibb.co/8n8VDjT/DSC-0230.jpg",
      "https://i.ibb.co/DB2H4Pd/DSC-0231.jpg",
      "https://i.ibb.co/F1hB9pC/DSC-0232.jpg",
      "https://i.ibb.co/5xstWV8/DSC-0233.jpg",
      "https://i.ibb.co/B2VywvG/DSC-0234.jpg",
      "https://i.ibb.co/DHMyQdR/DSC-0235.jpg",
      "https://i.ibb.co/3mZjJdv/DSC-0236.jpg"
    ]
  },
  {
    id: "atelier-isee-by-lita",
    name: "Atelier Issée By Lita",
    country: "Gabon",
    images: [
      "https://i.ibb.co/KzfHN85/DSC-0238.jpg",
      "https://i.ibb.co/xtWq4pp/DSC-0239.jpg",
      "https://i.ibb.co/RGyRSkW/DSC-0240.jpg",
      "https://i.ibb.co/v4NdwHc/DSC-0241.jpg",
      "https://i.ibb.co/TxpwGjf/DSC-0242.jpg",
      "https://i.ibb.co/kgGD0qt/DSC-0243.jpg",
      "https://i.ibb.co/hRnxW2G/DSC-0244.jpg",
      "https://i.ibb.co/v6GxL1j/DSC-0245.jpg",
      "https://i.ibb.co/MDd75Hz/DSC-0246.jpg",
      "https://i.ibb.co/35Wdr3X/DSC-0247.jpg",
      "https://i.ibb.co/Jwt31rQ/DSC-0250.jpg",
      "https://i.ibb.co/QjYRXwV/DSC-0251.jpg",
      "https://i.ibb.co/QRRJWTT/DSC-0252.jpg",
      "https://i.ibb.co/sv0k6HG/DSC-0253.jpg"
    ]
  },
  {
    id: "desmo",
    name: "Desmo",
    country: "Togo",
    images: [
      "https://i.ibb.co/Xxvkd5j/DSC-0258.jpg",
      "https://i.ibb.co/XfDmTt9/DSC-0259.jpg",
      "https://i.ibb.co/kgQvbQZ/DSC-0261.jpg",
      "https://i.ibb.co/rf2k6D6/DSC-0262.jpg",
      "https://i.ibb.co/1Dx7skM/DSC-0263.jpg",
      "https://i.ibb.co/bgJ1TfZ/DSC-0264.jpg",
      "https://i.ibb.co/99F239m/DSC-0265.jpg",
      "https://i.ibb.co/F4c4Xtx/DSC-0266.jpg",
      "https://i.ibb.co/k21NFgG/DSC-0267.jpg",
      "https://i.ibb.co/F4xZwky/DSC-0268.jpg",
      "https://i.ibb.co/DfCYGx9/DSC-0269.jpg",
      "https://i.ibb.co/jZGtVRt/DSC-0271.jpg",
      "https://i.ibb.co/mCcD1Gf/DSC-0272.jpg",
      "https://i.ibb.co/2zRKpF4/DSC-0273.jpg",
      "https://i.ibb.co/MkVKxKM/DSC-0274.jpg",
      "https://i.ibb.co/fVP7cHx/DSC-0275.jpg",
      "https://i.ibb.co/8LJHcqW/DSC-0277.jpg",
      "https://i.ibb.co/zTKBxfC/DSC-0278.jpg",
      "https://i.ibb.co/nMnYTwg/DSC-0279.jpg",
      "https://i.ibb.co/8gPh51G/DSC-0280.jpg",
      "https://i.ibb.co/7JpHWTd/DSC-0281.jpg",
      "https://i.ibb.co/YT0gkyD/DSC-0282.jpg",
      "https://i.ibb.co/5hRK8k2/DSC-0283.jpg",
      "https://i.ibb.co/bjdfMhr/DSC-0284.jpg",
      "https://i.ibb.co/35kzwJ3/DSC-0285.jpg",
      "https://i.ibb.co/B0JvpMX/DSC-0286.jpg"
    ]
  },
  {
    id: "jacques-simon",
    name: "Jacques Simon",
    country: "Gabon",
    images: []
  },
  {
    id: "koro-dk-style",
    name: "Koro DK Style",
    country: "Burkina Faso",
    images: []
  },
  {
    id: "nous-fashion",
    name: "Nous Fashion",
    country: "Gabon",
    images: []
  },
  {
    id: "oj-fashion",
    name: "OJ Fashion",
    country: "Gabon",
    images: []
  },
  {
    id: "angelina-creations",
    name: "Angelina Creations",
    country: "Gabon",
    images: []
  },
  {
    id: "beitch-faro",
    name: "Beitch Faro",
    country: "Gabon",
    images: []
  }
];

// Fonction pour ajouter un créateur
async function addCreator(creatorData) {
  try {
    const now = new Date().toISOString();
    
    const firebaseCreator = {
      name: creatorData.name,
      country: creatorData.country,
      bio: `Créateur de mode de ${creatorData.country}. Spécialisé dans la création de vêtements uniques et modernes.`,
      images: [],
      featured: false,
      website: '',
      socialMedia: {},
      createdAt: now,
      updatedAt: now
    };

    // Ajouter le créateur à Firebase
    const creatorsRef = ref(database, 'creators');
    const newCreatorRef = push(creatorsRef);
    await set(newCreatorRef, firebaseCreator);
    
    const creatorId = newCreatorRef.key;
    console.log(`✅ Créateur ${creatorData.name} ajouté avec l'ID: ${creatorId}`);

    // Ajouter les images si elles existent
    if (creatorData.images && creatorData.images.length > 0) {
      const imagesRef = ref(database, `creators/${creatorId}/images`);
      
      for (let i = 0; i < creatorData.images.length; i++) {
        const imageUrl = creatorData.images[i];
        const imageData = {
          url: imageUrl,
          name: `Image ${i + 1} de ${creatorData.name}`,
          description: `Photo de création de ${creatorData.name}`,
          category: 'création',
          featured: i === 0, // Première image mise en vedette
          tags: ['mode', 'création', creatorData.country.toLowerCase()],
          createdAt: now,
          updatedAt: now
        };

        const newImageRef = push(imagesRef);
        await set(newImageRef, imageData);
        console.log(`📸 Image ${i + 1} ajoutée pour ${creatorData.name}`);
      }
    }

    return creatorId;
  } catch (error) {
    console.error(`❌ Erreur lors de l'ajout de ${creatorData.name}:`, error);
    throw error;
  }
}

// Fonction principale d'import
async function importAllStylists() {
  console.log('🚀 Début de l\'import des stylistes CLOFAS 2024...');
  console.log(`📊 ${creators2024.length} créateurs à importer`);
  
  const results = {
    success: 0,
    errors: 0,
    total: creators2024.length
  };

  for (let i = 0; i < creators2024.length; i++) {
    const creator = creators2024[i];
    console.log(`\n📝 Import ${i + 1}/${creators2024.length}: ${creator.name}`);
    
    try {
      await addCreator(creator);
      results.success++;
      console.log(`✅ ${creator.name} importé avec succès`);
    } catch (error) {
      results.errors++;
      console.error(`❌ Erreur pour ${creator.name}:`, error);
    }
    
    // Petite pause pour éviter de surcharger Firebase
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log('\n🎉 Import terminé !');
  console.log(`✅ Succès: ${results.success}`);
  console.log(`❌ Erreurs: ${results.errors}`);
  console.log(`📊 Total: ${results.total}`);
  
  return results;
}

// Instructions d'utilisation
console.log('🔧 Script d\'import CLOFAS 2024 chargé !');
console.log('📋 Instructions :');
console.log('1. Assurez-vous que Firebase est initialisé');
console.log('2. Exécutez: importAllStylists()');
console.log('3. Attendez la fin de l\'import');
console.log('4. Vérifiez les résultats dans votre base de données');

// Exporter les fonctions pour utilisation
window.importAllStylists = importAllStylists;
window.addCreator = addCreator;
window.creators2024 = creators2024;
