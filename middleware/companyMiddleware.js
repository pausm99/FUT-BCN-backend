const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateCompanyToken(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

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
            return res.status(403).json({ message: 'Forbbiden acces' });
        }

        next();
    });
}

module.exports = { authenticateCompanyToken };