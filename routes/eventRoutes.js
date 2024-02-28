const express = require('express');
const eventController = require('../controllers/eventsController.js');
const router = express.Router();


router.route('/:id').get(eventController.getEventById)


module.exports = router;