const authController = require('../controllers/AuthController');

const express = require('express');
const router = express.Router();

router.get('/login', authController.login);
router.get('/register', authController.register);
router.get('/logout', authController.logout);
router.get('/refresh-token', authController.refresh);

module.exports = router;
