const express = require('express');
const availablereservationController = require('../controllers/availablereservationController.js');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/byField/:id').get(authMiddleware.authenticateToken, availablereservationController.getAvailableReservationsByFieldId);
router.route('/occupied/:id').get(authMiddleware.authenticateToken, availablereservationController.getAllTypeReservationsByFieldId);

router.route('/').post(authMiddleware.authenticateToken, availablereservationController.createAvailableReservation);
router.route('/bulk').post(authMiddleware.authenticateToken, availablereservationController.createBulkAvailableReservations);

router.route('/:id').delete(authMiddleware.authenticateToken, availablereservationController.deleteAvailableReservation);

router.route('/state/:id').patch(authMiddleware.authenticateToken, availablereservationController.changeAvailableReservationState);


module.exports = router;