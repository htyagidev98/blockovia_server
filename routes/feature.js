const { featureContentAdd, featureContentGet, featureContentUpdate } = require("../controller/feature")
const express = require('express')
const multer = require('multer')
const path = require('path');
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

router.post('/feature/content/add', upload.single('image'), featureContentAdd)
router.get('/feature/content/get', featureContentGet)
router.put('/feature/content/update', upload.single('image'), featureContentUpdate)

module.exports = router;