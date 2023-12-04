const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

// GET all drivers
router.get('/', async (req, res) => {
    try {
        const driversSnapshot = await admin.database().ref('drivers').once('value');
        const drivers = driversSnapshot.val();
        res.json({ success: true, data: drivers, message: 'Drivers fetched successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Failed to fetch drivers.' });
    }
});

// GET a specific driver by ID
router.get('/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const driverSnapshot = await admin.database().ref(`drivers/${driverId}`).once('value');
        const driver = driverSnapshot.val();
        if (driver) {
            res.json({ success: true, data: driver, message: 'Driver fetched successfully.' });
        } else {
            res.status(404).json({ success: false, data: null, message: 'Driver not found.' });
        }
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Failed to fetch driver.' });
    }
});

// POST a new driver
router.post('/', async (req, res) => {
    try {
        const newDriver = req.body; // Add validation here
        const driverRef = await admin.database().ref('drivers').push(newDriver);
        res.status(201).json({ success: true, data: { id: driverRef.key }, message: 'Driver created successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Failed to create driver.' });
    }
});

// PUT (update) a driver
router.put('/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        const updatedData = req.body; // Add validation here
        await admin.database().ref(`drivers/${driverId}`).update(updatedData);
        res.json({ success: true, data: null, message: 'Driver updated successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Failed to update driver.' });
    }
});

// DELETE a driver
router.delete('/:id', async (req, res) => {
    try {
        const driverId = req.params.id;
        await admin.database().ref(`drivers/${driverId}`).remove();
        res.json({ success: true, data: null, message: 'Driver deleted successfully.' });
    } catch (error) {
        res.status(500).json({ success: false, data: null, message: 'Failed to delete driver.' });
    }
});

module.exports = router;
