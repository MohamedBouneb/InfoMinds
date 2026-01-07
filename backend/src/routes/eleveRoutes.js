const express = require('express');
const router = express.Router();
const { inscrireEleve, loginEleve, getAllEleves, getEleveByNom } = require('../controllers/eleveController'); 

// ✅ Routes corrigées
router.get('/recherche/:nom', getEleveByNom);
router.get('/', getAllEleves);
router.post('/inscription', inscrireEleve);


router.post('/login', loginEleve);

module.exports = router;