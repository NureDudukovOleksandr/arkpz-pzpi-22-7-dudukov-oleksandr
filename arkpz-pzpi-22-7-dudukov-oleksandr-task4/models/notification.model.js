const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  notification_text: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now, // Устанавливаем текущую дату по умолчанию
  },
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
