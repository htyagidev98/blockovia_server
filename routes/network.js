const multer = require('multer')
const path = require('path');
const { networkAdd, networkGet, networkUpdate } = require('../controller/network')
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


router.post('/network/add', upload.single('image'), networkAdd)
router.get('/network/get', networkGet)
router.put('/network/update', upload.single('image'), networkUpdate)

module.exports = router;