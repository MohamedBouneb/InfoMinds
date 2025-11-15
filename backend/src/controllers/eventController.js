const eventService = require('../services/eventService');

exports.creerEvent = async (req, res) => {
  try {
    const event = await eventService.creerEvent(req.body);
    res.status(201).json({
      message: "Événement créé ✅",
      event: event
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await eventService.getEvents();
    res.status(200).json({
      message: "Liste des événements",
      events: events
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};