<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const multer = require('multer');
const admin = require('firebase-admin');
const parse = require('csv-parse');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

// POST endpoint to import trips
router.post('/import', upload.single('file'), (req, res) => {
  const file = req.file;

  // Read and parse the CSV file
  const parser = fs
    .createReadStream(file.path)
    .pipe(
      parse({
        columns: true,
        delimiter: ',', // Update delimiter if different
      })
    );

  const trips = [];

  parser.on('data', (row) => {
    trips.push(row);
  });

  parser.on('end', () => {
    // Insert each trip into Firebase
    const tripsRef = admin.database().ref('trips');

    trips.forEach((trip) => {
      const newTripRef = tripsRef.push();
      newTripRef.set(trip);
    });

    // Delete the file after processing
    fs.unlinkSync(file.path);

    res.status(200).send('Trips imported successfully');
  });

  parser.on('error', (error) => {
    console.error(error);
    res.status(500).send('Failed to import trips');
  });
});

router.get('/trips', async (req, res) => {
    try {
        const filter = req.query;
        const tripsRef = admin.database().ref('trips');
        let query = tripsRef;

        // Apply filters
        if (filter.fromDate) {
            query = query.orderByChild('date').startAt(filter.fromDate);
        }
        if (filter.toDate) {
            query = query.endAt(filter.toDate);
        }
        // Add more filters as needed

        // Fetch and return data
        const snapshot = await query.once('value');
        const trips = snapshot.val();
        res.status(200).json(trips);
    } catch (error) {
        console.error('Error fetching filtered trips:', error);
        res.status(500).send('Failed to fetch trips');
    }
});

module.exports = router;
=======
const express = require('express');
const router = express.Router();
const { admin } = require('./firebaseAdmin.js');

// Create a new trip
router.post('/', (req, res) => {
  const newTripRef = admin.database().ref('trips').push();
  newTripRef.set(req.body, (error) => {
    if (error) {
      res.status(500).send('Data could not be saved.' + error);
    } else {
      res.status(200).send('Trip saved successfully.');
    }
  });
});

// Get all trips
router.get('/', (req, res) => {
  const tripsRef = admin.database().ref('trips');
  tripsRef.once('value', (snapshot) => {
    res.json(snapshot.val());
  });
});

// Get a trip by id
router.get('/:id', (req, res) => {
  const tripRef = admin.database().ref(`trips/${req.params.id}`);
  tripRef.once('value', (snapshot) => {
    res.json(snapshot.val());
  });
});

// Update a trip
router.put('/:id', (req, res) => {
  const tripRef = admin.database().ref(`trips/${req.params.id}`);
  tripRef.update(req.body, (error) => {
    if (error) {
      res.status(500).send('Trip could not be updated.' + error);
    } else {
      res.status(200).send('Trip updated successfully.');
    }
  });
});

// Delete a trip
router.delete('/:id', (req, res) => {
  const tripRef = admin.database().ref(`trips/${req.params.id}`);
  tripRef.remove((error) => {
    if (error) {
      res.status(500).send('Could not delete trip.' + error);
    } else {
      res.status(200).send('Trip deleted successfully.');
    }
  });
});

module.exports = router; // make sure to export the router
>>>>>>> 01ace838e3c8010f6af0c4340a00030075a06f47
