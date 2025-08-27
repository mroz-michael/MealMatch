// call relevant service functions and return response obj/status codes, 
// middleware will handle data validation before it reaches this controller

//get all recipes associated with user
const getAllRecipes =  async (req, res) => {

}
//get a single recipe by id
const getRecipeById = async (req, res) => {

}

//create recipe
const createRecipe = async (req, res) => {

}

//update a recipe
const updateRecipe = async(req, res) => {

}

//delete recipe
const deleteRecipeById = async(req, res) => {

}

const deleteAllRecipes = async (req, res) => {
    
}

module.exports = {
    getAllRecipes, 
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipeById,
    deleteAllRecipes,
}