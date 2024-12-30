const express = require('express');
const Location = require('../models/location.model');
const Notification = require('../models/notification.model');
const router = express.Router();


const temperatureThreshold = { min: 18, max: 24 };
const humidityThreshold = { min: 30, max: 60 };
const co2Threshold = { max: 1000 };


const createNotification = async (locationName, alertMessage) => {
  const notification = new Notification({
    notification_text: `Попередження для локації ${locationName}: ${alertMessage}`,
  });
  await notification.save();
  return notification;
};


router.post('/', async (req, res) => {
  const { location_id } = req.body;

  if (!location_id) {
    return res.status(400).json({ message: 'Потрібно вказати location_id.' });
  }

  try {
    
    const location = await Location.findById(location_id);
    if (!location) {
      return res.status(404).json({ message: 'Локацію не знайдено.' });
    }

    const { temperature, humidity, co2_level, name } = location;
    let alertMessage = '';
    let isAlert = false;

    
    if (temperature < temperatureThreshold.min || temperature > temperatureThreshold.max) {
      alertMessage += `Температура виходить за допустимі межі. Поточна: ${temperature}°C. `;
      isAlert = true;
    }

    
    if (humidity < humidityThreshold.min || humidity > humidityThreshold.max) {
      alertMessage += `Вологість виходить за допустимі межі. Поточна: ${humidity}%. `;
      isAlert = true;
    }

    
    if (co2_level > co2Threshold.max) {
      alertMessage += `Рівень CO2 занадто високий. Поточний: ${co2_level} ppm. `;
      isAlert = true;
    }

    
    if (isAlert) {
      const notification = await createNotification(name, alertMessage);

      return res.status(200).json({
        message: 'Умови локації перевірено, сповіщення надіслано.',
        notification: notification,
      });
    } else {
      return res.status(200).json({
        message: 'Умови локації знаходяться в межах допустимих значень.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Помилка під час перевірки умов локації.', error: error.message });
  }
});

module.exports = router;
