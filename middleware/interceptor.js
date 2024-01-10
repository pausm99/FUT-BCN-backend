const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../config/db');

function interceptor(req, res, next) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (token) {
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (!err) req.user = user;
            next();
        })
    } else next();
}

module.exports = interceptor;