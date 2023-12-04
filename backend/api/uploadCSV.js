const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
  // Use the req.file.path to process the uploaded CSV
  res.json({ success: true }); 
});

module.exports = router;