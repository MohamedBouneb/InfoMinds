
const eleveService = require('../services/eleveService');

exports.getEleveByNom = async (req, res) => {
  try {
    const { nom } = req.params; // Récupère le nom depuis l'URL
    
    if (!nom) {
      return res.status(400).json({
        success: false,
        message: "Le paramètre 'nom' est requis"
      });
    }

    const result = await eleveService.getEleveByNom(nom);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message
    });
  }
};

exports.getAllEleves = async (req, res) => {
  try {
    const result = await eleveService.getAllEleves();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: err.message 
    });
  }
};

exports.inscrireEleve = async (req, res) => {
  try {
    const result = await eleveService.inscrireEleve(req.body);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginEleve = async (req, res) => {
  try {
    const result = await eleveService.loginEleve(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};