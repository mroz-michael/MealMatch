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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded || !decoded.id) {
            throw new Error();
        }

        req.user = {id: decoded.id, username: decoded.username}

        next();
    } catch (err) {
        return res.status(401).json({message: "Authentication Failed"});
    }
}

module.exports = {
    authenticateToken
}