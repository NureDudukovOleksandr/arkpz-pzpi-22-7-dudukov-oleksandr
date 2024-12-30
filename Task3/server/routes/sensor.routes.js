// Файл: sensor.routes.js
const express = require('express');
const Sensor = require('../models/sensor.model');
const router = express.Router();

// Отримання всіх сенсорів
router.get('/', async (req, res) => {
  try {
    const sensors = await Sensor.find();
    res.status(200).json(sensors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Отримання сенсора за ID
router.get('/:id', async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id);
    if (!sensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    res.status(200).json(sensor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Додавання нового сенсора
router.post('/', async (req, res) => {
  try {
    const sensor = new Sensor(req.body);
    await sensor.save();
    res.status(201).json(sensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Оновлення сенсора за ID
router.put('/:id', async (req, res) => {
  try {
    const updatedSensor = await Sensor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    res.status(200).json(updatedSensor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Видалення сенсора за ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedSensor = await Sensor.findByIdAndDelete(req.params.id);
    if (!deletedSensor) {
      return res.status(404).json({ message: 'Sensor not found' });
    }
    res.status(200).json({ message: 'Sensor successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
