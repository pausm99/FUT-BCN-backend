const express = require('express');
const reservationController = require('../controllers/reservationController.js');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/:id').get(authMiddleware.authenticateToken, reservationController.getReservationById);
router.route('/byField/:id').get(authMiddleware.authenticateToken, reservationController.getReservationsByFieldId);
router.route('/byUser/:id').get(authMiddleware.authenticateToken, reservationController.getReservationsByUserId);

router.route('/').post(authMiddleware.authenticateToken, reservationController.createReservation);


router.route('/:id').delete(authMiddleware.authenticateToken, reservationController.deleteReservationById);


module.exports = router;