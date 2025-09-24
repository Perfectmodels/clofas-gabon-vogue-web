@echo off
REM Script de copie des images pour CLOFAS 241
echo 📁 Copie des images des stylistes...
echo.

REM Créer les dossiers s'ils n'existent pas
mkdir "public\creators\lady-riaba" 2>nul
mkdir "public\creators\madame-luc-abiale" 2>nul
mkdir "public\creators\belle-soeur" 2>nul
mkdir "public\creators\angele-epouta" 2>nul
mkdir "public\creators\angelina-creations" 2>nul
mkdir "public\creators\atelier-isse-by-lita" 2>nul
mkdir "public\creators\beitch-faro" 2>nul

echo ✅ Dossiers créés
echo.
echo 💡 INSTRUCTIONS:
echo    1. Copiez vos images dans les dossiers correspondants
echo    2. Organisez par styliste
echo    3. Lancez la migration avec: node src/scripts/migrateImagesWorking.js
echo.
pause
