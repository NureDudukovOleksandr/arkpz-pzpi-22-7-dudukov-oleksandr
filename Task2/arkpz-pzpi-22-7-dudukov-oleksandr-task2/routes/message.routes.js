const express = require('express');
const Message = require('../models/message.model');
const router = express.Router();

// Create a new message
router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find().populate('sender_id receiver_id'); // To include user data for sender and receiver
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
