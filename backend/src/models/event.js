const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;