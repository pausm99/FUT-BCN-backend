const express = require('express');
const userController = require('../controllers/userController');
const { registerValidator, loginValidator } = require('../validators/userValidator');
const router = express.Router();

router.post('/register', registerValidator, userController.register);
router.post('/login', loginValidator, userController.login);
router.post('/logout', userController.logout);

router.route('by/Mail/:email').get(userController.getUserByEmail);
router.route('/:id').get(userController.getUserById);

module.exports = router;