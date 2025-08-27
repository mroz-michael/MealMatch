const router = require('express').Router();
const controller = require('../controllers/recipeController');
//get all recipes associated with user
router.get('/', controller.getAllRecipes);

//get a single recipe by id
router.get('/:id', controller.getRecipeById);

//create recipe
router.post('/', controller.createRecipe);

//update a recipe
router.put("/:id", controller.updateRecipe);

//delete recipe
router.delete("/:id", controller.deleteRecipeById);

//delete all recipes created by user
router.delete('/', controller.deleteAllRecipes);

module.exports = router;