const ingredientService = require('../services/ingredientService');
const userStockService = require('../services/stockServices');

// middleware will handle data validation before it reaches this controller
// middleware validates jwt token and attaches user as req.user

/**
 * 
 * Catalogue the new Ingredient, and then add the user-specific details to user's stock
 * TODO: consider flow where user attempts to create an ingredient that already exists in catalogue - should still create for the user's stock
 */
const createIngredient = async (req, res) => {

    try {
        const ingredientName = req.body.name;
        const userId = req.user.id;

        const ingredientForDatabase = await ingredientService.create(ingredientName);

        const ingredientForUser = await userStockService.addStock(req.body, userId, ingredientForDatabase._id);

        res.status(201).json(ingredientForUser);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

//get single ingredient by ID
const getIngredient = async (req, res) => {
    try {
        const ingredient = await ingredientService.getById(req.params.id, req.user.id);
        res.status(200).json(ingredient);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await ingredientService.getAll(req.user.id);
        res.status(200).json(ingredients);
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
        await service.deleteAllIngredients(req.user.id);
        res.status(204);
        return;
        
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