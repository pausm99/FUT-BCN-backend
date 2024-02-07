const { validationResult } = require('express-validator');
const AvailableReservation = require('../models/availablereservation.js');
const moment = require('moment-timezone');

class AvailableReservationController {

    static transformToUTC(date) {
        return new Date(moment.utc(date));
    }

    static getFormattedDates(date) {
        return moment.tz(date, 'Europe/Madrid').format();
    }

    static async createAvailableReservation(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let availableRes = req.body;

            availableRes.date_time_start = AvailableReservationController.transformToUTC(availableRes.date_time_start);
            availableRes.date_time_end = AvailableReservationController.transformToUTC(availableRes.date_time_end);

            const availablereservationId = await AvailableReservation.createAvailableReservation(availableRes);
            const createdAvailableReservation = {id: availablereservationId, ...availableRes};
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
                availableRes.date_time_start = AvailableReservationController.getFormattedDates(availableRes.date_time_start);
                availableRes.date_time_end = AvailableReservationController.getFormattedDates(availableRes.date_time_end);
            });

            res.status(200).json(availablereservations);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async getAllTypeReservationsByFieldId(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const fieldId = req.params.id;

        const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
        const queryParams = parsedUrl.searchParams;

        let start = queryParams.get('start');
        let end = queryParams.get('end');

        try {
            const allReservations = await AvailableReservation.getAllTypeByFieldIdAndRange(fieldId, start, end);

            allReservations.map(res => {
                res.date_time_start = AvailableReservationController.getFormattedDates(res.date_time_start);
                res.date_time_end = AvailableReservationController.getFormattedDates(res.date_time_end);
            });

            res.status(200).json(allReservations);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async createBulkAvailableReservations(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let bulkRes = req.body;

            let createdAvailableReservations = [];

            bulkRes.forEach(async availableRes => {
                availableRes.date_time_start = AvailableReservationController.transformToUTC(availableRes.date_time_start);
                availableRes.date_time_end = AvailableReservationController.transformToUTC(availableRes.date_time_end);
                const availablereservationId = await AvailableReservation.createAvailableReservation(availableRes);
                const createdAvailableReservation = {id: availablereservationId, ...availableRes};
                createdAvailableReservations.push(createdAvailableReservation);
            });


            res.status(200).json(createdAvailableReservations);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async deleteAvailableReservation(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {

            const id = req.params.id;

            await AvailableReservation.deleteAvailableReservationById(id);

            res.status(200).json({ message: 'Available reservation deleted' });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async changeAvailableReservationState(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {

            const id = req.params.id;
            let state = req.body.state;

            if (state) {
                setTimeout(async () => {
                    await AvailableReservation.changeAvailableReservationState(id, false);
                }, 300000);
            }

            await AvailableReservation.changeAvailableReservationState(id, state);

            res.status(200).json({ message: 'Changed available reservation state' });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }
}

module.exports = AvailableReservationController;