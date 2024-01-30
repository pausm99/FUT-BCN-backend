const { validationResult } = require('express-validator');
const Reservation = require('../models/reservation.js');

class ReservationController {


    static async createReservation(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let reservation = req.body;

            reservation.date_time_start = reservation.date_time_start.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
            reservation.date_time_end = reservation.date_time_end.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

            const reservationId = await Reservation.createReservation(reservation);
            const createdReservation = {id: reservationId, ...reservation};
            res.status(200).json(createdReservation);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }


    static async getReservationById(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;

        try {
            const reservation = await Reservation.getReservationById(id);

            reservation.date_time_start = reservation.date_time_start.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
            reservation.date_time_end = reservation.date_time_end.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });

            res.status(200).json(reservation);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async deleteReservationById(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;

        try {

            await Reservation.deleteReservationById(id);
            res.status(200).json( {message: "Reservation deleted successfully"} );

        } catch (error) {
            console.log(error);
            res.status(500).json({  error: "Can't delete reservation" });
        }

    }

    static async getReservationsByFieldId(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const fieldId = req.params.id;

        try {
            const reservations = await Reservation.getReservationsByFieldId(fieldId);

            reservations.map(reservation => {
                reservation.date_time_start = reservation.date_time_start.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
                reservation.date_time_end = reservation.date_time_end.toLocaleString('es-ES', { timeZone: 'Europe/Madrid' });
            });

            res.status(200).json([reservations]);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }
}

module.exports = ReservationController;