const express = require('express');
const availablereservationController = require('../controllers/availablereservationController.js');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/byField/:id').get(authMiddleware.authenticateToken, availablereservationController.getAvailableReservationsByFieldId);

module.exports = router;