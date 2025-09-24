#!/bin/bash
# Script de Migration des Images CLOFAS 241

echo "🚀 Migration des Images CLOFAS 241 vers ImgBB"
echo "=============================================="

# Vérifier que le dossier existe
if [ ! -d "public/creators" ]; then
    echo "❌ Dossier public/creators non trouvé"
    echo "Lancez d'abord: node src/scripts/setupImageMigration.js"
    exit 1
fi

# Compter les images
image_count=$(find public/creators -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" | wc -l)

if [ $image_count -eq 0 ]; then
    echo "❌ Aucune image trouvée dans public/creators"
    echo "Organisez d'abord vos images dans les dossiers des stylistes"
    exit 1
fi

echo "📸 $image_count images trouvées"
echo ""

# Lancer la migration
echo "🔄 Lancement de la migration..."
node src/scripts/migrateCustomImages.js public/creators

echo ""
echo "✅ Migration terminée !"
echo "📄 Vérifiez le rapport de migration généré"
