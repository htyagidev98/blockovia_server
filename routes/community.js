const multer = require('multer')
const path = require('path');
const { communityAdd, communityGet,communityUpdate } = require('../controller/community')
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

router.post('/community/add', upload.single('image'), communityAdd)
router.get('/community/get', communityGet)
router.put('/community/update', upload.single('image'), communityUpdate)

module.exports = router;