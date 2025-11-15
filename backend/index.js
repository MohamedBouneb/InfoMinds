const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const connectDB = require('./src/config/db');
const app = express();

const cors = require('cors');
app.use(cors({origin:"http://localhost:5173"}));

// Middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

// Routes
const eleveRoutes = require('./src/routes/eleveRoutes');
const eventRoutes = require('./src/routes/eventRoutes');

app.use('/api/eleves', eleveRoutes); // route pour les élèves
app.use('/api/events', eventRoutes); // route pour les événements


// Route de test
app.get('/', (req, res) => {
  res.json({ message: 'Asslema shebeb No Route ' });
});

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

module.exports = app;