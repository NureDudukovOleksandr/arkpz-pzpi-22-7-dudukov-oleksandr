const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    first_name: { 
      type: String, 
      required: true 
    },
    last_name: { 
      type: String, 
      required: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true, 
      lowercase: true, 
      trim: true 
    },
    password: { 
      type: String, 
      required: true 
    },
    role: { 
      type: String, 
      enum: ['Employee', 'Administrator'], 
      required: true 
    },
    phone: { 
      type: String, 
      default: null 
    },
    location_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Location', 
      default: null 
    },
  },
  {
    timestamps: true, // This will add `createdAt` and `updatedAt` fields to the schema
  }
);

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
