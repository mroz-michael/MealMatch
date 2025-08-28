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
        res.status(401).json({message: msg});
    }
}


//use for log ins
const getUser = async (req, res) => {
    try {
        const userInfo = {username: req.body.username, password: req.body.password};
        const token = await service.loginUser(userInfo);
        res.status(200).json(token);
    } catch (err) {
        code = err.message && err.message == "Invalid credentials" ? 401 : 500;
        if (!err.message) {
            err.message = "Unknown error";
        }
        res.status(code).json({message: err.message});
    }
}

const deleteUser = async (req, res) => {
    //middleware will confirm validity of token and attach username/id to request
    try {
        const userId = req.user.userId;
        await service.deleteUser(userId);
        res.status(204);
    } catch (err) {
        code = err.message && err.message == "Invalid credentials" ? 401 : 500;
        const msg = err.message || "Unknown Error";
        res.status(401).json({message: msg});
    }
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