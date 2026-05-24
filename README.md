# Jago — Marketplace UEMOA

**Jago** est la marketplace de référence pour la zone UEMOA. Achète, vends et échanges entre particuliers — immobilier, véhicules, électronique, agriculture, vêtements et plus encore.

## Stack
- React + Vite (SPA)
- Firebase Auth + Firestore
- Cloudinary (photos)
- Capacitor (iOS + Android)

## Domaine
https://appjago.com

## Déploiement
```bash
git push origin main  # déclenche automatiquement le build Vercel
```

## Build Android
```bash
npm run build
npx cap sync android
cd android && gradlew bundleRelease
# AAB → android/app/build/outputs/bundle/release/app-release.aab
```
