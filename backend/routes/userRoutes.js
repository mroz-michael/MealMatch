const router = require('express').Router();
const controller = require('../controllers/userController');
const authMiddleware = require('../middleware/auth/jwtAuth');
const validationMiddleware = require('../middleware/validation/userValidation');

//temporary route for testing other endpoints
router.get('/testing', controller.getAllUsersTest);

router.get('/session', authMiddleware.authenticateToken, controller.getCurrentUser);

router.post('/register', validationMiddleware.validateUserDetails, controller.createUser)

router.post('/login', validationMiddleware.validateUserDetails, controller.loginUser);

router.post('/logout', authMiddleware.authenticateToken, controller.logoutUser);

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

//temp route to give/remove priviledges. will replace with something protected by checking if granter is admin
//req body has username, type: enum[admin, create, update, delete], grant: true. grant is optional, if missing then revoke

//TODO: replace this route with a better, more secure & modular approach
router.post('/editAccess', async(req, res) => {
    let User = require('../models/User');
    let username = req.body.username;
    const type = req.body.type;
    const grantAccess = req.body.grant;

    const user = await User.findOne({username});

    switch (type.toLowerCase().trim()) {
        case "admin":
            user.isAdmin = grantAccess;
            if (user.isAdmin) {
                user.canCreate = true;
                user.canUpdate = true;
                user.canDelete = true;
            }
            break;
        case "create":
            user.canCreate = grantAccess;
            break;
        case "update":
            user.canUpdate = grantAccess;
            break;
        case "delete":
            user.canDelete = grantAccess;
            break;
        default:
            return res.status(400).json({error: "Invalid access control type"})
    }

    await user.save();

    return res.status(200).json({
        username: user.username,
        isAdmin: user.isAdmin,
        canCreate: user.canCreate,
        canUpdate: user.canUpdate,
        canDelete: user.canDelete
    });
})

module.exports = router;