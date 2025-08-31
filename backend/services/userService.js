const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const validation = require('../middleware/validation/userValidation');
require('dotenv').config();

/**
 * Create a new User in the database
 * @param {{username: string, password: string }} userInfo - Object containing name and unhashed pw
 * @returns newly created user object
 */
const registerUser = async (userInfo) => {
    try {
        const pwHash = await bcrypt.hash(userInfo.password, 10);
        const newUser = await User.create({
            username: userInfo.username,
            pwHash,
            stock: [],
            preferences: []
        })
        
        return newUser;
    } catch (err) {
        throw err;
    }
}

/**
 * Logs in a valid user
 * @param {{username: string, password: string }} userInfo - Object containing name and unhashed pw
 * @returns auth token
 */
const loginUser = async(userInfo) => {

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

/**
 * 
 * @param {*} req- the put request body with decoded token attached as req.user
 * currently only updates password. in future username and other things could be updated, just need to add checks
 * or split into different functions
 */
const updatePassword = async(req) => {
    try {
        const id = req.user.userId;
        const user = await User.findById(id);
        const sameUsername = req.body.username == user.username;
        const samePw = await bcrypt.compare(req.body.password, user.pwHash);
        if (! (samePw && sameUsername) ) {
            throw new Error("Invalid Request")
        }
        
        //validate new password
        if (!validation.validatePassword(req.body.newPassword)) {
            throw new Error("Invalid Request");
        }

        const newPwHash = await bcrypt.hash(req.body.newPassword, 10);
        const updatedInfo = {...user, pwHash: newPwHash};

        const updatedUser = await User.findByIdAndUpdate(id, updatedInfo, {new: true});

        return updatedUser; 
    } catch (err) {
        throw new Error(err.message);
    }
}

//get all for testing purposes
const getAllUsersTest = async () => {
    let users = await User.find({});
    return users;
}

module.exports = {
    registerUser,
    loginUser,
    deleteUser,
    updatePassword,
    getAllUsersTest
}