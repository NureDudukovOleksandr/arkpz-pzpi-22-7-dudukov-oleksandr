const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Laboratory', 'Office', 'Polygon'],
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true, // Имена локаций должны быть уникальными
  },
  capacity: {
    type: Number,
    default: 0, // Если не указано, будет 0
  },
  status: {
    type: String,
    enum: ['Free', 'Occupied'],
    required: true,
    default: 'Free',
  },
  temperature: {
    type: Number,
    required: true, // Убедимся, что данные всегда есть
  },
  humidity: {
    type: Number,
    required: true, // Аналогично
  },
  co2_level: {
    type: Number,
    required: true, // Аналогично
  },
});

const Location = mongoose.model('Location', locationSchema);
module.exports = Location;
