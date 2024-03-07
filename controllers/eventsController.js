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

    static async createEvent(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let event = req.body;

            event.date_time_start = EventController.transformToUTC(event.date_time_start);
            event.date_time_end = EventController.transformToUTC(event.date_time_end);

            const eventId = await Event.createEvent(event);
            const createdEvent = {id: eventId, ...event};
            res.status(200).json(createdEvent);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
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

                event.date_time_start = EventController.getFormattedDates(Event.date_time_start);
                event.date_time_start = EventController.getFormattedDates(Event.date_time_start);
    
                res.status(200).json(event);
                
            } else res.status(404).json({ error: 'Not found' })
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async getAllEvents(req, res) {
        const today = new Date();

        const todayString = EventController.transformToUTC(today);

        try {
            const events = await Event.getEventsByTimeRange(todayString);

            res.status(200).json(events);

        } catch (error) {
            console.log(error)
            res.status(500).json({ error: 'Server Error' });
        }
        
    }

}

module.exports = EventController;
