const mongoose = require('mongoose');

const locationConditionsSchema = new mongoose.Schema({
  location_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Location', // Це має бути модель Location
    required: true 
  },
  temperature: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  humidity: {
    min: { type: Number, required: true },
    max: { type: Number, required: true }
  },
  co2_level: {
    max: { type: Number, required: true }
  },
  description: { 
    type: String, 
    required: true 
  },
  last_updated: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('LocationConditions', locationConditionsSchema);
