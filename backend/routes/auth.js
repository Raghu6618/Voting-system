const express = require('express');
const { signup, login, seedDemo } = require('../controllers/authController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/seed-demo', seedDemo);

module.exports = router;