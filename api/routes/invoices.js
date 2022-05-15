// Middlewares
const authMiddleware = require('../middlewares/auth-middleware')
const roleMiddleware = require('../middlewares/role-middleware')

// Controllers
const InvoiceController = require('../controllers/InvoicesController')

// Services
const uploadImages = require('../services/imageService')
const { body } = require('express-validator');

// Router
const Router = require('express').Router
const router = new Router();

// Actions
router.get('/invoices', authMiddleware, roleMiddleware, InvoiceController.get);
router.get('/invoices/:id', authMiddleware, InvoiceController.getById);

router.post('/invoices/add/:customer',
    body('description').isLength({min: 6, max: 32}),
    body('items').isJSON(),
    authMiddleware, roleMiddleware, InvoiceController.post);
router.put('/invoices/paid/:id', authMiddleware, roleMiddleware, InvoiceController.makePaid);
router.put('/invoices/was-read/:id', authMiddleware, InvoiceController.read);
router.delete('/invoices/delete/:id', authMiddleware, roleMiddleware, InvoiceController.remove);

// Exports
module.exports = router;