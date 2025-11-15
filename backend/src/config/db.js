// driver offic pour intergir avec Mongodb (schémas, valider les données,effectuer des requêtes)
const mongoose = require("mongoose");
require("dotenv").config(); //pour charger les var denv men fichier .env

// fn connectDB asyn pour etablir le conxion à la bdd
// Async / await attendre la connecxion avant de continuer l'exection
const connectDB = async () => {
    try {
        // Récupérer l'URI de connexion depuis les variables d'environnement
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true, // Analyse correcte de l’URL MongoDB
            useUnifiedTopology: true, // Nouveau moteur de topologie (stable)
        });
        console.log(" Connecté à MongoDB Mrigla");
    } catch (error) {
        console.error("❌ Erreur de connexion à MongoDB:", error);
        process.exit(1); // Arrête l'application si la DB ne se connecte pas
    }
};
module.exports = connectDB;