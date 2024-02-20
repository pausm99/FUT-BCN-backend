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

        const expire = user.exp;
        const currentTimestamp = Math.floor(new Date().getTime() / 1000);
        const differenceInSeconds = expire - currentTimestamp;

        const payload = user.userSimple;


        //less than 1 day from token to expire --> create new token
        if (differenceInSeconds/60/60/24 < 1) {

            const token = jwt.sign({ payload }, SECRET_KEY, {
                expiresIn: '7d',
            });

            res.cookie('refreshToken', token, {
                httpOnly: true, 
                maxAge: 604800000,
                path: '/',
                secure: false,
                //secure: true, CHANGE WHEN HTTPS
            });
        }

        req.user = user;
        next();
    });


}

module.exports = { authenticateToken };