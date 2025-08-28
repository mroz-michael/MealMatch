const jwt = require('jsonwebtoken');
require('dotenv').config();

const extractToken = async (req) => {
    const header = req.get('authorization');
    if (header && header.startsWith('Bearer ')) {
        return header.replace('Bearer ', '');
    }

    return null;
}

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

const generateToken = async (payload) => {

}

const refreshToken = async (oldToken) => {

}

module.exports = {
    authenticateToken,
    generateToken,
    refreshToken
}