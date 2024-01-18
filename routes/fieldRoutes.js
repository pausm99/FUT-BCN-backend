const express = require('express');
const fieldController = require('../controllers/fieldController');
const authMiddleware = require('../middleware/authMiddleware');
const companyMiddleware = require('../middleware/companyMiddleware');

const router = express.Router();

router.route('/')
    .get(authMiddleware.authenticateToken, fieldController.getAllFields)
    .post(authMiddleware.authenticateToken, fieldController.createField);

router.route('/:company_id').get(authMiddleware.authenticateToken, companyMiddleware.authenticateCompanyToken, fieldController.getCompanyFields);

module.exports = router;