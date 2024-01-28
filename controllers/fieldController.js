const { validationResult } = require('express-validator');
const Field = require('../models/field.js');

class FieldController {

    static async getAllFields(req, res) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            let fields = await Field.getAllFields();
            fields.forEach(field => {
                field.public = field.public === 1 ? true : false;
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
            res.status(200).json(field);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }
}

module.exports = FieldController;