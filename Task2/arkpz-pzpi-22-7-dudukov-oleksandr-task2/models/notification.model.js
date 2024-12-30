const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  notification_text: String,
  timestamp: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
module.exports = Notification;
