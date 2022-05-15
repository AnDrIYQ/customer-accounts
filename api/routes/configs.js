// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const ConfigController = require('../controllers/ConfigsController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/configs/:id', authMiddleware, ConfigController.get);
router.delete('/configs/delete/:id', authMiddleware, ConfigController.remove);
router.put('/configs/update',
    body('theme_color').optional().isRgbColor(),
    body('notifications').optional().isBoolean(),
    authMiddleware, uploadImages.uploadMiddleware('image'), ConfigController.update);

// Exports
module.exports = router;