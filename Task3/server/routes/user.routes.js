const express = require('express');
const User = require('../models/user.model');
const Admin = require('../models/admin.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Реєстрація нового користувача
router.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, password, role, phone, location_id } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Користувач з таким email вже існує' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
      phone,
      location_id
    });

    const savedUser = await newUser.save();

    if (role === 'Administrator') {
      const admin = new Admin({
        admin_id: savedUser._id,
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
        email: savedUser.email,
        role: savedUser.role
      });

      await admin.save();
    }

    res.status(201).json({
      message: 'Користувача успішно зареєстровано',
      user: {
        user_id: savedUser._id,
        first_name: savedUser.first_name,
        last_name: savedUser.last_name,
        email: savedUser.email,
        role: savedUser.role
      }
    });
  } catch (error) {
    console.error('Помилка під час реєстрації користувача:', error);
    res.status(500).json({ message: 'Щось пішло не так', error: error.message });
  }
});

// Отримання списку всіх користувачів
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error('Помилка отримання користувачів:', error);
    res.status(500).json({ message: 'Щось пішло не так', error: error.message });
  }
});

// Отримання користувача за ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Помилка отримання користувача:', error);
    res.status(500).json({ message: 'Щось пішло не так', error: error.message });
  }
});

// Оновлення даних користувача
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    if (req.body.role === 'Administrator') {
      const existingAdmin = await Admin.findOne({ admin_id: updatedUser._id });
      if (!existingAdmin) {
        const admin = new Admin({
          admin_id: updatedUser._id,
          first_name: updatedUser.first_name,
          last_name: updatedUser.last_name,
          email: updatedUser.email,
          role: 'Administrator'
        });
        await admin.save();
      }
    } else if (req.body.role === 'Employee') {
      await Admin.deleteOne({ admin_id: updatedUser._id });
    }

    res.status(200).json({
      message: 'Дані користувача успішно оновлено',
      user: updatedUser
    });
  } catch (error) {
    console.error('Помилка оновлення користувача:', error);
    res.status(500).json({ message: 'Щось пішло не так', error: error.message });
  }
});

// Видалення користувача
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Користувача не знайдено' });
    }

    await Admin.deleteOne({ admin_id: user._id });

    res.status(200).json({ message: 'Користувача успішно видалено' });
  } catch (error) {
    console.error('Помилка під час видалення користувача:', error);
    res.status(500).json({ message: 'Щось пішло не так', error: error.message });
  }
});

module.exports = router;
