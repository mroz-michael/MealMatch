// call relevant service functions and return response obj/status codes, 
// middleware will handle data validation before it reaches this controller

const createIngredient = async (req, res) => {
}

//get single ingredient by ID
const getIngredient = async (req, res) => {
}

const getAllIngredients = async (req, res) => {

}

//delete single ingredient by ID
const deleteIngredient = async (req, res) => {
}

//delete all ingredients of a given name
const deleteIngredientsByName = async (req, res) => {
}

//delete all expired
const deleteExpiredIngredients = async (req, res) => {

}

const deleteAllIngredients = async (req, res) => {

}

const updateIngredient = async(req, res) => {
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