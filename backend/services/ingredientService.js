const Ingredient = require('../models/Ingredient');

const create = async (ingredientName) => {

    const newIngredient = await Ingredient.create({
        name: ingredientName
    })
    
    return newIngredient;
}

//get the ingredient by id
const getById = async (id) => {
    const ingredient = await Ingredient.findById({id})
    return ingredient;
}

const getAll = async() => {
    const ingredients = await Ingredient.find({});
    return ingredients;
}


const updateById = async (req) => {
    const id = req.body.id;
    const updatedData = req.body.ingredient;
    const updatedIngredient = await Ingredient.findByIdAndUpdate(id, {updatedData}, {new: true});
    return updatedIngredient;
}

const deleteById = async (id) => {
    await Ingredient.findByIdAndDelete({id});
}


const deleteAll = async  () => {
    await Ingredient.deleteMany({});
}


module.exports = {
    create,
    getById,
    getAll,
    updateById,
    deleteById,
    deleteAll
}