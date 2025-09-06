const jwt = require('jsonwebtoken');
require('dotenv').config();


/**
 * confirm validity of token sent with request
 * if valid, attach decoded token to request as req.user
 * @returns 
 */
const authenticateToken = async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        const user = jwt.verify(token, process.env.JWT_SECRET);
        if (!user || !user.id) {
            throw new Error();
        }
        req.user = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({message: "Authentication Failed"});
    }
}

module.exports = {
    authenticateToken
}