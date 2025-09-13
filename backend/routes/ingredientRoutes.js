const router = require('express').Router();
const controller = require('../controllers/ingredientController');
const ingredientValidation = require('../middleware/validation/ingredientValidation');
const tokenAuth = require('../middleware/auth/jwtAuth');
const userAccessControl = require('../middleware/auth/userAccess');

router.get('/:id', tokenAuth.authenticateToken, controller.getIngredient);

//get all ingredients in catalogue
router.get('/',  tokenAuth.authenticateToken, controller.getAllIngredients);

//create ingredient
router.post('/',  tokenAuth.authenticateToken, userAccessControl.checkAccess("create"), ingredientValidation.validateIngredientForDB, controller.createIngredient);

//update ingredient
router.put('/:id', tokenAuth.authenticateToken, userAccessControl.checkAccess("update"), ingredientValidation.validateIngredientForDB, controller.updateIngredient);

//delete one ingredient
router.delete('/:id', tokenAuth.authenticateToken, userAccessControl.checkAccess("delete"), controller.deleteIngredient);

//delete entire catalogue -- Admin only
router.delete('/', tokenAuth.authenticateToken, userAccessControl.checkAdmin, controller.deleteAllIngredients);

module.exports = router;