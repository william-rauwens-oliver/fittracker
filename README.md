# 🏋️‍♂️ FitTracker

**FitTracker** est une application web simple et sans pub qui permet de suivre facilement ses performances sportives : objectifs, entraînements, stats, courbes... tout y est.

---

## 🎯 Objectif

Aider les utilisateurs à atteindre leurs objectifs physiques grâce à :
- une interface claire
- un suivi précis
- et une expérience sans distraction

---

## 🚀 Fonctionnalités

- ✅ Création de compte / Connexion
- ✅ Gestion du profil (âge, taille, poids…)
- ✅ Ajout de **séances d’entraînement** (durée, calories, titre…)
- ✅ Suivi des **objectifs sportifs personnalisés**
- ✅ Statistiques : nombre de séances, temps total, calories brûlées…
- ✅ **Graphiques** des performances (Chart.js)
- ✅ Responsive mobile & desktop
- ✅ Authentification sécurisée avec JWT
- ✅ Navigation protégée (routes privées)
- 🔜 Intégration de l’API [Wger](https://wger.de/en/software/api)

---

## 🧰 Stack technique

| Technologie | Usage |
|-------------|-------|
| **React** + **React Router** | Frontend (UI) |
| **Tailwind CSS** | Design responsive |
| **Node.js** + **Express** | Backend (API REST) |
| **PostgreSQL** | Base de données relationnelle |
| **JWT** | Authentification |
| **Chart.js** | Graphiques statistiques |
| **Axios** | Requêtes HTTP |

---

## 📸 Aperçu

### 🖥️ Dashboard utilisateur

> Objectifs, séances, courbes d’évolution 👇

![screenshot](./screenshot.png)

---

## ⚙️ Installation locale

### 1. Cloner le dépôt

```bash
git clone https://github.com/prenom-nom/fittracker.git
cd fittracker

cd backend
npm install

cd ../frontend
npm install

PORT=5000
JWT_SECRET=supersecret
DATABASE_URL=postgresql://votre_utilisateur:votre_motdepasse@localhost:5432/fittracker

Démarrer le Backend

cd backend
npm run dev

Démarrer le frontend

cd frontend
npm start

Ce projet a été réalisé par William et Chaima,
dans le cadre de La Plateforme, pour le module de développement web fullstack.