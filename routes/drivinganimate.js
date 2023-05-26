const multer = require('multer')
const path = require('path');
const { drivingAnimateAdd, drivingAnimateGet, drivingAnimateGetById, drivingAnimateUpdate } = require('../controller/drivinganimate')
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

router.post('/driving/animate/add', upload.single('image'), drivingAnimateAdd)
router.get('/driving/animate/get', drivingAnimateGet)
router.get('/driving/animate/get/id', drivingAnimateGetById)
router.put('/driving/animate/update', upload.single('image'), drivingAnimateUpdate)

module.exports = router;