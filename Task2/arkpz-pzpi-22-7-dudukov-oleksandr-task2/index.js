const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json'); // Для використання статичного swagger.json

// Import Routes
const userRoutes = require('./routes/user.routes');
const locationRoutes = require('./routes/location.routes');
const adminRoutes = require('./routes/admin.routes');
const messageRoutes = require('./routes/message.routes');
const notificationRoutes = require('./routes/notification.routes');
const sensorRoutes = require('./routes/sensor.routes');
const locationConditionsRoutes = require('./routes/locationConditions.routes'); 

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // To parse incoming JSON requests

// Swagger setup (статичний JSON файл)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const urldatabase = "mongodb+srv://konopqgg:ueTTeJnb2nV0x12M@cluster1.oh9qd.mongodb.net/"
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(urldatabase, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1); // Exit if unable to connect to DB
  }
};

// Connect to DB
connectDB();

// Use routes
app.use('/users', userRoutes);
app.use('/locations', locationRoutes);
app.use('/admins', adminRoutes);
app.use('/messages', messageRoutes);
app.use('/notifications', notificationRoutes);
app.use('/sensors', sensorRoutes);
app.use('/location-conditions', locationConditionsRoutes); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
