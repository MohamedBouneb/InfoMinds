// jsonwebtoken qui permet de signer et vérifier des tokens JWT
// le JWT contient un payload (ex : id, email) 
// et une signature pour s’assurer que le token n’a pas été modifié.
const jwt = require('jsonwebtoken');
const Eleve = require('../models/Eleve');

const verifierToken = async (req, res, next) => {
  try {
    // 1️⃣ Récupérer le token depuis le header Authorization Ex: Authorization: Bearer <token>.
    const authHeader = req.headers.authorization;
    // Vérifie si le header existe et commence par Bearer .
    // Sinon, on renvoie une erreur 401 (non autorisé).
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Accès refusé : token manquant' });
    }

    // On extrait le token réel après le mot-clé Bearer.
    // Ex: Bearer abc.def.ghi → token = abc.def.ghi.
    const token = authHeader.split(' ')[1];

    // Vérifie la validité du token avec la clé secrète.
    // Si le token est valide, on obtient le payload décodé (decoded.id, decoded.email).
    // Si le token est falsifié ou expiré, jwt.verify lance une erreur.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // On cherche l’élève correspondant dans MongoDB grâce à l’ID du token.
    // .select('-motDePasse') → on exclut le mot de passe pour ne pas l’exposer.
    req.eleve = await Eleve.findById(decoded.id).select('-motDePasse');

    if (!req.eleve) {
      return res.status(401).json({ message: 'Utilisateur non trouvé' });
    }
    
    // Tout est correct, donc on passe à la route suivante (ex : /profil).
    next(); // passe à la route suivante
  } catch (err) {
    res.status(401).json({ message: 'Token invalide', erreur: err.message });
  }
};

module.exports = verifierToken;
