const service = require('../services/ingredientService');


// middleware will handle data validation before it reaches this controller
// middleware validates jwt token and attaches user as req.user

const createIngredient = async (req, res) => {

    try {
        const ingredient = await service.create(req);
        res.status(204).json(ingredient);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

//get single ingredient by ID
const getIngredient = async (req, res) => {
    try {
        const ingredient = await service.getByID(req.params.id);
        res.status(200).json(ingredient);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

const getAllIngredients = async (req, res) => {
    try {

    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }

}

const updateIngredient = async(req, res) => {
    try {

    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}


//delete single ingredient by ID
const deleteIngredient = async (req, res) => {

    try {

    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

//delete all ingredients of a given name
const deleteIngredientsByName = async (req, res) => {
    try {

    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

//delete all expired
const deleteExpiredIngredients = async (req, res) => {

    try {

    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }

}

const deleteAllIngredients = async (req, res) => {

    try {

    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }

}

module.exports = {
    createIngredient,
    getIngredient,
    getAllIngredients,
    deleteIngredient,
    deleteIngredientsByName,
    deleteExpiredIngredients,
    deleteAllIngredients,
    updateIngredient
}