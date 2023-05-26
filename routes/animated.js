const multer = require('multer')
const path = require('path');
const { animatedAdd, animatedGet, animatedGetById, animatedUpdate } = require('../controller/animated')
const express = require('express')
router = express.Router();

//  Image Upload
const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

//  API Router

router.post('/animated/add', upload.single('image'), animatedAdd)
router.get('/animated/get', animatedGet)
router.get('/animated/get/id', animatedGetById)
router.put('/animated/update', upload.single('image'), animatedUpdate)

module.exports = router;



