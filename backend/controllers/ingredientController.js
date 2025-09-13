/**
 * This controller will be responsible only for the Ingredient collection that will act as a global 'catalogue' that users can choose as templates 
 * operations that impact ingredients in a User's personal stock are the responsibility of the userStockController
 */



const ingredientService = require('../services/ingredientService');

// middleware will handle data validation before it reaches this controller
// middleware validates jwt token and attaches user as req.user

/**
 * 
 * Create a new Ingredient object for the DB catalogue 
 */
const createIngredient = async (req, res) => {

    try {
        const ingredientName = req.body.name;

        const ingredientForDatabase = await ingredientService.create(ingredientName);

        res.status(201).json(ingredientForDatabase);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

//get single ingredient by ID
const getIngredient = async (req, res) => {
    try {
        const ingredient = await ingredientService.getById(req.params.id);
        res.status(200).json(ingredient);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await ingredientService.getAll();
        res.status(200).json(ingredients);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }

}

const updateIngredient = async(req, res) => {
    try {
        const updatedIngredient = await ingredientService.updateById(req);
        res.status(200).json(updateIngredient);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}


//delete single ingredient by ID
const deleteIngredient = async (req, res) => {

    try {
        const id = req.body.id;
        await ingredientService.deleteById(id);
        return res.status(204);
    } catch (err) {
        const msg = err.message || "Unknown Error";
        res.status(400).json({error: msg})
    }
}

const deleteAllIngredients = async (req, res) => {
    
    //double check that user is admin, already done by middleware but add extra safeguard
    if (!req.user || !req.user.isAdmin) {
        return res.status(403).json({message: "User is not Authorized to perform this action"});
    }

    try {
        await service.deleteAllIngredients();
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
    deleteAllIngredients,
    updateIngredient
}