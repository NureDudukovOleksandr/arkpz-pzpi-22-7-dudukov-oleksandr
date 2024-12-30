const express = require('express');
const Sensor = require('../models/sensor.model'); // Assuming the Sensor model is defined
const router = express.Router();

// GET route to fetch all sensors from the database
router.get('/', async (req, res) => {
  try {
    const sensors = await Sensor.find(); // Assuming you use Mongoose to interact with MongoDB
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
