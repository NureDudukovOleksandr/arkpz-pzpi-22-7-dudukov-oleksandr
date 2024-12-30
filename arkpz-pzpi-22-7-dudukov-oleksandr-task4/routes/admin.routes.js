const express = require('express');
const Admin = require('../models/admin.model');
const router = express.Router();

// Отримати всіх адміністраторів
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
