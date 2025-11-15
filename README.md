
# InfoMinds - Application de Gestion Scolaire

Application MERN (MongoDB, Express, React, Node.js) pour la gestion des élèves et événements.

## Fonctionnalités

### Gestion des Élèves
- **Inscription** des nouveaux élèves
- **Liste** de tous les élèves
- **Recherche** par nom ou prénom

### Gestion des Événements
- **Création** d'événements
- **Liste** de tous les événements
- **Interface** simple et intuitive

## Technologies Utilisées

### Backend
- **Node.js** - Environnement d'exécution
- **Express.js** - Framework web
- **MongoDB** - Base de données
- **Mongoose** - ODM pour MongoDB
- **CORS** - Gestion des requêtes cross-origin

### Frontend
- **React** - Librairie UI
- **JavaScript** - Langage de programmation
- **CSS** - Styling

##  Structure du Projet
infoMinds-app/
├── backend/
│ ├── models/
│ │ ├── Eleve.js
│ │ └── Event.js
│ ├── controllers/
│ │ ├── eleveController.js
│ │ └── eventController.js
│ ├── services/
│ │ ├── eleveService.js
│ │ └── eventService.js
│ ├── routes/
│ │ ├── eleveRoutes.js
│ │ └── eventRoutes.js
│ ├── config/
│ │ └── db.js
│ └── index.js
└── frontend/
├── src/
│ ├── components/
│ │ ├── InscriptionEleve.jsx
│ │ ├── ListeEleves.jsx
│ │ └── ListeEvents.jsx
│ ├── services/
│ │ ├── eleveService.js
│ │ └── eventService.js
│ └── App.jsx
└── package.json

##  Installation et Démarrage

### 1. Backend

cd backend
npm install
npm run dev
Le serveur démarre sur http://localhost:3000

2. Frontend

cd frontend
npm install
npm run dev
L'application démarre sur http://localhost:5173

Variables d'Environnement
Créez un fichier .env dans le dossier backend :

MONGO_URI=votre_uri_mongodb
JWT_SECRET=votre_secret_jwt
PORT=3000
API Routes
-Routes Élèves
Méthode	Route	Description :
    POST	/api/eleves/inscription	Inscrire un nouvel élève
    POST	/api/eleves/login	Connexion élève
    GET	/api/eleves	Liste de tous les élèves
    GET	/api/eleves/recherche/:nom	Rechercher élève par nom
-Routes Événements
Méthode	Route	Description :
    POST	/api/events	Créer un nouvel événement
    GET	/api/events	Liste de tous les événements
