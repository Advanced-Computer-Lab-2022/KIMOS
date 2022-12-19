const express = require('express');
const router = express.Router();
const { login, signUp, logout, verifyEmail } = require('../controllers/userController');
// const { verifyEmailAuth } = require('../middleware/auth');
router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', signUp);
// router.get('/verifyEmail', verifyEmailAuth, verifyEmail);
module.exports = router;
