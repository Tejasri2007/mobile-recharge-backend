const express = require('express');
const { register, login } = require('../controllers/authController');

const router = express.Router();

// POST /api/auth/register - Register user
router.post('/register', register);

// POST /api/auth/login - Login user
router.post('/login', login);

module.exports = router;