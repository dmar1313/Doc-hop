const express = require('express');
const cors = require('cors');
const app = express();
const driversRouter = require('./api/drivers');
const vehiclesRouter = require('./api/vehicles');
const usersRouter = require('./api/users');
const tripsRouter = require('./api/trips'); 
const firebaseAdmin = require('./firebase-admin-sdk.json')
app.use('/api/drivers', driversRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/config/firebaseAdmin', firebaseAdmin)
app.use('/api/uploadCSV', require('./api/uploadCSV'));
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
