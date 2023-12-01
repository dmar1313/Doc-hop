const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();

const driversRouter = require('./api/drivers');
const vehiclesRouter = require('./api/vehicles');
const usersRouter = require('./api/users');
const tripsRouter = require('./api/trips');

// Firebase Admin initialization
const serviceAccount = require('../firebase-admin-sdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://doc-hop-default-rtdb.firebaseio.com'
});

const db = admin.database();

app.use('/api/drivers', driversRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

// Define a simple route that uses Firebase
app.get('/api', (req, res) => {
  // Example Firebase usage
  const ref = db.ref('some/path');
  ref.once('value', (snapshot) => {
    res.json(snapshot.val());
  }, (error) => {
    res.status(500).json({ error: error.message });
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
