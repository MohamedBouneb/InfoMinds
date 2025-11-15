const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const eleveSchema = new mongoose.Schema({

    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    dateInscription: { type: Date, default: Date.now },
});

// Avant de sauvegarder un élève, hacher son mot de passe
// pre -> kbal metetzed fl base t3mel el hashage
// The Mongoose pre method, also known as a "pre-hook" or "pre-middleware," 
// is a mechanism to execute functions before a specific Mongoose event occurs. 
// This allows for the implementation of custom logic, 
// such as data validation, hashing, or logging, 
// before a document is saved, updated, or removed from the database.
eleveSchema.pre("save", async function (next) {
    if (!this.isModified("motDePasse")) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10); // génère un sel
        this.motDePasse = await bcrypt.hash(this.motDePasse, salt); // hachage
        next();
    } catch (err) {
        next(err);
    }
});
// Méthode pour comparer le mot de passe saisi avec le mot de passe haché

eleveSchema.methods.comparePassword = async function (motDePasse) {
    return await bcrypt.compare(motDePasse, this.motDePasse);
}
const Eleve = mongoose.model("Eleve", eleveSchema);
module.exports = Eleve;