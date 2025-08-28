const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async ({userInfo}) => {
    if (! (userInfo.username)) {
        return {message: "Missing Username"};
    }
    if (! (userInfo.password)) {
        return {message: "Missing Password"};
    }

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

module.exports = {registerUser}