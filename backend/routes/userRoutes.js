const router = require('express').Router();
const controller = require('../controllers/userController');
const authMiddleware = require('../middleware/auth/jwtAuth');
const validationMiddleware = require('../middleware/validation/userValidation');

router.post('/register', validationMiddleware.validateUserDetails, controller.createUser)

router.post('/login', validationMiddleware.validateUserDetails, controller.getUser);

router.put('/updatePw', validationMiddleware.validateUserDetails, authMiddleware.authenticateToken, controller.updatePassword);

router.delete('/deleteAccount', validationMiddleware.validateUserDetails, authMiddleware.authenticateToken, controller.deleteUser);

module.exports = router;