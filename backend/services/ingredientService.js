const Ingredient = require('../models/Ingredient');
const User = require('../models/User');

const create = async (req) => {
    
    const userId = req.user.id;

    const newIngredient = await Ingredient.create({
        name: req.body.name,
        portionCost: req.body.portionCost,
        portions: req.body.portions,
        expiryDate: req.body.expiryDate,
        user: userId
    })

    //update user's stock
    await addToStock(userId, newIngredient);
    
    return newIngredient;
}

const getById = async (id, user) => {

}

const getAll = async (userId) => {
    
    const ingredients = await Ingredient.find({user: userId});
    return ingredients;
}   

const updateById = async (req) => {

}

const deleteById = async (id, user) => {

}

const deleteByName = async (name, user) => {

}

const deleteExpired = async (user) => {

}

const deleteAll = async  (id) => {
    await Ingredient.deleteMany({user: id});
    //TODO need to also delete from user's stock. make a helper fn
}

//add given ingredient to given user's stock
const addToStock = async (userId, ingredient) => {

    const ingredientForUser = {
        ingredient: ingredient._id,
        name: ingredient.name,
        portionCost: ingredient.portionCost,
        portions: ingredient.portions, 
        expiryDate: ingredient.expiryDate
    }
    
    
    await User.findByIdAndUpdate(userId, 
        {$push: {stock: ingredientForUser}} 
    )

}

module.exports = {
    create,
    getById,
    getAll,
    updateById,
    deleteById,
    deleteByName,
    deleteExpired,
    deleteAll
}