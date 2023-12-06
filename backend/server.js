const cors = require('cors');
const driversRouter = require('./api/drivers');
const vehiclesRouter = require('./api/vehicles');
const usersRouter = require('./api/users');
const tripsRouter = require('./api/trips'); 
const admin = require('firebase-admin');
const express = require('express');
const serviceAccount = require('./firebase-admin-sdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const app = express();  

app.use(cors({
  origin: '*' 
}));  
app.use('/api/drivers', driversRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use('/api/uploadCSV', require('./api/uploadCSV'));
app.use((error, req, res, next) => {
  console.error(error); 
  res.status(500).send('Internal Server Error');
});
// Middleware
app.use(cors({
  origin: 'http://localhost:3000' 
}));// Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
