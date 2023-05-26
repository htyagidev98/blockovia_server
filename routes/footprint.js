const multer = require('multer')
const path = require('path');
const { footprintAdd, footprintGet, footprintUpdate } = require('../controller/footprint')
const express = require('express')
router = express.Router();

// Image Upload 

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// API Router

router.post('/footprint/add', upload.single('image'), footprintAdd)
router.get('/footprint/get', footprintGet)
router.put('/footprint/update', upload.single('image'), footprintUpdate)

module.exports = router;