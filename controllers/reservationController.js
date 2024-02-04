const { validationResult } = require('express-validator');
const Reservation = require('../models/reservation.js');
const moment = require('moment-timezone');


class ReservationController {

    static transformToUTC(date) {
        return new Date(moment.utc(date));
    }

    static getFormattedDates(date) {
        return moment.tz(date, 'Europe/Madrid').format();
    }


    static async createReservation(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let reservation = req.body;

            reservation.date_time_start = ReservationController.transformToUTC(reservation.date_time_start);
            reservation.date_time_end = ReservationController.transformToUTC(reservation.date_time_end);

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

            reservation.date_time_start = ReservationController.getFormattedDates(reservation.date_time_start);
            reservation.date_time_end = ReservationController.getFormattedDates(reservation.date_time_end);

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
                reservation.date_time_start = ReservationController.getFormattedDates(reservation.date_time_start);
                reservation.date_time_end = ReservationController.getFormattedDates(reservation.date_time_end);
            });

            res.status(200).json(reservations);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }
}

module.exports = ReservationController;