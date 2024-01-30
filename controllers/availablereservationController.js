const { validationResult } = require('express-validator');
const AvailableReservation = require('../models/availablereservation.js');

class AvailableReservationController {

    static async createAvailableReservation(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let availablereservation = req.body;

            availableRes.date_time_start = availableRes.date_time_start.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
            availableRes.date_time_end = availableRes.date_time_end.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

            const availablereservationId = await AvailableReservation.createAvailableReservation(availablereservation);
            const createdAvailableReservation = {id: availablereservationId, ...availablereservation};
            res.status(200).json(createdAvailableReservation);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async deleteAvailableReservationById(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;

        try {

            await AvailableReservation.deleteAvailableReservationById(id);
            res.status(200).json( {message: "AvailableReservation deleted successfully"} );

        } catch (error) {
            console.log(error);
            res.status(500).json({  error: "Can't delete availablereservation" });
        }

    }

    static async getAvailableReservationsByFieldId(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const fieldId = req.params.id;

        try {
            const availablereservations = await AvailableReservation.getAvailableReservationsByFieldId(fieldId);
            
            availablereservations.map(availableRes => {
                availableRes.date_time_start = availableRes.date_time_start.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
                availableRes.date_time_end = availableRes.date_time_end.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
            });

            res.status(200).json([availablereservations]);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }
}

module.exports = AvailableReservationController;