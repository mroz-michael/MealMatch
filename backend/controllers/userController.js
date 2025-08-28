// call relevant service functions and return response obj/status codes, 
// middleware will handle data validation before it reaches this controller
const service = require('../services/userService');

const createUser = async (req, res) => {
    
    const userInfo = {username: req.body.username, password: req.body.password};
    
    try {
        const user = await service.registerUser(userInfo);
        res.status(201).json(user);
        } catch (err) {
            const msg = err.message ? err.message : "Error creating user";
            res.status(400).json({message: msg});
        }
}


//use for log ins
const getUser = async (req, res) => {
    //todo  unhash pw, get user from db, handle errors
    console.log("will get the user")
}

const deleteUser = async (req, res) => {
    //todo: del user, handle errors
    console.log("will delete user when called");
}

const updateUser = async(req, res) => {
    console.log("will update user when called");
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}