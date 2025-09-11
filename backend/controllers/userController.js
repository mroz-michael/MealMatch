// call relevant service functions and return response obj/status codes, 
// middleware will handle data validation before it reaches this controller
const userService = require('../services/userService');
const stockService = require('../services/stockService');

require('dotenv').config();

const createUser = async (req, res) => {
    
    const userInfo = {username: req.body.username, password: req.body.password};
    
    try {
        const user = await userService.registerUser(userInfo);
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


const getCurrentUser = async (req, res) => {

    try {
//if token is valid, user will be attached to req by middleware
        if (req.user) {
            const returnedUser = {
                username: req.user.username,
                id: req.user.id,
                recipeList: req.user.recipeList,
                stock: req.user.stock,
                preferences: req.user.preferences
            }

            res.status(200).json(returnedUser);
        } else {
            throw new Error("Login not found");
        }
    } catch (err) {
        res.status(401).json({message: err.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const userInfo = {username: req.body.username, password: req.body.password};
        const token = await userService.loginUser(userInfo);
        //attach token to cookie
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV = "Lax",
            maxAge: 1000 * 24 * 7 * 60 * 60, //1 week
            path: "/"
        });

        res.status(200).json({message: "Login Successful"});
        
    } catch (err) {
        code = err.message && err.message == "Invalid credentials" ? 401 : 500;
        if (!err.message) {
            err.message = "Unknown error";
        }
        res.status(code).json({message: err.message});
    }
}

const logoutUser = async (req, res) => {

    try {
        //use same settings as cookie in login controller
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV = "Lax",
            maxAge: 1000 * 24 * 7 * 60 * 60, //1 week
            path: "/"
        });
        
        res.status(204).send();
    } catch (err) {
        res.status(400).json({message: err.message});
    }

}

const deleteUser = async (req, res) => {
    //middleware will confirm validity of token and attach username/id to request
    
    try {
        await userService.deleteUser(req);

        //use same settings as cookie in login controller
        res.clearCookie("jwt", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "strict" : "None",
        });

        res.status(204).send();
    } catch (err) {
        const msg = err.message ?? "Unknown Error";
        res.status(404).json({message: msg});
    }
}

const updatePassword = async(req, res) => {
    //middleware confirms token validity
    try {
        const updatedUser = await userService.updatePassword(req);
        const returnedUser = Object.assign({}, updatedUser);
        delete returnedUser.pwHash;
        res.status(200).json(returnedUser);
    } catch (err) {
        code = err.message && err.message == "Invalid Request" ? 400 : 401;
        const msg = err.message ?? "Unknown Error";
        res.status(code).json({message: msg});
    }
}

//for updating username, recipe list, or ingredient stock
const updateUser = async (req, res) => {
    try {
        const updatedUser = await userService.updateUser(req);
        const returnedUser = Object.assign({}, updatedUser);
        delete returnedUser.pwHash;
        res.status(200).json(returnedUser);
    } catch (err) {
        code = err.message && err.message == "Invalid Request" ? 401 : 500;
        const msg = err.message ?? "Unknown Error";
        res.status(code).json({message: msg});
    }
}

//endpoint for testing users api
const getAllUsersTest = async(req, res) => {

    try {
        users = await userService.getAllUsersTest();

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
    getCurrentUser,
    loginUser,
    logoutUser,
    updatePassword,
    updateUser,
    deleteUser,
    getAllUsersTest
}