const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;
const Field = require('../models/field');

function authenticateCompanyToken(req, res, next) {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ errror: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const token_company_id = user.userSimple.id;
        const req_company_id = req.query.company_id;
        
        if (token_company_id != req_company_id) {
            return res.status(403).json({ message: 'Forbbiden access' });
        }

        next();
    });
}

async function authenticateCompanyTokenWhenDeleteField(req, res, next) {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, async (err, user) => {

        if (err) {
            return res.status(401).json({ error: 'Invalid token' });
        }

        const field_id = req.params.id;
        const token_company_id = user.userSimple.id;
    
        const field = await Field.getFieldById(field_id);

    
        if (!field) {
            return res.status(404).json({ error: 'Field not found' });
        }
    
    
        if (token_company_id !== field.company_id) {
            return res.status(403).json({ error: 'Forbidden access'})
        }
    
        next();
    });

}


module.exports = { authenticateCompanyToken, authenticateCompanyTokenWhenDeleteField };