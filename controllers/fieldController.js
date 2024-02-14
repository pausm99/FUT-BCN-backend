const { validationResult } = require('express-validator');
const Field = require('../models/field.js');
const moment = require('moment-timezone');


class FieldController {

    static getFormattedDates(date) {
        return moment.tz(`2024-01-30 ${date}`, 'Europe/Madrid').format('HH:mm:ss');
    }

    static transformToUTC(date) {
        try {
            const utcString = `2024-01-30 ${date}`;
            const utcMoment = moment.utc(utcString, 'YYYY-MM-DD HH:mm:ss');
            return new Date(utcMoment.format());
        } catch (error) {
            console.error('Error transforming to UTC:', error);
            return null;
        }
    }
    

    static async getAllFields(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let fields = await Field.getAllFields();
            fields.forEach(field => {
                field.public = field.public === 1 ? true : false;
                
                field.opening_time = FieldController.getFormattedDates(field.opening_time);
                field.closing_time = FieldController.getFormattedDates(field.closing_time);
            });
            res.status(200).json(fields);
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async createField(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let field = req.body;

            field.opening_time = FieldController.transformToUTC(field.opening_time);
            field.closing_time = FieldController.transformToUTC(field.closing_time);

            const fieldId = await Field.createField(field);
            const createdField = {id: fieldId, ...field};
            res.status(200).json(createdField);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async getCompanyFields(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const company_id = req.query.company_id;

        try {
            const fields = await Field.getCompanyFields(company_id);

            fields.map(field => {
                field.opening_time = FieldController.getFormattedDates(field.opening_time);
                field.closing_time = FieldController.getFormattedDates(field.closing_time);
            });

            res.status(200).json(fields);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async getFieldById(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;

        try {
            const field = await Field.getFieldById(id);

            field.opening_time = FieldController.getFormattedDates(field.opening_time);
            field.closing_time = FieldController.getFormattedDates(field.closing_time);

            res.status(200).json(field);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async deleteFieldById(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const id = req.params.id;

        try {

            await Field.deleteFieldById(id);
            res.status(200).json( {message: "Field deleted successfully"} );

        } catch (error) {
            console.log(error);
            res.status(500).json({  error: "Can't delete field" });
        }

    }
}

module.exports = FieldController;