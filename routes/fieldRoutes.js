const express = require('express');
const fieldController = require('../controllers/fieldController');
const authMiddleware = require('../middleware/authMiddleware');
const companyMiddleware = require('../middleware/companyMiddleware');

const router = express.Router();

router.route('/')
    .get(authMiddleware.authenticateToken, fieldController.getAllFields)
    .post(authMiddleware.authenticateToken, fieldController.createField);

router.route('/byCompany').get(authMiddleware.authenticateToken, companyMiddleware.authenticateCompanyToken, fieldController.getCompanyFields);

router.route('/:id').get(authMiddleware.authenticateToken, fieldController.getFieldById);

module.exports = router;