const express = require('express');
const Location = require('../models/location.model');
const Notification = require('../models/notification.model');
const router = express.Router();

// Пороги для перевірки
const temperatureThreshold = { min: 18, max: 24 }; // Температура між 18°C та 24°C
const humidityThreshold = { min: 30, max: 60 }; // Вологість між 30% та 60%
const co2Threshold = { max: 1000 }; // CO2 рівень до 1000 ppm

// Функція для створення сповіщень
const createNotification = async (locationName, alertMessage) => {
  const notification = new Notification({
    notification_text: `Alert for location ${locationName}: ${alertMessage}`,
  });
  await notification.save();
  return notification;
};

// Маршрут для перевірки умов локації
router.post('/check-conditions', async (req, res) => {
  const { location_id } = req.body;

  try {
    // Знайдемо локацію за її ID
    const location = await Location.findById(location_id);
    if (!location) {
      return res.status(404).json({ message: 'Location not found' });
    }

    // Отримуємо дані з локації
    const { temperature, humidity, co2_level, name } = location;
    let alertMessage = '';
    let isAlert = false;

    // Перевірка температури
    if (temperature < temperatureThreshold.min || temperature > temperatureThreshold.max) {
      alertMessage += `Temperature is out of range. Current: ${temperature}°C. `;
      isAlert = true;
    }

    // Перевірка вологості
    if (humidity < humidityThreshold.min || humidity > humidityThreshold.max) {
      alertMessage += `Humidity is out of range. Current: ${humidity}%. `;
      isAlert = true;
    }

    // Перевірка рівня CO2
    if (co2_level > co2Threshold.max) {
      alertMessage += `CO2 level is too high. Current: ${co2_level} ppm. `;
      isAlert = true;
    }

    // Якщо є порушення умов, створюємо сповіщення
    if (isAlert) {
      const notification = await createNotification(name, alertMessage);

      // Відправка відповіді з деталями сповіщення
      return res.status(200).json({
        message: 'Location conditions checked, and notification sent.',
        notification: notification,
      });
    } else {
      // Якщо всі умови в межах допустимих порогів
      return res.status(200).json({
        message: 'Location conditions are within acceptable range.',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error checking location conditions', error: error.message });
  }
});

module.exports = router;
