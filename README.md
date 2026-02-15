# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


#  SmartCar Admin - Frontend (React.js)

Cette partie du projet concerne l'interface d'administration de **SmartCar**, une plateforme de gestion de flotte automobile. L'application communique avec un backend Spring Boot pour gérer les véhicules, les clients et le cycle de vie des réservations.

---

##  Technologies Utilisées

| Technologie | Usage |
| :--- | :--- |
| **React 18** | Bibliothèque UI principale |
| **Vite.js** | Build tool ultra-rapide |
| **Tailwind CSS** | Styling utilitaire et responsive |
| **React Router 6** | Gestion de la navigation et protection des routes |
| **React Icons** | Iconographie du Dashboard |

---

##   Fonctionnalités Clés

###  Authentification & Sécurité
- **Login Admin** : Seuls les utilisateurs ayant le rôle `ADMIN` peuvent accéder au dashboard.
- **Route Guarding** : Protection automatique des routes privées. Si un utilisateur non connecté tente d'accéder à `/dashboard`, il est redirigé vers `/login`.
- **Session Management** : Utilisation du `localStorage` pour persister l'état de l'utilisateur.

###  Dashboard & Gestion
- **Gestion des Réservations** : Interface pour accepter (`ACCEPTED`), marquer le retour (`RETURNED`) ou annuler (`CANCELED`) les demandes des clients.
- **Visualisation de Flotte** : Affichage dynamique des véhicules avec indicateurs de disponibilité.
- **Synchronisation Backend** : Communication directe avec l'API REST via le port `8080`.

---

##  Architecture du Projet

```text
src/
 ├── layouts/        # Layout principal avec Sidebar
 ├── pages/          # Vues principales (Login, Dashboard, Reservations, etc.)
 ├── components/     # Composants réutilisables
 ├── App.jsx         # Configuration de React Router et Protection
 └── main.jsx        # Point d'entrée de l'application

```
 ## Instalation
 ```
#  Clonez le dépôt
git clone https://github.com/votre-username/votre-repo-name.git

#  Accédez au dossier du projet
cd carmarketpro-ui

#  Installez les dépendances
npm install

#  Lancez l'application en mode développement
npm run dev
```
