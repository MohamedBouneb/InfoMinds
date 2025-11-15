const Event = require('../models/event');

class EventService {
  async creerEvent(donnees) {
    const event = new Event(donnees);
    await event.save();
    return event;
  }

  async getEvents() {
    const events = await Event.find().sort({ createdAt: -1 });
    return events;
  }
}

module.exports = new EventService();