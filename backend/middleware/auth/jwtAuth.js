const jwt = require('jsonwebtoken');
require('dotenv').config();

const extractToken = async (req) => {
    const header = req.get('authorization');
    if (header && header.startsWith('Bearer ')) {
        return header.replace('Bearer ', '');
    }

    return null;
}

/**
 * confirm validity of token sent with request
 * if valid, attach decoded token to request as req.user
 * @returns 
 */
const authenticateToken = (req, res, next) => {
    const token = extractToken(req);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.userId) {
            throw new Error();
        }
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({message: "Invalid token"});
    }
}

module.exports = {
    authenticateToken
}