const router = require('express').Router();
const controller = require('../controllers/userController');
const authMiddleware = require('../middleware/auth/jwtAuth');
const validationMiddlewae = require('../middleware/validation/userValidation');
//todo: add middleware validation functions once implemented

router.post('/register', controller.createUser)

router.post('/login', controller.getUser);

router.delete('/deleteAccount', authMiddleware.authenticateToken, controller.deleteUser);

module.exports = router;