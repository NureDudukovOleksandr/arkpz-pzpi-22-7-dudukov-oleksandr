const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  admin_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, default: 'Administrator' }
});

module.exports = mongoose.model('Admin', adminSchema);
