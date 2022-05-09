const usersController = require('../controllers/UsersController');
const Router = require('express').Router
const router = new Router();

router.post('/users', usersController.get);

module.exports = router;