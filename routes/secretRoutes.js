const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(authMiddleware.authenticateToken, userController.secret);


module.exports = router;