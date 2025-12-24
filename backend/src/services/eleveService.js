const Eleve = require('../models/Eleve');
const jwt = require('jsonwebtoken');


class EleveService {

  async getEleveByNom(nom) {
    try {
      const eleves = await Eleve.find({ nom: nom }).select('-motDePasse');
      
      if (eleves.length === 0) {
        throw new Error(`Aucun élève trouvé avec le nom exact "${nom}"`);
      }

      return {
        success: true,
        message: `${eleves.length} élève(s) trouvé(s)`,
        count: eleves.length,
        eleves: eleves
      };
    } catch (err) {
      throw new Error("Erreur lors de la recherche: " + err.message);
    }
  }
  

  async getAllEleves() {
    try {
      const eleves = await Eleve.find()
        .select('-motDePasse') 
        .sort({ dateInscription: -1 });

      return {
        success: true,
        message: `${eleves.length} élève(s) trouvé(s)`,
        count: eleves.length,
        eleves: eleves
      };
    } catch (err) {
      throw new Error("Erreur lors de la récupération des élèves: " + err.message);
    }
  }

  // Inscription   
  async inscrireEleve(donneesInscription) {
    const { nom, prenom, email, motDePasse,role } = donneesInscription;

    // Vérifier si l'email existe
    const existe = await Eleve.findOne({ email });
    if (existe) {
      throw new Error("Cet email est déjà utilisé.");
    }

    // Créer l'élève
    const nouvelEleve = new Eleve({ email, motDePasse, nom, prenom, role });
    await nouvelEleve.save();

    return {
      message: "Inscription avec succès 🎓",
      eleve: {
        email: nouvelEleve.email,
        nom: nouvelEleve.nom,
        prenom: nouvelEleve.prenom,
        role: nouvelEleve.role,
        dateInscription: nouvelEleve.dateInscription
      }
    };
  }

  // Login - logique métier pure
  async loginEleve(credentials) {
    const { email, motDePasse } = credentials;

    const eleve = await Eleve.findOne({ email });
    if (!eleve) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    const isMatch = await eleve.comparePassword(motDePasse);
    if (!isMatch) {
      throw new Error("Email ou mot de passe incorrect.");
    }

    // Générer token
    const token = jwt.sign(
      { id: eleve._id, email: eleve.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      message: "Connexion réussie ✅",
      token,
      eleve: {
        nom: eleve.nom,
        prenom: eleve.prenom,
        email: eleve.email,
        dateInscription: eleve.dateInscription
      }
    };
  }
}

module.exports = new EleveService();