// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const ConfigController = require('../controllers/ConfigsController')

// Services
const uploadImages = require('../services/imageService')
const { body, check, oneOf } = require('express-validator');
const checkRGB = require('../validators/is-rgb');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/configs/:id', authMiddleware, roleMiddleware, ConfigController.get);
router.delete('/configs/delete/:id', authMiddleware, ConfigController.remove);
router.put('/configs/update',
    oneOf([
        check('theme_color').isHexColor(),
        check('theme_color').custom(value => checkRGB(value))
    ]),
    body('notifications').optional().isBoolean(),
    authMiddleware, uploadImages.uploadMiddleware('image'), ConfigController.update);

// Exports
module.exports = router;