const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  timestamp: { type: Date, default: Date.now }
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
