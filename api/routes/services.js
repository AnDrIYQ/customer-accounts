// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const ServiceController = require('../controllers/ServicesController')

// Services
const uploadImages = require('../services/imageService')
const { body, check} = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/services', authMiddleware, ServiceController.get);
router.get('/services/:from/:limit', authMiddleware, ServiceController.get);
router.get('/services/:id', authMiddleware, ServiceController.getById);

router.get('/services-all', authMiddleware, roleMiddleware, ServiceController.getForAdmin);
router.get('/services-all/:from/:limit', authMiddleware, roleMiddleware, ServiceController.getForAdmin);
router.get('/services-get/:id', authMiddleware, roleMiddleware, ServiceController.getForAdminById);

router.post('/services/add',
    body('name').not().isEmpty(),
    check('date_to').isISO8601(),
    body('description').optional().isLength({min: 4, max: 32}),
    check('date').optional().isISO8601(),
    body('tariff').isString(),
    authMiddleware, ServiceController.post);
router.delete('/services/remove/:id', authMiddleware, ServiceController.remove);

// Exports
module.exports = router;