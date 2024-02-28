const { validationResult } = require('express-validator');
const Event = require('../models/event.js');
const moment = require('moment-timezone');

class EventController {

    static transformToUTC(date) {
        return new Date(moment.utc(date));
    }

    static getFormattedDates(date) {
        return moment.tz(date, 'Europe/Madrid').format();
    }

    static async getEventById(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;

        try {

            const event = await Event.getEventById(id)

            if (event) {

                Event.date_time_start = EventController.getFormattedDates(Event.date_time_start);
                Event.date_time_start = EventController.getFormattedDates(Event.date_time_start);
    
                res.status(200).json(Event);
                
            } else res.status(404).json({ error: 'Not found' })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

}

module.exports = EventController;
