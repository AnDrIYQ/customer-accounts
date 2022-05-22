// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const ImageController = require('../controllers/ImagesController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/images', authMiddleware, ImageController.get);

// Exports
module.exports = router;