const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  type: { type: String, enum: ['Laboratory', 'Office', 'Polygon'], required: true },
  name: { type: String, required: true },
  capacity: Number,
  status: { type: String, enum: ['Free', 'Occupied'], required: true },
  temperature: Number,
  humidity: Number,
  co2_level: Number
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
