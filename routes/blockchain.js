const multer = require('multer')
const path = require('path');
const { blockchainAdd, blockchainGet, blockchainContentUpdate } = require('../controller/blockchain')
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

router.post('/blockchain/add', upload.single('image'), blockchainAdd)
router.get('/blockchain/get', blockchainGet)
router.put('/blockchain/content/update', upload.single('image'), blockchainContentUpdate)

module.exports = router;