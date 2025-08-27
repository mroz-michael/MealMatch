const router = require('express').Router();
const controller = require('../controllers/ingredientController');

router.get('/:id', controller.getIngredient);

//get all in user's stock
router.get('/', controller.getAllIngredients);

router.post('/', controller.createIngredient);

router.put('/:id', controller.updateIngredient);

router.delete('/:id', controller.deleteIngredient);

router.delete('/:name', controller.deleteIngredientsByName);

router.delete('/', controller.deleteAllIngredients);

router.delete('/expired', controller.deleteExpiredIngredients);

module.exports = router;