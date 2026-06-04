# TODOS — Jago

## Dette technique différée

### Découper App.jsx en composants
**Quoi :** Séparer `src/App.jsx` (actuellement ~2100 lignes après Trust Layer) en composants distincts : `AuthScreen`, `HomeScreen`, `AdModal`, `ProfileScreen`, `ChatScreen`, `AdminScreen`, et extraire les styles dans un fichier CSS séparé.

**Pourquoi :** Le fichier monolithique ralentit les reviews, rend les bugs difficiles à isoler, et bloque l'onboarding d'un 2e développeur.

**Condition de déclenchement :** Quand un 2e développeur touche au code, ou quand la PR prend > 30min à reviewer faute de lisibilité.

**Dépend de :** Validation de la demande (10 utilisateurs réels). Ne pas refactoriser avant d'avoir des utilisateurs — risk de perdre du temps sur du code que personne n'utilise encore.

**Noté le :** 2026-06-04 (après review architecturale Trust Layer)
