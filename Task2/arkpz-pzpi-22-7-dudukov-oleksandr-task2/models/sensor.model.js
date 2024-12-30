const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  type: { type: String, enum: ['Temperature', 'Humidity', 'CO2'], required: true },
  location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', required: true },
  status: { type: String, enum: ['Active', 'Inactive'], required: true }
});

const Sensor = mongoose.model('Sensor', sensorSchema);
module.exports = Sensor;
