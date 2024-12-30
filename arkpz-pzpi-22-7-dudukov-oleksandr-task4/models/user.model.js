const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Employee', 'Administrator'], required: true },
    phone: { type: String, default: null },
    location_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Location', default: null }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', userSchema);
