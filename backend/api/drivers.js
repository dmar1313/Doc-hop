const express = require('express');
const router = express.Router();
const admin = require('firebase-admin'); 

// GET all drivers
router.get('/', (req, res) => {
  const driversRef = admin.database().ref('drivers');
  driversRef.once('value', (snapshot) => {
    res.json(snapshot.val());
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
    res.status(500).send('The read failed: ' + errorObject.name);
  });
});

// GET driver by ID
router.get('/:id', (req, res) => {
  const driverRef = admin.database().ref(`drivers/${req.params.id}`);
  driverRef.once('value', (snapshot) => {
    if (snapshot.exists()) {
      res.json(snapshot.val());
    } else {
      res.status(404).send('Driver not found');
    }
  }, (errorObject) => {
    console.log('The read failed: ' + errorObject.name);
    res.status(500).send('The read failed: ' + errorObject.name);
  });
});

// POST create new driver
router.post('/', (req, res) => {
  const newDriverRef = admin.database().ref('drivers').push();
  newDriverRef.set(req.body, (error) => {
    if (error) {
      res.status(500).send('Data could not be saved.' + error);
    } else {
      res.status(200).send('Data saved successfully.');
    }
  });
});

// PUT update existing driver
router.put('/:id', (req, res) => {
  const driverRef = admin.database().ref(`drivers/${req.params.id}`);
  driverRef.update(req.body, (error) => {
    if (error) {
      res.status(500).send('Data could not be updated.' + error);
    } else {
      res.status(200).send('Data updated successfully.');
    }
  });
});

// DELETE remove driver
router.delete('/:id', (req, res) => {
  const driverRef = admin.database().ref(`drivers/${req.params.id}`);
  driverRef.remove((error) => {
    if (error) {
      res.status(500).send('Could not delete driver.' + error);
    } else {
      res.status(200).send('Driver deleted successfully.');
    }
  });
});

module.exports = router;