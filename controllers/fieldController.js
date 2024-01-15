const { validationResult } = require('express-validator');
const Field = require('../models/field.js');

class FieldController {

    static async getAllFields(req, res) {
        try {
            const fields = await Field.getAllFields();
            res.status(200).json(fields);
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }

    static async getFieldByEmail(req, res) {
        //Input validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.params.email;

        try {
            const field = await Field.getFieldByEmail(email);
            if (field) {
                return res.json({ isDuplicated: true });
              } else {
                return res.json({ isDuplicated: false });
              }
        } catch (error) {
            console.log(error);
            res.status(500).json({  error: 'Server Error' });
        }
    }
}

module.exports = FieldController;