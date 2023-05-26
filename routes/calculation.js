const { calculationAdd, calculationGet, calculationGetById, calculationContentUpdate } = require("../controller/calculation")
const express = require('express')

router = express.Router();

// API Router

router.post('/calculation/add', calculationAdd)
router.get('/calculation/get', calculationGet)
router.get('/calculation/get/id', calculationGetById)
router.put('/calculation/content/update', calculationContentUpdate)

module.exports = router;