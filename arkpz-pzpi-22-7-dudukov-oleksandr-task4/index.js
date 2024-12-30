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


// Mqtt Start
const mqtt = require("mqtt");

// MQTT broker URL and topic configuration
const brokerUrl = "mqtt://broker.hivemq.com";
const topic = "iot/data";

// Connect to MQTT broker
const mqttClient = mqtt.connect(brokerUrl);

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker");

  // Subscribe to the specified topic
  mqttClient.subscribe(topic, (err) => {
    if (err) {
      console.error("Failed to subscribe to topic:", err);
    } else {
      console.log(`Successfully subscribed to topic: ${topic}`);
    }
  });
});

// Handle incoming MQTT messages
mqttClient.on("message", async (topic, message) => {
  try {
    const data = JSON.parse(message.toString());
    console.log("Received data:", data);

    // Save data to MongoDB
    const Data = require("./models/Data.js");
    const newData = new Data(data);
    await newData.save();
    console.log("Data successfully saved to MongoDB");
  } catch (err) {
    console.error("Error processing MQTT message:", err);
  }
});

// Handle MQTT errors
mqttClient.on("error", (err) => {
  console.error("MQTT connection error:", err);
});

// Mqtt END

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
