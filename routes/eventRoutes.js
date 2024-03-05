const express = require('express');
const eventController = require('../controllers/eventsController.js');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.route('/:id').get(authMiddleware.authenticateToken, eventController.getEventById);
router.route('/').post(authMiddleware.authenticateToken, eventController.createEvent)


module.exports = router;