const { validationResult } = require('express-validator');
const Reservation = require('../models/reservation.js');

class ReservationController {

    // static async getAllReservations(req, res) {

    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }

    //     try {
    //         let reservations = await Reservation.getAllReservations();
    //         reservations.forEach(reservation => {
    //             reservation.public = reservation.public === 1 ? true : false;
    //           });
    //         res.status(200).json(reservations);
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({  error: 'Server Error' });
    //     }
    // }

    static async createReservation(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let reservation = req.body;
            const reservationId = await Reservation.createReservation(reservation);
            const createdReservation = {id: reservationId, ...reservation};
            res.status(200).json(createdReservation);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    // static async getCompanyReservations(req, res) {

    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }

    //     const company_id = req.query.company_id;

    //     try {
    //         const reservations = await Reservation.getCompanyReservations(company_id);
    //         res.status(200).json(reservations);
            
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).json({  error: 'Server Error' });
    //     }
    // }

    static async getReservationById(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;

        try {
            const reservation = await Reservation.getReservationById(id);
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
}

module.exports = ReservationController;