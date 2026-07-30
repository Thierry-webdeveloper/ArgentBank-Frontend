<img src="img/argentBankLogo.png" width="300" alt="Argent Bank — Application bancaire">

Projet 10 de la formation **Intégrateur Web** (OpenClassrooms).

## 🎯 Description

Argent Bank est une application bancaire fictive.  
Développement du front-end en **React**, connecté à une API REST déjà développée (Node.js + MongoDB), permettant l'authentification des utilisateurs et la gestion de leur profil.  
La gestion du state de l'application repose sur **Redux** (Redux Toolkit).

## ✨ Fonctionnalités (Phase 1 — Authentification)

- Page d'accueil publique
- Connexion utilisateur (email + mot de passe), avec gestion des erreurs d'identifiants
- Déconnexion
- Page de profil accessible uniquement une fois connecté
- Modification du pseudo (nom et prénom non modifiables)

## 🛠️ Stack technique

- React (via Vite)
- Redux Toolkit (slices, thunk middleware)
- React Router (navigation)
- Axios (appels API)
- Node.js + MongoDB (back-end, fourni séparément — voir lien ci-dessous)

## 🚀 Installation et démarrage

⚠️ Le back-end Argent Bank doit être démarré en local au préalable (voir le repo back-end ci-dessous).

```bash
# Cloner le repository
git clone https://github.com/Thierry-webdeveloper/ArgentBank-Frontend.git

# Installer les dépendances
npm install

# Lancer l'application en mode développement
npm run dev
```

Le site est accessible sur [http://localhost:5173](http://localhost:5173) (port par défaut de Vite).

## 📋 Livrables du projet

- Code source front-end (Phase 1 — Authentification) — ce repository
- Document Swagger au format YAML (Phase 2 — proposition d'API pour la gestion des transactions)

## 🔗 Liens

- **Repo front-end (ce dépôt)** : https://github.com/Thierry-webdeveloper/ArgentBank-Frontend
- **Repo back-end** : https://github.com/Thierry-webdeveloper/ArgentBank-Backend

---

_Thierry-webdeveloper — Formation OpenClassrooms — Intégrateur Web_
