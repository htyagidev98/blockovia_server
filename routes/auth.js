const { login, signup } = require("../controller/authController")
const express = require('express')
router = express.Router();

router.post('/login', login);
router.post('/signup', signup)

module.exports = router;