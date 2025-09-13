const router = require('express').Router();
const controller = require('../controllers/userStockController');
const tokenAuth = require('../middleware/auth/jwtAuth');

//add the new Ingredient to User's stock
router.post('/addToStock', tokenAuth, controller.addToStock);

router.put('/update')


module.exports = router;
