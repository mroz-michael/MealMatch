const Ingredient = require('../models/Ingredient');

const create = async (data) => {
    
    const newIngredient = await Ingredient.create({
        name: data.name,
        portionCost: data.portionCost,
        portions: data.portions,
        expiryDate: data.expiryDate,
        user: req.user.id
    })
    //TODO: update user's stock

    return newIngredient;
}

const getById = async (id, user) => {

}

const getAll = async (user) => {

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