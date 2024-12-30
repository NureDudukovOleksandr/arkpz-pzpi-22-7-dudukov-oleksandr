const express = require('express');
const Notification = require('../models/notification.model'); 
const User = require('../models/user.model'); 
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find(); 
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


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

module.exports = router;
