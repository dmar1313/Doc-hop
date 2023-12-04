// backend/api/trips.js

const express = require('express');
const multer = require('multer');
const { parseCSV } = require('../utils'); // Adjust the path as needed
const admin = require('firebase-admin'); // Ensure Firebase Admin SDK is set up

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// POST endpoint to import trips
router.post('/import', upload.single('file'), async (req, res) => {
    try {
        const filePath = req.file.path;
        const parsedTrips = await parseCSV(filePath);
        const tripsRef = admin.database().ref('trips');
        parsedTrips.forEach(trip => {
            const newTripRef = tripsRef.push();
            newTripRef.set(trip);
        });
        res.json({ success: true, data: null, message: 'Trips imported successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
