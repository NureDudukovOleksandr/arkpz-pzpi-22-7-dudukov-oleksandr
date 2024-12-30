const express = require('express');
const Location = require('../models/location.model');
const router = express.Router();

// Створення нової локації
router.post('/', async (req, res) => {
  try {
    const location = new Location(req.body); // створення нового об'єкта локації
    await location.save(); // збереження локації в базі даних
    res.status(201).json(location); // відповідаємо новою локацією
  } catch (error) {
    res.status(400).json({ message: error.message }); // обробка помилок
  }
});

// Отримання всіх локацій
router.get('/', async (req, res) => {
  try {
    const locations = await Location.find(); // знаходження всіх локацій
    res.status(200).json(locations); // повертаємо локації
  } catch (error) {
    res.status(400).json({ message: error.message }); // обробка помилок
  }
});

module.exports = router;
