const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (req, res) => {
   // req.file.path can be used here to process the uploaded CSV
   res.json({ success: true }); 
});
module.exports = router;