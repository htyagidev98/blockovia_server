const { drivingTextAdd, drivingTextGet, drivingTextUpdate } = require('../controller/drivingtext')
const express = require('express')
router = express.Router();


// API Router

router.post('/drivingtext/add', drivingTextAdd)
router.get('/drivingtext/get', drivingTextGet)
router.put('/drivingtext/update', drivingTextUpdate)

module.exports = router;