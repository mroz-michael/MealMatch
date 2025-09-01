const router = require('express').Router();
const controller = require('../controllers/userController');
const authMiddleware = require('../middleware/auth/jwtAuth');
const validationMiddleware = require('../middleware/validation/userValidation');

//temporary route for testing other endpoints
router.get('/testing', controller.getAllUsersTest);

router.post('/register', validationMiddleware.validateUserDetails, controller.createUser)

router.post('/login', validationMiddleware.validateUserDetails, controller.getUser);

router.put('/updatePw', validationMiddleware.validateUserDetails, authMiddleware.authenticateToken, controller.updatePassword);

//for updating recipe list & stock
router.put('/updateUser', validationMiddleware.validateUserDetails, authMiddleware.authenticateToken, controller.updateUser);

router.delete('/deleteAccount', validationMiddleware.validateUserDetails, authMiddleware.authenticateToken, controller.deleteUser);

//temp route to delete quickly for testing api
router.delete('/deleteForTesting/:id', async(req, res) => {
    let User = require('../models/User');
    let id = req.params.id;
    await User.findByIdAndDelete(id);
    res.status(204).send();
})

module.exports = router;