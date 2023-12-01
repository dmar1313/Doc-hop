const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// GET all users
router.get('/', (req, res) => {
  const usersRef = admin.database().ref('users');
  usersRef.once('value', (snapshot) => {
    res.json(snapshot.val());
  });
});

// GET user by ID
router.get('/:id', (req, res) => {
  const userRef = admin.database(`users/${req.params.id}`);
  userRef.once('value', (snapshot) => {
    res.json(snapshot.val());
  });
});

// POST create new user
router.post('/', (req, res) => {
  const newUserRef = admin.database('users').push();
  newUserRef.set(req.body, (error) => {
    if (error) {
      res.status(500).send('Data could not be saved.' + error);
    } else {
      res.status(200).send('Data saved successfully.');
    }
  });
});

// PUT update existing user
router.put('/:id', (req, res) => {
  const userRef = admin.database(`users/${req.params.id}`);
  userRef.update(req.body, (error) => {
    if (error) {
      res.status(500).send('Data could not be updated.' + error);
    } else {
      res.status(200).send('Data updated successfully.');
    }
  });
});

// DELETE remove user
router.delete('/:id', (req, res) => {
  const userRef = admin.database(`users/${req.params.id}`);
  userRef.remove((error) => {
    if (error) {
      res.status(500).send('Could not delete user.' + error);
    } else {
      res.status(200).send('User deleted successfully.');
    }
  });
});

module.exports = router;
