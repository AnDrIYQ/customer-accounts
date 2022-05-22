// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const TariffController = require('../controllers/TariffsController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/tariffs', authMiddleware, TariffController.get);
router.get('/tariffs/:from/:limit', authMiddleware, TariffController.get);
router.get('/tariffs/:id', authMiddleware, TariffController.getById);

router.post('/tariffs/add',
    body('name').not().isEmpty(),
    body('price').isNumeric(),
    body('description').optional().isLength({min: 10, max: 500}),
    body('terms').isNumeric(),
    body('fields').isArray(),
    authMiddleware, roleMiddleware, TariffController.post);
router.put('/tariffs/update',
    body('name').not().isEmpty(),
    body('price').optional().isNumeric(),
    body('description').optional().isLength({min: 10, max: 500}),
    body('terms').optional().isNumeric(),
    body('fields').optional().isArray(),
    authMiddleware, roleMiddleware, TariffController.update);
router.delete('/tariffs/remove/:id', authMiddleware, roleMiddleware, TariffController.remove);

// Exports
module.exports = router;