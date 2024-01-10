const express = require('express');
const userController = require('../controllers/userController');
const { registerValidator, loginValidator } = require('../validators/userValidator');
const interceptor = require('../middleware/interceptor');
const router = express.Router();

router.post('/register', registerValidator, userController.register);
router.post('/login', loginValidator, userController.login);

router.route('/:email').get(userController.getUserByEmail)

module.exports = router;