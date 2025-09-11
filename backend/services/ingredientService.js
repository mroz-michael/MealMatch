const Ingredient = require('../models/Ingredient');
const User = require('../models/User');

const create = async (ingredientName) => {

    const newIngredient = await Ingredient.create({
        name: ingredientName
    })
    
    return newIngredient;
}

//get the ingredient by id
const getById = async (id, userId) => {
    const ingredient = await Ingredient.findById({id})
    return ingredient;
}


const updateById = async (req) => {
    const updatedIngredient = req.body.ingredient;
    const userId = req.user.id;
    //todo: finish implementing
}

const deleteById = async (id, userId) => {

}


const deleteAll = async  (userId) => {
    await Ingredient.deleteMany({user: userId});
    //TODO need to also delete from user's stock. make a helper fn
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