const express = require('express');
const router = express.Router();
const { creerEvent, getEvents } = require('../controllers/eventController');

router.post('/', creerEvent);
router.get('/', getEvents);

module.exports = router;