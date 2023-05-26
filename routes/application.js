const { applicationAdd ,applicationGet,applicationUpdate} = require('../controller/application')
const express = require('express')
router = express.Router();


// API Router

router.post('/application/add', applicationAdd)
router.get('/application/get', applicationGet)
router.put('/application/update', applicationUpdate)

module.exports = router;