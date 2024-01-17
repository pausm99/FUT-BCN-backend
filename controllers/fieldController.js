const { validationResult } = require('express-validator');
const Field = require('../models/field.js');

class FieldController {

    static async getAllFields(req, res) {
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
        try {
            let field = req.body;
            console.log(field);
            const createdField = await Field.createField(field);
            console.log(createdField);
            res.status(200).json(createdField);
            
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }
}

module.exports = FieldController;