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

// Редагування локації
router.put('/:id', async (req, res) => {
  try {
    const updatedLocation = await Location.findByIdAndUpdate(req.params.id, req.body, { new: true }); // оновлення локації
    if (!updatedLocation) {
      return res.status(404).json({ message: 'Локацію не знайдено' }); // якщо локацію не знайдено
    }
    res.status(200).json(updatedLocation); // повертаємо оновлену локацію
  } catch (error) {
    res.status(400).json({ message: error.message }); // обробка помилок
  }
});

// Видалення локації
router.delete('/:id', async (req, res) => {
  try {
    const deletedLocation = await Location.findByIdAndDelete(req.params.id); // видалення локації
    if (!deletedLocation) {
      return res.status(404).json({ message: 'Локацію не знайдено' }); // якщо локацію не знайдено
    }
    res.status(200).json({ message: 'Локацію успішно видалено' }); // успішне видалення
  } catch (error) {
    res.status(400).json({ message: error.message }); // обробка помилок
  }
});

module.exports = router;
