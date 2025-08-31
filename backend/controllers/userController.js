// call relevant service functions and return response obj/status codes, 
// middleware will handle data validation before it reaches this controller
const service = require('../services/userService');

const createUser = async (req, res) => {
    
    const userInfo = {username: req.body.username, password: req.body.password};
    
    try {
        const user = await service.registerUser(userInfo);
        const returnedUser = {
            username: user.username,
            id: user._id,
            stock: [],
            preferences: []
        }

        res.status(201).json(returnedUser);
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
        const msg = err.message ?? "Unknown Error";
        res.status(404).json({message: msg});
    }
}

const updatePassword = async(req, res) => {
    //middleware confirms token validity
    try {
        const updatedUser = await service.updatePassword(req);
        res.status(201).json(updatedUser);
    } catch (err) {
        code = err.message && err.message == "Invalid Request" ? 400 : 500;
        const msg = err.message ?? "Unknown Error";
        res.status(code).json({message: msg});
    }
}

//endpoint for testing users api
const getAllUsersTest = async(req, res) => {

    try {
        users = await service.getAllUsersTest();

        //remove password hashes from response obj
        safeUsers = users.map(user => {
            return {
                id: user._id,
                username: user.username,
                recipeList: user.recipeList,
                stock: user.stock,
                preferences: user.preferences
            }
        })

        res.status(200).json(safeUsers);
    } catch (err) {
        return err; 
    }
}

module.exports = {
    createUser,
    getUser,
    updatePassword,
    deleteUser,
    getAllUsersTest
}