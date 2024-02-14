const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

function authenticateToken(req, res, next) {
    const token = req.cookies.refreshToken;

    if (!token) {
        return res.status(401).json({ errror: 'Unauthorized' });
    }

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token, forbidden access' });
        }

        req.user = user;
        next();
    });
}

module.exports = { authenticateToken };