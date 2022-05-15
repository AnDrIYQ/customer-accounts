// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const ServiceController = require('../controllers/ServicesController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/services/:customer', authMiddleware, ServiceController.get);
router.get('/services/:customer/:id', authMiddleware, ServiceController.getById);

router.get('/services', authMiddleware, roleMiddleware, ServiceController.getForAdmin);
router.get('/services/get/:id', authMiddleware, roleMiddleware, ServiceController.getForAdminById);

router.post('/services/add',
    body('name').not().isEmpty(),
    body('date_to').isDate(),
    authMiddleware, ServiceController.post);
router.delete('/services/remove/:id', authMiddleware, ServiceController.remove);

// Exports
module.exports = router;