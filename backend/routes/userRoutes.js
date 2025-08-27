const router = require('express').Router();
const controller = require('../controllers/userController');

//todo: add middleware validation functions once implemented

router.post('/register', controller.createUser)

router.post('/login', controller.getUser);

router.delete('/deleteAccount', controller.deleteUser);

module.exports = router;