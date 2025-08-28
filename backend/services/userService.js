const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Create a new User in the database
 * @param {{username: string, password: string }} userInfo - Object containing name and unhashed pw
 * @returns newly created user object
 */
const registerUser = async ({userInfo}) => {
    try {
        const pwHash = await bcrypt.hash(userInfo.password, 10);
        const newUser = await User.create({
            username: userInfo.username,
            pwHash,
            stock: [],
            preferences: []
        })
    } catch (err) {
        throw err;
    }

    return newUser;
}

/**
 * Logs in a valid user
 * @param {{username: string, password: string }} userInfo - Object containing name and unhashed pw
 * @returns auth token
 */
const loginUser = async({userInfo}) => {

    try {
        const user = await User.findOne({username: userInfo.username});
        const samePw = await bcrypt.compare(userInfo.password, user.pwHash);
        if (!samePw) {
            throw new Error("Invalid credentials")
        }

        const token = jwt.sign(
            {userId: user._id, username: user.username}, 
            process.env.JWT_SECRET, 
            {expiresIn: process.env.JWT_EXPIRES_IN}
        );

        return token;

    } catch (err) {
        if (err.message == "Invalid credentials") {
            throw err;
        }
        
        throw new Error("Unknown Error");
    }
}

const deleteUser = async(userId) => {
    try {
        await User.findByIdAndDelete(userId);
        return;
    } catch (err) {
        throw err;
    }
}

module.exports = {
    registerUser,
    loginUser,
}