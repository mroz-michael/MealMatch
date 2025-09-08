const Ingredient = require('../models/Ingredient');
const userService = require('../services/userService');

const create = async (req) => {
    
    const newIngredient = await Ingredient.create({
        name: req.body.name,
        portionCost: req.body.portionCost,
        portions: req.body.portions,
        expiryDate: req.body.expiryDate,
        user: req.user.id
    })

    //update user's stock
    await userService.applyUpdates(req.user.id,
        {$push: { stock: newIngredient._id}}
    )
    
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

module.exports = {
    create,
    getById,
    getAll,
    updateById,
    deleteById,
    deleteByName,
    deleteExpired,

}