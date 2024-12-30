const express = require('express');
const Notification = require('../models/notification.model'); 
const User = require('../models/user.model'); 
const router = express.Router();

// Отримання всіх сповіщень
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find(); 
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Отримання сповіщення за ID
router.get('/:id', async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: 'Сповіщення не знайдено' });
    }
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Додавання нового сповіщення для всіх користувачів
router.post('/', async (req, res) => {
  const { notification_text } = req.body;

  if (!notification_text) {
    return res.status(400).json({ message: 'Текст сповіщення обов\'язковий' });
  }

  try {
    const users = await User.find();

    const notifications = await Promise.all(users.map(async (user) => {
      const notification = new Notification({
        user_id: user._id,
        notification_text,
        timestamp: new Date(),
      });
      await notification.save();
      return notification;
    }));

    res.status(201).json({
      message: 'Сповіщення успішно надіслано всім користувачам',
      notifications,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Редагування сповіщення за ID
router.put('/:id', async (req, res) => {
  const { notification_text } = req.body;

  if (!notification_text) {
    return res.status(400).json({ message: 'Текст сповіщення обов\'язковий' });
  }

  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      { notification_text, timestamp: new Date() },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: 'Сповіщення не знайдено' });
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Видалення сповіщення за ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
    if (!deletedNotification) {
      return res.status(404).json({ message: 'Сповіщення не знайдено' });
    }

    res.status(200).json({ message: 'Сповіщення успішно видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
