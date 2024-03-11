const express = require('express');
const eventController = require('../controllers/eventsController.js');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/').get(authMiddleware.authenticateToken, eventController.getAllEvents);
router.route('/players').get(authMiddleware.authenticateToken, eventController.getNumberOfPlayersEnrolledToEvent);
router.route('/:id').get(authMiddleware.authenticateToken, eventController.getEventById);

router.route('/').post(authMiddleware.authenticateToken, eventController.createEvent);

router.route('/join/:id').post(authMiddleware.authenticateToken, eventController.joinEvent);


module.exports = router;