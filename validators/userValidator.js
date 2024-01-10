const { body } = require('express-validator');

exports.registerValidator = [
    body('email')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

exports.loginValidator = [
    body('email')
        .isEmail().withMessage('Invalid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 }).withMessage('Invalid password')
];