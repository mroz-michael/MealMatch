const router = require('express').Router();
const controller = require('../controllers/ingredientController');
const ingredientValidation = require('../middleware/validation/ingredientValidation');
const tokenAuth = require('../middleware/auth/jwtAuth');

router.get('/:id', tokenAuth.authenticateToken, controller.getIngredient);

//get all in user's stock
router.get('/',  tokenAuth.authenticateToken, controller.getAllIngredients);

//create ingredient
router.post('/',  tokenAuth.authenticateToken, ingredientValidation.validateIngredient, controller.createIngredient);

//update ingredient
router.put('/:id', tokenAuth.authenticateToken, ingredientValidation.validateIngredient, controller.updateIngredient);

//delete one ingredient
router.delete('/:id', tokenAuth.authenticateToken, controller.deleteIngredient);

//delete all ingredients of a given name
router.delete('/:name', tokenAuth.authenticateToken, controller.deleteIngredientsByName);

//delete all user's ingredients
router.delete('/', tokenAuth.authenticateToken, controller.deleteAllIngredients);

//delete all user's expired ingredients
router.delete('/expired', tokenAuth.authenticateToken, controller.deleteExpiredIngredients);

module.exports = router;