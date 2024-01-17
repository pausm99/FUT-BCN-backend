const express = require('express');
const fieldController = require('../controllers/fieldController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
    .get(authMiddleware.authenticateToken, fieldController.getAllFields)
    .post(authMiddleware.authenticateToken, fieldController.createField);

module.exports = router;