const authMiddleware = require('../middlewares/auth-middleware')
const usersController = require('../controllers/UsersController');

const Router = require('express').Router
const router = new Router();

router.post('/users', authMiddleware, usersController.get);

module.exports = router;