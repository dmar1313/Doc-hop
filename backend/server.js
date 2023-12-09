<<<<<<< HEAD
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const app = express();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const driversRouter = require('./api/drivers');
const vehiclesRouter = require('./api/vehicles');
const usersRouter = require('./api/users');
const tripsRouter = require('./api/trips');
const router = express.Router();
// Firebase Admin initialization
const serviceAccount = require('../firebase-admin-sdk.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://doc-hop-default-rtdb.firebaseio.com'
});
const db = admin.firestore();

app.use('/api/drivers', driversRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);

const csvParser = require('csv-parser');
const fs = require('fs');

router.get('/', async (req, res) => {
  try {
    const { fromDate, toDate, tripNumber, driver } = req.query;
    let query = db.collection('trips');

    // Add non-date filters directly to the query
    if (tripNumber) {
      query = query.where('Trip Number', '==', tripNumber);
    }
    if (driver) {
      query = query.where('Driver', '==', driver);
    }

    const snapshot = await query.get();
    const trips = [];
    snapshot.forEach(doc => {
      const trip = { id: doc.id, ...doc.data() };
      // Filter by date in server code
      if ((!fromDate || new Date(trip['Trip Date']) >= new Date(fromDate)) &&
          (!toDate || new Date(trip['Trip Date']) <= new Date(toDate))) {
        trips.push(trip);
      }
    });
     res.json(trips);
  } catch (error) {
    console.error('Error fetching filtered trips:', error);
    res.status(500).json({ message: 'Error fetching filtered trips', error: error.message });
  }
});
// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON bodies

app.post('/api/uploadCSV', upload.single('file'), (req, res) => {
  const csvFilePath = req.file.path;
  const results = [];

  fs.createReadStream(csvFilePath)
    .pipe(csvParser())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      // After parsing CSV file
      processTrips(results)
        .then((processedInfo) => {
          res.status(200).json({
            message: 'CSV processed successfully',
            processedInfo // Details like number of trips added, skipped, etc.
          });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    });
});

async function processTrips(trips) {
  for (let trip of trips) {
    const tripExists = await checkIfTripExists(trip['Trip Number']);
    if (!tripExists) {
      await addTripToFirebase(trip);
    } else {
      console.log(`Trip ${trip['Trip Number']} already exists`);
      // Optionally send this info to frontend
    }
  }
}

async function checkIfTripExists(tripNumber) {
  const tripRef = db.collection('trips').doc(tripNumber);
  const doc = await tripRef.get();
  return doc.exists;
}


async function addTripToFirebase(trip) {
  const tripsRef = db.collection('trips'); // Assuming 'trips' is your collection in Firebase
  await tripsRef.doc(trip['Trip Number']).set(trip);
}

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
=======
const cors = require('cors');
const driversRouter = require('./api/drivers');
const vehiclesRouter = require('./api/vehicles');
const usersRouter = require('./api/users');
const tripsRouter = require('./api/trips'); 
const express = require('express');
const router = require('./api/router');

const app = express();  

app.use(cors({
  origin: '*' 
}));  
app.use('/api/drivers', driversRouter);
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/users', usersRouter);
app.use('/api/trips', tripsRouter);
app.use((req, res, next) => {
  console.log('Middleware function called!');
  next();
  console.error();
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
>>>>>>> 01ace838e3c8010f6af0c4340a00030075a06f47
