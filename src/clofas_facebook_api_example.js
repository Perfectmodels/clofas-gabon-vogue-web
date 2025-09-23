
// Script d'exemple pour l'API Facebook Graph
// Remplacez YOUR_ACCESS_TOKEN par votre vrai token

const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
const PAGE_ID = 'clofas241'; // ou l'ID numérique de la page

async function fetchCLOFASPhotos() {
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${PAGE_ID}/photos?access_token=${ACCESS_TOKEN}&fields=images,link,name,created_time&limit=100`);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Photos trouvées:', data.data.length);
    
    // Traiter chaque photo
    data.data.forEach((photo, index) => {
      console.log(`Photo ${index + 1}:`);
      console.log(`  Nom: ${photo.name || 'Sans nom'}`);
      console.log(`  Date: ${photo.created_time}`);
      console.log(`  Images disponibles: ${photo.images.length}`);
      
      // Prendre l'image de plus haute qualité
      const bestImage = photo.images.reduce((prev, current) => 
        (current.width > prev.width) ? current : prev
      );
      console.log(`  URL haute qualité: ${bestImage.source}`);
      console.log(`  Dimensions: ${bestImage.width}x${bestImage.height}`);
      console.log('  ---');
    });
    
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

// Exécuter le script
fetchCLOFASPhotos();
