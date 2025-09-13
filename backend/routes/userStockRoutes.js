const router = require('express').Router();
const controller = require('../controllers/userStockController');
const tokenAuth = require('../middleware/auth/jwtAuth');


//get the user's stock
router.get('/', tokenAuth.authenticateToken, controller.getStock);

//add the new Ingredient to User's stock
router.post('/addIngredient', tokenAuth.authenticateToken, controller.addToStock);

//add to or remove portions of the ingredient from the stock
router.put('/updatePortions', tokenAuth.authenticateToken, controller.updatePortions);

//update ingredient metadata like expiry date or portion cost
router.put('updateMetadata', tokenAuth.authenticateToken, controller.updateMetadata);

//remove ingredient from the user's stock
router.delete('/removeIngredient', tokenAuth.authenticateToken, controller.removeFromStock);



module.exports = router;
