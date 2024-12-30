const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  type: { type: String, required: true }, // Тип сенсора
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true }, // ID локації
  value: { type: Number, required: true }, // Значення сенсора
  timestamp: { type: Date, default: Date.now }, // Час останнього оновлення
});

const Sensor = mongoose.model('Sensor', sensorSchema);
module.exports = Sensor;
