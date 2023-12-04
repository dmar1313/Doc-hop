const express = require('express');
const multer = require('multer');
const csvParser = require('csv-parser');
const fs = require('fs'); // Import the File System module
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/import', upload.single('file'), (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
          // Here, 'results' contains the parsed CSV data
          // Add this data to your database
          // ...

          // After processing, optionally delete the file if not needed
          fs.unlink(req.file.path, (err) => {
              if (err) console.error('Error deleting file:', err);
          });

          res.json({ message: 'File processed and data added to database' });
      });
});

module.exports = router;
