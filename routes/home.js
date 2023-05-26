const multer = require('multer')
const path = require('path');
const { heroContentAdd, heroContentGet, heroContentUpdate } = require('../controller/home')
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

router.post('/hero/content/add', upload.single('image'), heroContentAdd)
router.get('/hero/content/get', heroContentGet)
router.put('/hero/content/update',upload.single('image'), heroContentUpdate)

module.exports = router;